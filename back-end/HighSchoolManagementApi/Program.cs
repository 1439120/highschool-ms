
using HighSchoolManagementApi.Data;
using Microsoft.EntityFrameworkCore;
using HighSchoolManagementApi.Interfaces;
using HighSchoolManagementApi.Repository;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// prevent objects cycling
builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
});


builder.Services.AddDbContext<ApplicationDBContext>(options => {
    options.UseNpgsql(builder.Configuration.GetConnectionString("NeonDb"));
});

// Dependancy injections
builder.Services.AddScoped<IUsersRepository, UsersRepository>();
builder.Services.AddScoped<IClassroomRepository, ClassroomRepository>();
builder.Services.AddScoped<IGradesRepository, GradesRepository>();
builder.Services.AddScoped<ISubjectRepository, SubjectsRepository>();

var app = builder.Build();

// Middleware 
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
