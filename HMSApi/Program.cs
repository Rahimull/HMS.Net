using System.Text.Json;
using HMSApi.Data;
using HMSApi.Middleware;
using HMSApi.Models;
using HMSApi.Modules.Reception;
using HMSApi.Mudoles.Doctors;
using HMSApi.Mudoles.HR;
using HMSApi.Mudoles.Pharmacy;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
// builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<HMSDBC>(options =>
    options.UseSqlite("Data Source=HMSDBC.db")
);



// Identity (اگر دارید)
builder.Services
    .AddIdentity<AppUser, IdentityRole<int>>()
    .AddEntityFrameworkStores<HMSDBC>()
    .AddDefaultTokenProviders();

builder.Services.AddReceptionModule();
builder.Services.AddDoctorModule();
builder.Services.AddPharmacyModule();
builder.Services.AddHRModule();

builder.Services.AddControllers();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        p => p.WithOrigins("http://localhost:5173")
              .AllowAnyMethod()
              .AllowAnyHeader());
});
builder.Services
    .AddControllers()
    .AddJsonOptions(o =>
    {
        o.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    });





var app = builder.Build();





// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "HMSAPI v1");
        c.RoutePrefix = string.Empty;
    });
}

// app.UseHttpsRedirection();

app.MapControllers();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");
app.UseMiddleware<ExceptionMiddleware>();

app.UseCors("AllowReact");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}



