using Infrastructure;
using Infrastructure.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static API.Controllers.StudentController;

namespace API.Controllers {

    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TeacherController : Controller {

        private readonly ILogger<StudentController> _logger;
        private readonly PeerAssessmentSystemDbContext _dbContext;

        public TeacherController(ILogger<StudentController> logger, PeerAssessmentSystemDbContext dbContext) {
            _logger = logger;
            _dbContext = dbContext;
        }

        [Authorize(Roles = "Teacher")]
        [HttpGet, ActionName("get")]
        public async Task<ActionResult> Get() {


            var userId = Guid.Parse(HttpContext.User.Claims.First(claim => claim.Type.Equals("Guid")).Value);
            Teacher teacher = await _dbContext.Teachers.FirstAsync(e => e.Id.Equals(userId));


            throw new NotImplementedException();
        }
    }
}
