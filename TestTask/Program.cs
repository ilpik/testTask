using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using TestTask.Data;
using TestTask.Models;

namespace TestTask
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            try
            {
                var scope = host.Services.CreateScope();

                var ctx = scope.ServiceProvider.GetRequiredService<AppDbContext>();

                await ctx.Database.EnsureCreatedAsync();

                if (!ctx.Departments.Any())
                {
                    var departments = new List<Department>()
                    {
                        new Department()
                            {
                                Name = "Отдел разработки"
                            },
                            new Department()
                            {
                                Name = "Отдел маркетинга"
                            },
                            new Department()
                            {
                                Name = "Отдел продаж"
                            },
                            new Department()
                            {
                                Name = "Бухгалтерия"
                            },
                            new Department()
                            {
                                Name = "Юридический отдел"
                            }
                    };
                    foreach (var val in departments)
                    {
                        ctx.Departments.Add(val);
                        await ctx.SaveChangesAsync();

                    }
                    
                }

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            await host.RunAsync();


        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
