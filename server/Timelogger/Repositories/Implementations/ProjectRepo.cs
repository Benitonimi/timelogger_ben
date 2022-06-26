using System.Collections.Generic;
using Timelogger.Entities;
using System;

namespace Timelogger.Repositories
{
    public class ProjectRepo : IProjectRepo
    {
        private readonly ApiContext _context;

		public ProjectRepo(ApiContext context)
		{
			_context = context;
		}

        public IEnumerable<Project> GetAll()
        {
            return _context.Projects;
        }
        public Project GetById(int id)
        {
            var proj = _context.Projects.Find(id);
            if(proj == null) throw new NullReferenceException();
            return proj;
        }
        public void Add(Project Project)
        {
            _context.Projects.Add(Project);
            _context.SaveChanges();
        }

        public void Update(int id, Project project)
        {
            var proj = GetById(id);
            proj.Name = project.Name;
            proj.Description = project.Description;
            proj.Activity = project.Activity;
            proj.Status = project.Status;
            proj.StartDate = project.StartDate;
            proj.EndDate = project.EndDate;
            proj.Currency = project.Currency;

            //_context.Projects.Attach(project);
            //_context.Entry(project).State = EntityState.Modified;
            _context.Projects.Update(proj);
            _context.SaveChanges();
        }


        public void Delete(int id)
        {
            var proj = GetById(id);
            _context.Projects.Remove(proj);
            _context.SaveChanges();
        }
    }
}