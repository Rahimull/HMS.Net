using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Text.Json;
using HMSApi.Exceptions;

namespace HMSApi.Middleware;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;

    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (NotFoundException ex)
        {
            await HandleException(context, HttpStatusCode.NotFound, ex);
        }
        catch (ValidationException ex)
        {
            await HandleException(context, HttpStatusCode.BadRequest, ex);
        }
        catch (UnauthorizedAccessException ex)
        {
            await HandleException(context, HttpStatusCode.Unauthorized, ex);
        }
        catch (Exception ex)
        {
            await HandleException(context, HttpStatusCode.InternalServerError, ex, isServerError: true);
        }
    }

    private async Task HandleException(
        HttpContext context,
        HttpStatusCode statusCode,
        Exception ex,
        bool isServerError = false)
    {
        _logger.LogError(ex, "Unhandled exception occurred");

        context.Response.StatusCode = (int)statusCode;
        context.Response.ContentType = "application/json";

        var response = new
        {
            success = false,
            message = isServerError ? "Internal Server Error" : ex.Message,
            errors = isServerError ? null : ex.Message,
            traceId = context.TraceIdentifier
        };

        await context.Response.WriteAsync(JsonSerializer.Serialize(response));
    }
}