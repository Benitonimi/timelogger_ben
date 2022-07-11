using System.Collections.Generic;
using Timelogger.Entities;
using System;
using Timelogger.Repositories.Interfaces;
using System.Linq;

namespace Timelogger.Repositories.Implementations
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
        public Project GetById(Guid id)
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

        public void Update(Guid id, Project project)
        {
            var proj = GetById(id);
            proj.Name = project.Name;
            proj.Description = project.Description;
            proj.Status = project.Status;
            proj.StartDate = project.StartDate;
            proj.EndDate = project.EndDate;
            proj.EstimatedCost = project.EstimatedCost;

            //_context.Projects.Attach(project);
            //_context.Entry(project).State = EntityState.Modified;
            _context.Projects.Update(proj);
            _context.SaveChanges();
        }


        public void Delete(Guid id)
        {
            var proj = GetById(id);
            var activity = _context.Activities?.Where(x => x.ProjectId == proj.Id).ToList();
            activity?.ForEach(x => _context.Remove(x));
            _context.Projects.Remove(proj);
            _context.SaveChanges();
        }
    }
}