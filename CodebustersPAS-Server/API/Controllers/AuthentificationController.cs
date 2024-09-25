using System.Security.Claims;
using Infrastructure;
using Infrastructure.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static API.Controllers.StudentController;

namespace API.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class AuthentificationController : ControllerBase {

    private readonly ILogger<StudentController> _logger;
    private readonly PeerAssessmentSystemDbContext _dbContext;

    public AuthentificationController(ILogger<StudentController> logger, PeerAssessmentSystemDbContext dbContext) {
        _logger = logger;
        _dbContext = dbContext;
    }

    [HttpPost, ActionName("LogIn")]
    public async Task<ActionResult> LogIn(LogInDTO logInDTO) {

        User user = await _dbContext.Users.FirstAsync(User => User.eamil == logInDTO.email);

        // Check password
        // Todo: hash password and not to store it as plain text
        if (!logInDTO.password.Equals(user.Password)) {
            // WRONG PASSOWRD
            return Unauthorized();
        }

        var claims = new List<Claim> { };

        // Add claims
        claims.Add(new Claim("Guid", user.Id.ToString()));

        if ((await _dbContext.Students.FirstAsync(student => student.eamil.Equals(logInDTO.email)) is var student) && student is not null) {
            claims.Add(new Claim(ClaimTypes.Role, "Student"));
        } else if (await _dbContext.Teachers.FirstAsync(student => student.eamil.Equals(logInDTO.email)) is not null) {
            claims.Add(new Claim(ClaimTypes.Role, "Teacher"));
        }

        // Create Identity and sign in
        var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
        var principal = new ClaimsPrincipal(identity);
        await HttpContext.SignInAsync(principal);

        return Ok();
    }

    [HttpPost, ActionName("SignUp")]
    public async Task<ActionResult> SignUp(SignUpDTO signUpDTO) {

        if (signUpDTO.userType == 0) {
            var student = _dbContext.Students.Add(
                new Infrastructure.Models.Student {
                    Id = new Guid(),
                    FirstName = signUpDTO.firstName,
                    LastName = signUpDTO.lastName,
                    StudentID = signUpDTO.studentId,
                    eamil = signUpDTO.email,
                    Password = signUpDTO.password,
                });
        } else if (signUpDTO.userType == 1) {
            var teacher = _dbContext.Teachers.Add(
                new Infrastructure.Models.Teacher{
                    Id = new Guid(),
                    FirstName = signUpDTO.firstName,
                    LastName = signUpDTO.lastName,
                    eamil = signUpDTO.email,
                    Password = signUpDTO.password,
                });
        }

        await _dbContext.SaveChangesAsync();

        return Ok();
    }

    [HttpPost, ActionName("LogOut")]
    public async Task<ActionResult> LogOut() {
        await HttpContext.SignOutAsync();

        return Ok();
    }

    public record LogInDTO(
        int userType,
        string email,
        string password
    );

    public record SignUpDTO(
        int userType,
        string firstName,
        string lastName,
        int studentId,
        string email,
        string password
    );
}