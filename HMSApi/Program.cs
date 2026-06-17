using System.Text;
using HMSApi.Data;
using HMSApi.Middleware;
using HMSApi.Modules.User.Entities;
using HMSApi.Modules.Reception;
using HMSApi.Modules.User;
using HMSApi.Mudoles.Common;
using HMSApi.Mudoles.Doctors;
using HMSApi.Mudoles.Finance;
using HMSApi.Mudoles.HR;
using HMSApi.Mudoles.Pharmacy;
using HMSApi.Mudoles.Store;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using HMSApi.Modules.Auth.Services;

var builder = WebApplication.CreateBuilder(args);

#region DbContext
builder.Services.AddDbContext<HMSDBC>(options =>
    options.UseSqlite("Data Source=HMSDBC.db"));
#endregion

#region Identity
builder.Services
    .AddIdentity<AppUser, IdentityRole<int>>()
    .AddEntityFrameworkStores<HMSDBC>()
    .AddDefaultTokenProviders();
#endregion

#region JWT CONFIG
var jwtKey = builder.Configuration["Jwt:Key"]
    ?? throw new Exception("JWT Key is missing");

var key = Encoding.UTF8.GetBytes(jwtKey);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,

        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(key)
    };
});
#endregion

builder.Services.AddAuthorization();

#region Swagger (JWT SUPPORT)
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "HMS API",
        Version = "v1"
    });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new  OpenApiReference//OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});
#endregion

#region Modules
builder.Services.AddCommonModule();
builder.Services.AddReceptionModule();
builder.Services.AddDoctorModule();
builder.Services.AddPharmacyModule();
builder.Services.AddHRModule();
builder.Services.AddFinanceModule();
builder.Services.AddStoreModule();
builder.Services.AddUserModule();
builder.Services.AddScoped<JwtService>();
#endregion

#region Controllers + JSON config
builder.Services.AddControllers()
.AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(
        new System.Text.Json.Serialization.JsonStringEnumConverter()
    );
});
#endregion

#region CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        p => p.WithOrigins("http://localhost:5173")
              .AllowAnyMethod()
              .AllowAnyHeader());
});
#endregion

var app = builder.Build();

#region SEED DATABASE
using (var scope = app.Services.CreateScope())
{
    await SeedRunner.RunAsync(scope.ServiceProvider);
}
#endregion

#region Middleware Pipeline

app.UseMiddleware<ExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "HMS API v1");
        c.RoutePrefix = string.Empty;
    });
}

app.UseCors("AllowReact");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

#endregion

app.Run();