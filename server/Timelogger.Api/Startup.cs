﻿using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Hosting;
using Timelogger.Entities;
using System.Collections.Generic;
using Timelogger.Repositories.Interfaces;
using Timelogger.Repositories.Implementations;

namespace Timelogger.Api
{
    public class Startup
	{
		private readonly IWebHostEnvironment _environment;
		public IConfigurationRoot Configuration { get; }

		public Startup(IWebHostEnvironment env)
		{
			_environment = env;

			var builder = new ConfigurationBuilder()
				.SetBasePath(env.ContentRootPath)
				.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
				.AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
				.AddEnvironmentVariables();
			Configuration = builder.Build();
		}

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			// Add framework services.
			services.AddLogging(builder =>
			{
				builder.AddConsole();
				builder.AddDebug();
			});

			services.AddDbContext<ApiContext>(opt => opt.UseInMemoryDatabase("Benito In-house"));
			services.AddControllers()
				.AddNewtonsoftJson()
				.AddNewtonsoftJson(x => x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

			services.AddMvc(options => options.EnableEndpointRouting = false);

			services.AddTransient<IProjectRepo, ProjectRepo>();
			services.AddTransient<IActivityRepo, ActivityRepo>();

			if (_environment.IsDevelopment())
			{
				services.AddCors();
			}
		}

		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseCors(builder => builder
					.AllowAnyMethod()
					.AllowAnyHeader()
					.SetIsOriginAllowed(origin => true)
					.AllowCredentials());
			}

			app.UseMvc();
			app.UseCors();



			var serviceScopeFactory = app.ApplicationServices.GetService<IServiceScopeFactory>();
			using (var scope = serviceScopeFactory.CreateScope())
			{
				SeedDatabase(scope);
			}
		}

		private static void SeedDatabase(IServiceScope scope)
		{
			var context = scope.ServiceProvider.GetService<ApiContext>();

			var projects = new List<Project>()
			{
				new Project { Name = "project 1", Description= "Computer Programming", Status = "completed", StartDate = System.DateTime.Today.AddDays(-5), EndDate = System.DateTime.Today.AddDays(5), EstimatedCost = (int)2009.12 },
				new Project { Name = "project 2", Description= "IT Revolution", Status = "completed", StartDate = System.DateTime.Today.AddDays(-5), EndDate = System.DateTime.Today.AddDays(4), EstimatedCost = (int)2009.12 },
				new Project { Name = "project 3", Description= "Computer Architecture and Organisation", Status = "completed", StartDate = System.DateTime.Today.AddDays(-5), EndDate = System.DateTime.Today.AddDays(1), EstimatedCost = (int)2009.12 },
				new Project { Name = "project 4", Description= "Database Systems", Status = "completed", StartDate = System.DateTime.Today.AddDays(-5), EndDate = System.DateTime.Today.AddDays(15), EstimatedCost = (int)2009.12 },
				new Project { Name = "project 5", Description= "Operating Systems", Status = "completed", StartDate = System.DateTime.Today.AddDays(-5), EndDate = System.DateTime.Today.AddDays(25), EstimatedCost = (int)2009.12 },
				new Project { Name = "project 6", Description= "Foundations of Computer Systems", Status = "pending", StartDate = System.DateTime.Today.AddDays(-5), EndDate = System.DateTime.Today.AddDays(38), EstimatedCost = (int)2009.12 },
				new Project { Name = "project 7", Description= "Computer Networks", Status = "completed", StartDate = System.DateTime.Today.AddDays(-5), EndDate = System.DateTime.Today.AddDays(35), EstimatedCost = (int)2009.12 },
				new Project { Name = "project 8", Description= "Multimedia Applications", Status = "completed", StartDate = System.DateTime.Today.AddDays(-5), EndDate = System.DateTime.Today.AddDays(65), EstimatedCost = (int)2009.12 },
				new Project { Name = "project 9", Description= "Information Technology", Status = "pending", StartDate = System.DateTime.Today.AddDays(-5), EndDate = System.DateTime.Today.AddDays(7), EstimatedCost = (int)2009.12 },
				new Project { Name = "project 10", Description= "DevOps", Status = "completed", StartDate = System.DateTime.Today.AddDays(-10), EndDate = System.DateTime.Today.AddDays(15), EstimatedCost = (int)608.12 }
			};

			projects.ForEach(x => context.Projects.Add(x));

			var activities = new List<Activity>()
			{
				new Activity { Name = "Task 1", Description= "Code Analysis", Status = "pending", StartDate = System.DateTime.Today.AddDays(-5), EndDate = System.DateTime.Today.AddDays(5), TotalHours = 8, Project = projects[0] },
				new Activity { Name = "Task 2", Description= "Debuging", Status = "completed", StartDate = System.DateTime.Today.AddDays(-35), EndDate = System.DateTime.Today.AddDays(25), TotalHours = 5, Project = projects[1] },
				new Activity { Name = "Task 2", Description= "Debuging", Status = "pending", StartDate = System.DateTime.Today.AddDays(-35), EndDate = System.DateTime.Today.AddDays(25), TotalHours = 3, Project = projects[9] },
				new Activity { Name = "Task 2", Description= "Debuging", Status = "completed", StartDate = System.DateTime.Today.AddDays(-35), EndDate = System.DateTime.Today.AddDays(25), TotalHours = 9, Project = projects[9] },
			};

			activities.ForEach(x => context.Activities.Add(x));

			context.SaveChanges();
		}
	}
}