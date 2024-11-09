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
                .ThenInclude(s => s.EvaluationsRecived.Where(e => e.Evaluator.StudentID.Equals(student.StudentID)))
            .Where(teams => teams.Students.Contains(student))
            .ToListAsync();

        var teamDTOs = teams.Select(
            team => new SC_TeamDTO(
                team.TeamName,
                team.Group.Teacher.User!.FirstName + " " + team.Group.Teacher.User!.LastName,
                team.Group.Name,
                team.Students.Select(s => new SC_StudentDTO(s.StudentID, s.User?.FirstName + " " + s.User?.LastName))
            )
        );

        return Ok(teamDTOs);
    }

    [HttpPost, ActionName("RateStudents")]
    public async Task<ActionResult> RateStudents(SC_RatingDTO ratingDTO) {
        
        Student student = await FetchLoggedInStudent(HttpContext);
        Team team = await _dbContext.Teams
            .Include(t => t.Students)
            .FirstAsync(t => t.Id.Equals(ratingDTO.teamId));

        foreach(SC_StudentRatingDTO rating in ratingDTO.ratings) {
            Student studentToRate = team.Students.First(s => s.StudentID.Equals(rating.studentId));

            StudentEvaluation studentEvaluation = new StudentEvaluation {
                Id = Guid.NewGuid(),
                Team = team,
                Evaluator = student,
                Evaluated = studentToRate,
                Score = rating.score,
                Comments = rating.comment ?? "",
            };

            await _dbContext.StudentEvaluations.AddAsync(studentEvaluation);
        }

        await _dbContext.SaveChangesAsync();

        return Ok();
    }

    private async Task<Student> FetchLoggedInStudent(HttpContext httpContext) {
        Guid userId = Guid.Parse(HttpContext.User.Claims.First(claim => claim.Type.Equals("Guid")).Value);
        User user = await _dbContext.Users
            .Include(u => u.student)
            .FirstAsync(e => e.Id.Equals(userId));
        Student student = user.student!;

        return student;
    }


    public record SC_TeamDTO(string teamName, string teacherName, string groupName, IEnumerable<SC_StudentDTO> studentList);
    public record SC_StudentDTO(int studentId, string name, bool isRated);
    public record SC_RatingDTO(Guid teamId, List<SC_StudentRatingDTO> ratings);
    public record SC_StudentRatingDTO(int studentId, int score, string? comment);
}