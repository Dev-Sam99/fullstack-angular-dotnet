var builder = WebApplication.CreateBuilder(args);

// 🔧 Add services
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddControllers();

var app = builder.Build();

// 🔧 Use correct middleware order
app.UseHttpsRedirection();

app.UseStaticFiles();        // 🟢 Serve Angular frontend (wwwroot)
app.UseRouting();

app.UseCors("AllowAll");     // ✅ CORS must come after routing setup

app.UseAuthorization();

app.MapControllers();        // 🟢 Serve API from /api/*
app.MapFallbackToFile("index.html"); // 🟢 Angular routes fallback

app.Run();
