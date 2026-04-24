// Program.cs
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.Data.SqlClient;
using System.Data;
using Microsoft.AspNetCore.Cors;

using PersonalSite.Services.Test;
using PersonalSite.DAC.Test;

using NLog;
using NLog.Web;

var logger = LogManager.Setup()
    .LoadConfigurationFromAppSettings()
    .GetCurrentClassLogger();

try
{
    // 設定 Dapper 自動將資料庫的底線命名（SNAKE_CASE）轉換為 C# 的屬性名稱（PascalCase）
    // 例如：資料庫欄位 RESUME_LINK 會對應到 Model 的 ResumeLink 屬性
    Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;
    var builder = WebApplication.CreateBuilder(args);

    builder.Logging.ClearProviders();
    builder.Host.UseNLog();

    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

    builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory());

    // 1. 設定 CORS 政策
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowFrontend", policy =>
        {
            policy.WithOrigins("http://localhost:5173", "https://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
    });

    builder.Host.ConfigureContainer<ContainerBuilder>(containerBuilder =>
    {
        var serviceAssembly = typeof(ITestService).Assembly;
        containerBuilder
            .RegisterAssemblyTypes(serviceAssembly)
            .Where(t => t.IsClass && !t.IsAbstract && t.Namespace != null && t.Namespace.StartsWith("PersonalSite.Services") && t.Name.EndsWith("Service"))
            .AsImplementedInterfaces()
            .InstancePerLifetimeScope();

        var dacAssembly = typeof(ITestDac).Assembly;
        containerBuilder
            .RegisterAssemblyTypes(dacAssembly)
            .Where(t => t.IsClass && !t.IsAbstract && t.Namespace != null && t.Namespace.StartsWith("PersonalSite.DAC") && t.Name.EndsWith("Dac"))
            .AsImplementedInterfaces()
            .InstancePerLifetimeScope();
    });

    builder.Services.AddControllers().AddJsonOptions(o =>
    {
        o.JsonSerializerOptions.PropertyNamingPolicy = null;
    });

    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();

    builder.Services.AddScoped<IDbConnection>(sp =>
    {
        var cs = connectionString ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
        return new SqlConnection(cs);
    });

    var app = builder.Build();

    // 2. 將 UseCors 放在最前面，甚至在 HttpsRedirection 之前
    app.UseCors("AllowFrontend");

    if (app.Environment.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseHttpsRedirection();
    app.UseAuthorization();
    app.MapControllers();

    app.Run();
}
catch (Exception ex)
{
    logger.Error(ex, "Web API 啟動失敗");
    throw;
}
finally
{
    LogManager.Shutdown();
}
