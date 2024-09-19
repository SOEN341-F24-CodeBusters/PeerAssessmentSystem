using Infrastructure;
using Infrastructure.Enums;
using Infrastructure.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

        [HttpGet("{id}"), ActionName("GetStudent")]
        public async Task<ActionResult<Student>> Get(Guid id) {
            var student = await _dbContext.Users
                .Where(User => User.type == UserType.Student)
                .FirstOrDefaultAsync(User => User.Id.Equals(id));

            if (student is null) {
                return NotFound();
            }

            return new Student(student.Id, student.FirstName, student.LastName);
        }

        [HttpGet, ActionName("GetAllStudent")]
        public async Task<ActionResult<IEnumerable<Student>>> GetAll() {
            var students = await _dbContext.Users
                .Where(User => User.type == UserType.Student)
                .ToListAsync();


            return students
                .Select(student => new Student(student.Id, student.FirstName, student.LastName))
                .ToList();
        }

        [HttpPost, ActionName("CreateStudent")]
        public async Task<ActionResult<Student>> Post(NewStudent student) {
            var newStudent = _dbContext.Users.Add(
               new User {
                   Id = new Guid(),
                   FirstName = student.FirstName,
                   LastName = student.LastName,
                   type = UserType.Student,
               });
            await _dbContext.SaveChangesAsync();

            return new Student(newStudent.Entity.Id, newStudent.Entity.FirstName, newStudent.Entity.LastName);
        }

        [HttpDelete, ActionName("DeleteStudent")]
        public async Task<ActionResult<Student>> Delete(Guid id) {

            var student = await _dbContext.Users.FirstOrDefaultAsync(student => student.Id == id);

            if (student is null) {
                return NotFound();
            }

            var studentDTO = new Student(student.Id, student.FirstName, student.LastName);

            _dbContext.Users.Remove(student);
            await _dbContext.SaveChangesAsync();

            return studentDTO;
        }

        public record Student(Guid id, string FirstName, string LastName);
        public record NewStudent(string FirstName, string LastName);
    }
}