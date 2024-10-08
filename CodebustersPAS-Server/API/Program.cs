using Infrastructure;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// ----- Add services ----- 

// Add Controllers and Swagger gen
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add Authentification
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options => {
        options.Cookie.Name = "CodebustersPASAuth";
        options.LoginPath = "/";
    });

builder.Services.AddAuthorization(option => {
    option.AddPolicy("TeacherOnly", policy => { policy.RequireRole("Teacher"); });
    option.AddPolicy("StudentOnly", policy => { policy.RequireRole("Student"); });
});

// Add Database
builder.Services.AddPASDbContext();

// Add cors
builder.Services.AddCors();


// ----- Configure and Start app ----- 
var app = builder.Build();

// Migrate Database
using (var scope = app.Services.CreateScope()) {
    var db = scope.ServiceProvider.GetRequiredService<PeerAssessmentSystemDbContext>();
    if (db.Database.GetPendingMigrations().Any()) {
        db.Database.Migrate();
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x => x
    .AllowAnyMethod()
    .AllowAnyHeader()
    .SetIsOriginAllowed(origin => true));

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();