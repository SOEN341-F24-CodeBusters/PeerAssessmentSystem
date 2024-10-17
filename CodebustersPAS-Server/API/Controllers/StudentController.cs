using Infrastructure;
using Infrastructure.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using System.Linq;

namespace API.Controllers {
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
        public async Task<ActionResult<IEnumerable<TeamDTO>>> GetTeams() {

            var userId = Guid.Parse(HttpContext.User.Claims.First(claim => claim.Type.Equals("Guid")).Value);
            Student student = await _dbContext.Students.FirstAsync(e => e.Id.Equals(userId));


            var teams = await _dbContext.Teams.Where(teams => teams.Students.Contains(student)).ToListAsync();


            var teamDTOs = new List<TeamDTO>();

            foreach (Team team in teams) {

                teamDTOs.Add(new TeamDTO(
                    team.TeamName,
                    team.Group.Teacher.user.FirstName + " " + team.Group.Teacher.user.LastName,
                    team.Group.Name,
                    team.Students.Select(student => team.Group.Teacher.user.FirstName + " " + team.Group.Teacher.user.LastName)));
            }

            return teamDTOs;
        }


        public record TeamDTO(string teamName, string teacherName, string groupName, IEnumerable<string> studentList);
    }
}