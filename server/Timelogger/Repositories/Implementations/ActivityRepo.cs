using System.Collections.Generic;
using Timelogger.Entities;
using System;
using Timelogger.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Timelogger.Repositories.Implementations
{
    public class ActivityRepo : IActivityRepo
    {
        private readonly ApiContext _context;

		public ActivityRepo(ApiContext context)
		{
			_context = context;
		}

        public IEnumerable<Activity> GetAll()
        {
            return _context.Activities.Include(p => p.Project);
        }
        public Activity GetById(Guid id)
        {
            var actvty = _context.Activities.Find(id);
            if(actvty == null) throw new NullReferenceException();
            return actvty;
        }
        public void Add(Activity activity)
        {
            ValidateModel(activity);
            if(!string.IsNullOrEmpty(activity.ProjectId?.ToString()))
            {
                AssociateActivityToProject(activity.ProjectId, activity);
            }
            _context.Activities.Add(activity);
            _context.SaveChanges();
        }

        public void Update(Guid id, Activity activity)
        {
            var actvty = GetById(id);
            actvty.Name = activity.Name;
            actvty.Description = activity.Description;
            actvty.Project = activity.Project;
            actvty.Status = activity.Status;
            actvty.StartDate = activity.StartDate;
            actvty.EndDate = activity.EndDate;
            actvty.ProjectId = activity.ProjectId;
            activity.TotalHours = activity.TotalHours;
            _context.Activities.Update(actvty);
            _context.SaveChanges();
        }


        public void Delete(Guid id)
        {
            var actvty = GetById(id);
            _context.Activities.Remove(actvty);
            _context.SaveChanges();
        }

        private void AssociateActivityToProject(Guid? projectId, Activity activity)
        {
            activity.Project = _context.Projects.Find(projectId);
        }

        private void ValidateModel(Activity activity)
        {
            if(String.IsNullOrEmpty(activity.Name)) throw new Exception("Activity name cannot be empty");
            if(activity.StartDate == DateTime.MinValue) throw new Exception("Activity start/end date cannot be empty");
            if(String.IsNullOrEmpty(activity.ProjectId.ToString())) throw new Exception("Activity should be mapped to a project");
        }
    }
}