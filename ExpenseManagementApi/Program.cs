using ExpenseManagement.Data.Entity;
using ExpenseManagementApi.Extensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExpenseManagementApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            try
            {

                var host = CreateHostBuilder(args).Build();

                using (var scope = host.Services.CreateScope())
                {
                    var serviceProvider = scope.ServiceProvider;
                    try
                    {
                        var context = serviceProvider.GetRequiredService<ApplicationDbContext>();
                        context.Database.Migrate(); // migrate db

                        var userManager = serviceProvider.GetRequiredService<UserManager<User>>();

                        var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

                        // seed data
                        DataSeeder.SeedData(context, userManager, roleManager).Wait();

                    }
                    catch (Exception ex)
                    {
                        var logger = serviceProvider.GetRequiredService<ILogger<Program>>();
                    }
                }
                host.Run();

            }
            catch (Exception e)
            {
                throw;
            }
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
