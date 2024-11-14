using Infrastructure;
using Infrastructure.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using System.Linq;

namespace API.Controllers;

[Authorize(Roles = "Student")]
[Route("api/[controller]/[action]")]
[ApiController]
public class StudentController : ControllerBase {

    private readonly ILogger<StudentController> _logger;
    private readonly PeerAssessmentSystemDbContext _dbContext;

    public StudentController(ILogger<StudentController> logger, PeerAssessmentSystemDbContext dbContext) {
        _logger = logger;
        _dbContext = dbContext;
    }


    [HttpGet, ActionName("GetGroupsAndTeams")]
    public async Task<ActionResult<IEnumerable<SC_TeamDTO>>> GetGroupsAndTeams() {

        Student student = await FetchLoggedInStudent(HttpContext);

        var teams = await _dbContext.Teams
            .Include(t => t.Group)
                .ThenInclude(g => g.Teacher)
                    .ThenInclude(t => t.User)
            .Include(t => t.Students)
                .ThenInclude(s => s.User)
            .Include(t => t.StudentEvaluations)
            .Where(teams => teams.Students.Contains(student))
            .ToListAsync();

        var teamDTOs = teams
            .OrderBy(t => t.Group.Name)
            .Select(
                team => new SC_TeamDTO(
                    team.Id,
                    team.TeamName,
                    team.Group.Teacher.User!.FirstName + " " + team.Group.Teacher.User!.LastName,
                    team.Group.Name,
                    team.Students
                        .OrderBy(s => s.User?.FirstName + " " + s.User?.LastName)
                        .Select(s => new SC_StudentDTO(
                    s.StudentID,
                    s.User?.FirstName + " " + s.User?.LastName, 
                    s.Equals(student) || team.StudentEvaluations.Any(e => e.Evaluator.Equals(student) && e.Evaluated.Equals(s))
                ))
            ));

        return Ok(teamDTOs);
    }

    [HttpPost, ActionName("RateStudents")]
    public async Task<ActionResult> RateStudents(SC_RatingDTO ratingDTO) {

        Student student = await FetchLoggedInStudent(HttpContext);
        Team team = await _dbContext.Teams
            .Include(t => t.Students)
            .FirstAsync(t => t.Id.Equals(ratingDTO.teamId));

        foreach (SC_StudentRatingDTO rating in ratingDTO.ratings) {
            Student studentToRate = team.Students.First(s => s.StudentID.Equals(rating.studentId));

            // Skip if evaluating yourself.
            if (studentToRate.StudentID == student.StudentID)
                continue;

            // Skip if already evaluated
            if (await _dbContext.StudentEvaluation.AnyAsync(SE => SE.Evaluator.Equals(student) && SE.Evaluated.Equals(studentToRate)))
                continue;

            StudentEvaluation studentEvaluation = new StudentEvaluation {
                Id = Guid.NewGuid(),
                Team = team,
                Evaluator = student,
                Evaluated = studentToRate,
                Score = rating.score,
                Comments = rating.comment ?? "",
            };

            await _dbContext.StudentEvaluation.AddAsync(studentEvaluation);
        }

        await _dbContext.SaveChangesAsync();

        return Ok();
    }

    [HttpGet, ActionName("GetLoggedInUserName")]
    public async Task<ActionResult<string>> GetLoggedInUserName() {
        // Fetch the logged-in student
        Student student = await FetchLoggedInStudent(HttpContext);

        // Retrieve the student's name
        string studentName = $"{student.User?.FirstName} {student.User?.LastName}";

        return Ok(new { name = studentName });
    }


    private async Task<Student> FetchLoggedInStudent(HttpContext httpContext) {
        Guid userId = Guid.Parse(HttpContext.User.Claims.First(claim => claim.Type.Equals("Guid")).Value);
        User user = await _dbContext.Users
            .Include(u => u.student)
            .FirstAsync(e => e.Id.Equals(userId));
        Student student = user.student!;

        return student;
    }


    public record SC_TeamDTO(Guid teamId, string teamName, string teacherName, string groupName, IEnumerable<SC_StudentDTO> studentList);
    public record SC_StudentDTO(int studentId, string name, bool isRated);
    public record SC_RatingDTO(Guid teamId, List<SC_StudentRatingDTO> ratings);
    public record SC_StudentRatingDTO(int studentId, int score, string? comment);
}