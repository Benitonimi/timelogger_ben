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
        public Activity GetById(string id)
        {
            var actvty = _context.Activities.Find(id);
            if(actvty == null) throw new NullReferenceException();
            return actvty;
        }
        public void Add(Activity activity)
        {
            if(!string.IsNullOrEmpty(activity.ProjectId?.ToString()))
            {
                AssociateActivityToProject(activity.ProjectId, activity);
            }
            _context.Activities.Add(activity);
            _context.SaveChanges();
        }

        public void Update(string id, Activity activity)
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


        public void Delete(string id)
        {
            var actvty = GetById(id);
            _context.Activities.Remove(actvty);
            _context.SaveChanges();
        }

        private void AssociateActivityToProject(Guid? projectId, Activity activity)
        {
            activity.Project = _context.Projects.Find(projectId);
        }
    }
}