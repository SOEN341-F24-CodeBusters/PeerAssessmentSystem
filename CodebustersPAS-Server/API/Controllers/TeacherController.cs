using Infrastructure;
using Infrastructure.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static API.Controllers.StudentController;

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
            Students = new List<Student>()
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

            var values = line.Split(',');

            // Create team from first value in row
            Team team = new Team {
                Id = new Guid(),
                TeamName = values[0].Trim(),
                Group = group,
                Students = new List<Student>()
            };

            // Create students in team from the rest of the values in row
            team.Students.AddRange(values
                .Skip(1)
                .Where(value => !string.IsNullOrWhiteSpace(value))
                .Select(value => new Student {
                    Id = new Guid(),
                    StudentID = int.Parse(value.Trim())
                })
            );

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
}