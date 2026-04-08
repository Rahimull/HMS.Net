


using System.Net;
using System.Text.Json;
using HMSApi.Exceptions;

namespace HMSApi.Middleware;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;

    public ExceptionMiddleware(RequestDelegate next)
    {
        _next=next;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch(NotFoundException ex)
        {
            context.Response.StatusCode = (int)
                HttpStatusCode.NotFound;
            context.Response.ContentType = "application/json";
            var response = new
            {
                success = false,
                message = ex.Message,
                data = (object?)null
            };
            await context.Response.WriteAsync
                (JsonSerializer.Serialize(response));
        }
        catch (Exception ex)
        {
            context.Response.StatusCode = (int)
                HttpStatusCode.InternalServerError;
            context.Response.ContentType = "application/json";

            var response = new
            {
                success = false,
                message = "Internal Server Error",
                data = (object?)null,
                errors = ex.Message
            };
            await context.Response.WriteAsync
                (JsonSerializer.Serialize(response));
        }
    }
}