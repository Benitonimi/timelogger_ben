using System.Collections.Generic;
using Timelogger.Entities;

namespace Timelogger.Repositories
{
    public interface IProjectRepo
    {
         IEnumerable<Project> GetAll();
         Project GetById(int id);
         void Add(Project project);
         void Update(int id, Project project);
         void Delete(int id);
    }
}