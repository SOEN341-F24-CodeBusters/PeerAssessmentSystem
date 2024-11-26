using Infrastructure;
using Infrastructure.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize(Roles = "Teacher")]
[Route("api/[controller]/[action]")]
[ApiController]
public class TeacherController : Controller {

    private readonly ILogger<StudentController> _logger;
    private readonly PeerAssessmentSystemDbContext _dbContext;

    public TeacherController(ILogger<StudentController> logger, PeerAssessmentSystemDbContext dbContext) {
        _logger = logger;
        _dbContext = dbContext;
    }

    [HttpGet, ActionName("GetGroupsAndTeams")]
    public async Task<ActionResult<IEnumerable<TC_GroupDto>>> GetGroupsAndTeams() {

        Teacher teacher = await FetchLoggedInTeacher(HttpContext);

        var groups = await _dbContext.Groups
            .Where(group => group.Teacher.Id == teacher.Id)
            .Include(g => g.Teams)
                .ThenInclude(t => t.Students)
                    .ThenInclude(s => s.User)
            .ToListAsync();


        var groupDTO = groups
            .OrderBy(g => g.Name)
            .Select(group => new TC_GroupDto(
                group.Id,
                group.Name,
                group.Teams
                    .OrderBy(t => t.TeamName)
                    .Select(team => new TC_TeamDTO(
                        team.Id,
                        team.TeamName,
                        team.Students
                            .OrderBy(s => s.User?.LastName + " " + s.User?.FirstName)
                            .Select(student => new TC_StudentDTO(
                                student.Id,
                                student.StudentID,
                                student.User?.FirstName,
                                student.User?.LastName
                                )
                            )
                        )
                    )
                )
            );

        return Ok(groupDTO);
    }

    [HttpGet, ActionName("SummaryOfResults")]
    public async Task<ActionResult<TC_GroupSummaryOfResults>> SummaryOfResults(Guid groupId) {

        var Group = await _dbContext.Groups
            .Include(g => g.Teams)
                .ThenInclude(t => t.StudentEvaluations)
                .ThenInclude(e => e.Evaluated)
                .ThenInclude(s => s.User)
            .Include(g => g.Teams)
                .ThenInclude(t => t.StudentEvaluations)
                .ThenInclude(e => e.Evaluator)
                .ThenInclude(s => s.User)
            .FirstOrDefaultAsync(group => group.Id == groupId);

        if (Group is null) return NotFound("Group not found");

        var studentEvaluations = new List<TC_SummaryStudent>();

        Group.Teams.ForEach(team => {
            team.Students.ForEach(student => {

                // Remove self evaluations
                var evaluations = student.EvaluationsRecived
                    .Where(e => e.Evaluated.Id != e.Evaluator.Id)
                    .ToList();

                int cooperationSum = evaluations.Sum(e => e.cooperation);
                int conceptualContributionsSum = evaluations.Sum(e => e.conceptualContributions);
                int practicalContributionsSum = evaluations.Sum(e => e.practicalContributions);
                int workEthicSum = evaluations.Sum(e => e.workEthic);
                int count = evaluations.Count;


                studentEvaluations.Add(new TC_SummaryStudent(
                    student.StudentID,
                    student.User?.FirstName + " " + student.User?.LastName,
                    team.TeamName,
                    cooperationSum/count,
                    conceptualContributionsSum/count,
                    practicalContributionsSum/count,
                    workEthicSum/count,
                    (cooperationSum + conceptualContributionsSum + practicalContributionsSum + workEthicSum) / count / 4,
                    count
                ));

            });
        });

        var result = new TC_GroupSummaryOfResults(
            Group.Id,
            Group.Name,
            studentEvaluations.OrderBy(s => s.StudentId).ToList()
        );

        return Ok(result);
    }

    [HttpGet, ActionName("DetailedResults")]
    public async Task<ActionResult<TC_GroupDetailedResults>> DetailedResults(Guid groupId) {

        var Group = await _dbContext.Groups
            .Include(g => g.Teams)
                .ThenInclude(t => t.StudentEvaluations)
                .ThenInclude(e => e.Evaluated)
                .ThenInclude(s => s.User)
            .Include(g => g.Teams)
                .ThenInclude(t => t.StudentEvaluations)
                .ThenInclude(e => e.Evaluator)
                .ThenInclude(s => s.User)
            .FirstOrDefaultAsync(group => group.Id == groupId);

        if (Group is null) return NotFound("Group not found");

        var detailedTeams = new List<TC_DetailedTeam>();

        foreach (Team team in Group.Teams) {

            var detailedStudents = new List<TC_DetailedStudent>();

            foreach (Student student in team.Students) {

                var evaluations = new List<TC_DetailedEvaluation>();

                foreach (StudentEvaluation evaluation in student.EvaluationsRecived.Where(e => e.Evaluated.Id != e.Evaluator.Id)) {
                    
                    evaluations.Add(new TC_DetailedEvaluation(
                        evaluation.Evaluator.StudentID,
                        evaluation.Evaluator.User?.FirstName + " " + evaluation.Evaluator.User?.LastName,
                        evaluation.cooperation,
                        evaluation.conceptualContributions,
                        evaluation.practicalContributions,
                        evaluation.workEthic,
                        (evaluation.cooperation + evaluation.conceptualContributions + evaluation.practicalContributions + evaluation.workEthic) / 4,
                        evaluation.Comments
                    ));
                }

                var selfEvaluation = student.EvaluationsGiven.FirstOrDefault(e => e.Evaluator.Id == student.Id);

                var detailedSelfEvaluation = (selfEvaluation is not null) ? new TC_DetailedEvaluation(
                    selfEvaluation.Evaluator.StudentID,
                    selfEvaluation.Evaluator.User?.FirstName + " " + selfEvaluation.Evaluator.User?.LastName,
                    selfEvaluation.cooperation,
                    selfEvaluation.conceptualContributions,
                    selfEvaluation.practicalContributions,
                    selfEvaluation.workEthic,
                    (selfEvaluation.cooperation + selfEvaluation.conceptualContributions + selfEvaluation.practicalContributions + selfEvaluation.workEthic) / 4,
                    selfEvaluation.Comments
                ) : null;

                detailedStudents.Add(new TC_DetailedStudent(
                    student.StudentID,
                    student.User?.FirstName + " " + student.User?.LastName,
                    detailedSelfEvaluation,
                    evaluations
                ));
            }

            detailedTeams.Add(new TC_DetailedTeam(
                team.Id,
                team.TeamName,
                detailedStudents
            ));
        }

        var result = new TC_GroupDetailedResults(
            Group.Id,
            Group.Name,
            detailedTeams
        );

        return Ok(result);
    }

    [HttpPost, ActionName("group")]
    public async Task<ActionResult> CreateGroup(string name) {

        Teacher teacher = await FetchLoggedInTeacher(HttpContext);

        _dbContext.Groups.Add(new Group {
            Id = new Guid(),
            Name = name,
            Teacher = teacher,
            Teams = new List<Team>()
        });
        await _dbContext.SaveChangesAsync();

        return Ok();
    }

    [HttpPost, ActionName("team")]
    public async Task<ActionResult> CreateTeam(string name, Guid groupId) {

        Teacher teacher = await FetchLoggedInTeacher(HttpContext);

        var group = await _dbContext.Groups.FirstOrDefaultAsync(g => g.Id == groupId);
        if (group is null) return NotFound("Group not found");

        _dbContext.Teams.Add(new Team {
            Id = new Guid(),
            TeamName = name,
            Group = group,
            Students = new List<Student>(),
            StudentEvaluations = new List<StudentEvaluation>(),
        });
        await _dbContext.SaveChangesAsync();

        return Ok();
    }

    [HttpPost, ActionName("team/add-student")]
    public async Task<ActionResult> AddStudentToTeam(Guid teamId, int studentId) {

        Teacher teacher = await FetchLoggedInTeacher(HttpContext);

        Team? team = await _dbContext.Teams.FirstOrDefaultAsync(t => t.Id == teamId);
        if (team is null) return NotFound("Team not found");

        var student = await _dbContext.Students.FirstOrDefaultAsync(s => s.StudentID == studentId);

        if (student is null) {
            student = new Student {
                Id = new Guid(),
                StudentID = studentId,
                EvaluationsGiven = new List<StudentEvaluation>(),
                EvaluationsRecived = new List<StudentEvaluation>(),
            };
            _dbContext.Students.Add(student);
            await _dbContext.SaveChangesAsync();
        }

        team.Students ??= new List<Student>();
        team.Students.Add(student);

        await _dbContext.SaveChangesAsync();

        return Ok();
    }

    [HttpPost, ActionName("upload-csv")]
    public async Task<ActionResult> UploadFile([FromForm] IFormFile file, [FromForm] string groupName) {

        Teacher teacher = await FetchLoggedInTeacher(HttpContext);

        if (file == null || file.Length == 0) {
            return BadRequest("No file uploaded");
        }

        // Create group
        Group group = new Group {
            Id = new Guid(),
            Name = groupName,
            Teacher = teacher,
            Teams = new List<Team>()
        };

        // Read the file
        using var reader = new StreamReader(file.OpenReadStream());
        while (!reader.EndOfStream) {
            var line = await reader.ReadLineAsync();

            if (line is null) {
                continue;
            }

            var values = line.Split(',').Where(v => !string.IsNullOrWhiteSpace(v)).ToArray();

            // Create team from first value in row
            Team team = new Team {
                Id = new Guid(), 
                TeamName = values[0].Trim(),
                Group = group,
                Students = new List<Student>(),
                StudentEvaluations = new List<StudentEvaluation>(),
            };

            // Create students in team from the rest of the values in row
            foreach (var studentId in values.Skip(1)) {
                
                if(string.IsNullOrWhiteSpace(studentId)) {
                    continue;
                }

                // Check if student already exists and add student to the team
                var student = await _dbContext.Students.FirstOrDefaultAsync(s => s.StudentID == int.Parse(studentId));
                if(student is not null) {
                    team.Students.Add(student);
                    continue;
                }

                team.Students.Add(new Student {
                    Id = new Guid(),
                    StudentID = int.Parse(studentId),
                    EvaluationsGiven = new List<StudentEvaluation>(),
                    EvaluationsRecived = new List<StudentEvaluation>(),
                });
            }

            group.Teams.Add(team);
        }

        _dbContext.Groups.Add(group);
        await _dbContext.SaveChangesAsync();

        return Ok();
    }

    private async Task<Teacher> FetchLoggedInTeacher(HttpContext httpContext) {
        Guid userId = Guid.Parse(HttpContext.User.Claims.First(claim => claim.Type.Equals("Guid")).Value);
        User user = await _dbContext.Users
            .Include(u => u.teacher)
            .FirstAsync(e => e.Id.Equals(userId));
        Teacher teacher = user.teacher!;

        return teacher;
    }

    public record TC_TeamDTO(
        Guid id,
        string teamName,
        IEnumerable<TC_StudentDTO>? students
    );

    public record TC_StudentDTO(
        Guid id,
        int studentId,
        string? firstName,
        string? lastName
    );

    public record TC_GroupDto(
        Guid id,
        string Name,
        IEnumerable<TC_TeamDTO> Teams
    );

    public record TC_GroupSummaryOfResults(
        Guid GroupId,
        string GroupName,
        IEnumerable<TC_SummaryStudent> Students
    );

    public record TC_SummaryStudent(
        int StudentId,
        string StudentName,
        string team,
        int cooperation,
        int conceptualContributions,
        int practicalContributions,
        int workEthic,
        double average,
        int count
    );

    public record TC_GroupDetailedResults (
        Guid GroupId,
        string GroupName,
        IEnumerable<TC_DetailedTeam> Teams
    );

    public record TC_DetailedTeam(
        Guid TeamId,
        string TeamName,
        IEnumerable<TC_DetailedStudent> Students
    );

    public record TC_DetailedStudent(
        int studentId,
        string studentName,
        TC_DetailedEvaluation? selfEvaluation,
        IEnumerable<TC_DetailedEvaluation> evaluations
    );

    public record TC_DetailedEvaluation(
        int evaluatorStudentId,
        string evaluatorStudentName,
        int cooperation,
        int conceptualContributions,
        int practicalContributions,
        int workEthic,
        double average,
        string comment
    );
}