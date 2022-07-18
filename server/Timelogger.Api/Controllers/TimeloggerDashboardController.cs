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
            var projectCount_Active = projects.Count(x => x.Status == "pending");

            var projectDetails = projects.Select(x => new ProjectDetailsDto{
                Id = x.Id,
                Name = x.Name,
                Status = x.Status,
                StartDate = x.StartDate,
                EndDate = x.EndDate,
                EstimatedCost = x.EstimatedCost,
                TotalProjectDays = CalculateTotalProjectDays(x.Id, x),
                Activities = activities.Where(p => p.ProjectId.Equals(x.Id)).ToList()               
            }).ToList();

            return projectDetails;
        }

        // GET api/projectsummary
        [HttpGet("/api/projectsummary")]
        public ProjectSummaryDto GetProjectSummary()
        {
            var projects = _projectRepo.GetAll();
            var activities = _activityRepo.GetAll();

            var projSummary = new ProjectSummaryDto{
                TotalProjectCount = projects.Count(),
                ActiveProjectCount = projects.Count(x => x.Status == "pending"),
                CompletedProjectCount = projects.Count(x => x.Status == "completed"),
                TotalProjectRevenue = projects.Sum(x => x.EstimatedCost),
                TotalProjectCost = projects.Sum(x => x.EstimatedCost),
                TotalActivityCount = activities.Count(),
                ActiveActivityCount = activities.Count(x => x.Status == "pending"),
                CompletedActivityCount = activities.Count(x => x.Status == "completed"),                
            };

            return projSummary;
        }

        //GET api/projectratio
        [HttpGet("/api/projectratio")]
        public List<ProjectGraphDto> GetProjectRatio()
        {
            var projects = _projectRepo.GetAll();
            var activities = _activityRepo.GetAll();

            var projectGraphDetails = projects?.Select(x => new ProjectGraphDto{
                ProjectName = x.Name,
                ProjectPercent = CalculateProjectRatio(x.Id),
                ActivityCount = activities.Count(act => act.ProjectId == x.Id),
                CompletedActivityCount = activities.Count(act => act.ProjectId == x.Id & act.Status == "completed"),
                CompletedActivityPercent = CalculateActivityRatioByProject(x.Id)
            }).OrderByDescending(y => y.ActivityCount).ToList();

            return projectGraphDetails;
        }

        
        private int CalculateTotalProjectDays(Guid projectId, Project project)
        {
            var totalProjectDays = (project.EndDate - project.StartDate).TotalDays;
            return (int) totalProjectDays;
        }

        private decimal CalculateProjectRatio(Guid projectId)
        {
            var activities = _activityRepo.GetAll();
            var activityCount =  activities?.Count(x => x.ProjectId == projectId);
            return (decimal) activityCount/activities.Count()*100;
        }

        private decimal CalculateActivityRatioByProject(Guid projectId)
        {
            var activities = _activityRepo.GetAll();
            var activityCount =  activities?.Count(x => x.ProjectId == projectId && x.Status == "completed");
            return (decimal) activityCount/activities.Count()*100;
        }
    }
}