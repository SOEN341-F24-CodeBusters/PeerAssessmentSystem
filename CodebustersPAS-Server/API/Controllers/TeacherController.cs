using Infrastructure;
using Infrastructure.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static API.Controllers.StudentController;

namespace API.Controllers {

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

        [HttpGet, ActionName("GetTeams")]
        public async Task<ActionResult<IEnumerable<TeamDTO>>> GetTeams() {

            var userId = Guid.Parse(HttpContext.User.Claims.First(claim => claim.Type.Equals("Guid")).Value);
            User user = await _dbContext.Users.FirstAsync(e => e.Id.Equals(userId));
            Teacher teacher = user.Teacher!;

            IList<Team> teams = await _dbContext.Teams.Where(team => team.teacher.Id == teacher.Id).ToListAsync();

            var teamDTO = teams.Select(
                team => new TeamDTO(
                    team.Id,
                    team.TeamName,
                    team.Students.Select(
                        student => new StudentDTO(
                            student.Id,
                            student.StudentID,
                            student.user.FirstName,
                            student.user.LastName
                        )
                    )
                )
            );

            return Ok(teamDTO);
        }

        [HttpGet, ActionName("GetGroups")]
        public async Task<ActionResult> GetGroups() {


            var userId = Guid.Parse(HttpContext.User.Claims.First(claim => claim.Type.Equals("Guid")).Value);
            Teacher teacher = await _dbContext.Teachers.FirstAsync(e => e.Id.Equals(userId));


            throw new NotImplementedException();
        }

        public record TeamDTO (
            Guid id,
            string teamName,
            IEnumerable<StudentDTO> students
        );

        public record StudentDTO (
            Guid id,
            int studentId,
            string firstName,
            string lastName
        );
    }
}
