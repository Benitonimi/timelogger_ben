using System.Collections.Generic;
using Timelogger.Entities;
using System;

namespace Timelogger.Repositories
{
    public class AcrivityRepo
    {
        private readonly ApiContext _context;

		public AcrivityRepo(ApiContext context)
		{
			_context = context;
		}

        public IEnumerable<Activity> GetAll()
        {
            return _context.Activities;
        }
        public Activity GetById(string id)
        {
            var actvty = _context.Activities.Find(id);
            if(actvty == null) throw new NullReferenceException();
            return actvty;
        }
        public void Add(Activity Activity)
        {
            _context.Activities.Add(Activity);
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
            _context.Activities.Update(actvty);
            _context.SaveChanges();
        }


        public void Delete(string id)
        {
            var actvty = GetById(id);
            _context.Activities.Remove(actvty);
            _context.SaveChanges();
        }
    }
}