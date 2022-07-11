using Microsoft.AspNetCore.Mvc;
using Timelogger.Entities;
using Timelogger.Entities.Dto;
using System.Linq;
using System;
using Microsoft.AspNetCore.Http;
using Timelogger.Repositories.Interfaces;
using System.Collections.Generic;

namespace Timelogger.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
	[ApiController]
    public class TimeloggerDashboardController : Controller
    {
        private readonly IProjectRepo _projectRepo;
        private readonly IActivityRepo _activityRepo;
        private readonly ApiContext _context;

		public TimeloggerDashboardController(IProjectRepo projectRepo, IActivityRepo activityRepo, ApiContext context)
		{
			_projectRepo = projectRepo;
            _activityRepo = activityRepo;
            _context = context;
		}

        // GET api/timeloggerdashboard
        [HttpGet]
        public List<ProjectDetailsDto> GetProjects() 
        {
            var projects = _projectRepo.GetAll();
            var activities = _activityRepo.GetAll();

            var projectDetails = projects.Select(x => new ProjectDetailsDto{
                Id = x.Id,
                Name = x.Name,
                Status = x.Status,
                StartDate = x.StartDate,
                EndDate = x.EndDate,
                EstimatedCost = x.EstimatedCost,
                TotalProjectDays = CalculateTotalProjectDays(x.Id, x),
                ActiveProjectCount = CountActiveProjects(projects.ToList()),
                Activities = activities.Where(p => p.ProjectId.Equals(x.Id)).ToList()               
            }).ToList();

            return projectDetails;
        }

        private int CalculateTotalProjectDays(Guid projectId, Project project)
        {
            var totalProjectDays = (project.EndDate - project.StartDate).TotalDays;
            return (int) totalProjectDays;
        }

        private int CountActiveProjects(List<Project> projects)
        {
            var activeProject = projects.Where(x => x.Status == "pending").ToList();
            return activeProject.Count;
        }
    }
}