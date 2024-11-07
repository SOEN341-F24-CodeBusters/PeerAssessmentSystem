using Infrastructure;
using Infrastructure.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using System.Linq;

namespace API.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class StudentController : ControllerBase {

    private readonly ILogger<StudentController> _logger;
    private readonly PeerAssessmentSystemDbContext _dbContext;

    public StudentController(ILogger<StudentController> logger, PeerAssessmentSystemDbContext dbContext) {
        _logger = logger;
        _dbContext = dbContext;
    }

    [Authorize(Roles = "Student")]
    [HttpGet, ActionName("GetGroupsAndTeams")]
    public async Task<ActionResult<IEnumerable<SC_TeamDTO>>> GetGroupsAndTeams() {

        Student student = await FetchLoggedInStudent(HttpContext);

        var teams = await _dbContext.Teams
            .Include(t => t.Group)
                .ThenInclude(g => g.Teacher)
                    .ThenInclude(t => t.User)
            .Include(t => t.Students)
                .ThenInclude(s => s.User)
            .Where(t => t.Students.Any(s => s.StudentID == student.StudentID))
            .ToListAsync();

        var teamDTOs = teams
            .OrderBy(t => t.Group.Name)
            .Select(
                team => new SC_TeamDTO(
                    team.TeamName,
                    team.Group.Teacher.User!.FirstName + " " + team.Group.Teacher.User!.LastName,
                    team.Group.Name,
                    team.Students
                        .OrderBy(s => s.User?.FirstName + " " + s.User?.LastName)
                        .Select(s => new SC_StudentDTO(s.StudentID, s.User?.FirstName + " " + s.User?.LastName))
                )
        );

        return Ok(teamDTOs);
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
    public record SC_StudentDTO(int studentId, string name);
}