using System.Security.Claims;
using Infrastructure;
using Infrastructure.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
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

        User? user = await _dbContext.Users
            .Include(u => u.teacher)
            .Include(u => u.student)
            .FirstOrDefaultAsync(User => User.email == logInDTO.email);

        // Check if user exists
        if (user is null) {
            return Unauthorized(new { message = "Invalid email or password. Please make sure to sign up your account." }); // Return JSON on error
        }

        // Check password
        // Todo: hash password and not to store it as plain text
        if (!logInDTO.password.Equals(user.Password)) {
            // WRONG PASSOWRD
            return Unauthorized();
        }

        var claims = new List<Claim> { };

        // Add claims
        claims.Add(new Claim("Guid", user.Id.ToString()));

        if (user.student is not null) {
            claims.Add(new Claim(ClaimTypes.Role, "Student"));
        } else if (user.teacher is not null) {
            claims.Add(new Claim(ClaimTypes.Role, "Teacher"));
        }

        // Create Identity and sign in
        var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
        var principal = new ClaimsPrincipal(identity);
        await HttpContext.SignInAsync(principal);

        return Ok(new { message = "Login successful." });
    }

    [HttpPost, ActionName("SignUp")]
    public async Task<ActionResult> SignUp(SignUpDTO signUpDTO) {

        // Check if user exists
        User? user = await _dbContext.Users.FirstOrDefaultAsync(User => User.email == signUpDTO.email);
        if (user is not null) {
            return Unauthorized(new { message = "User with this email already exits." });
        }

        if (signUpDTO.userType == 0) {

            // Check if student exists
            Student? student = await _dbContext.Students.FirstOrDefaultAsync(e => e.StudentID == signUpDTO.studentId);

            user = new Infrastructure.Models.User {
                Id = new Guid(),
                FirstName = signUpDTO.firstName,
                LastName = signUpDTO.lastName,
                email = signUpDTO.email,
                Password = signUpDTO.password,
            };


            if (student is null) {
                _dbContext.Students.Add(
                    new Infrastructure.Models.Student {
                        Id = new Guid(),
                        StudentID = (int)signUpDTO.studentId!,
                        User = user
                    });
            } else {
                student.User = user;
            }

            await _dbContext.SaveChangesAsync();


        } else if (signUpDTO.userType == 1) {
            var teacher = _dbContext.Teachers.Add(
                new Infrastructure.Models.Teacher {
                    Id = new Guid(),
                    User = new Infrastructure.Models.User {
                        Id = new Guid(),
                        FirstName = signUpDTO.firstName,
                        LastName = signUpDTO.lastName,
                        email = signUpDTO.email,
                        Password = signUpDTO.password,
                    }
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
        int? studentId,
        string email,
        string password
    );
}