using System.Security.Claims;
using Infrastructure;
using Infrastructure.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Route("api/[controller]")]
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

        User user = await _dbContext.Users.FirstAsync(User => User.username == logInDTO.username);

        // Check password
        // Todo: hash password and not to store it as plain text
        if(!logInDTO.password.Equals(user.Password)){
            // WRONG PASSOWRD
            return Unauthorized();
        }

        var claims = new List<Claim> {
            new Claim(ClaimTypes.Name, user.FirstName)
        };

        var identity = new ClaimsIdentity(claims);
        var principal = new ClaimsPrincipal(identity);

        await HttpContext.SignInAsync(principal);

        throw new NotImplementedException();
    }

    [HttpPost, ActionName("SignUp")]
    public async Task<ActionResult> SignUp(SignUpDTO signUpDTO) {


        throw new NotImplementedException();
    }

    [HttpPost, ActionName("LogOut")]
    public async Task<ActionResult> LogOut() {
        await HttpContext.SignOutAsync();

        return Ok();
    }

    public record LogInDTO(
        int userType,
        string username,
        string password
    );

    public record SignUpDTO(
        int userType,
        string firstName,
        string lastName,
        int studentId,
        string username,
        string password
    );
}