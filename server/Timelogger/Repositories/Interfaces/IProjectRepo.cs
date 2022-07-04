using System.Collections.Generic;
using Timelogger.Entities;

namespace Timelogger.Repositories
{
    public interface IProjectRepo
    {
         IEnumerable<Project> GetAll();
         Project GetById(string id);
         void Add(Project project);
         void Update(string id, Project project);
         void Delete(string id);
    }
}