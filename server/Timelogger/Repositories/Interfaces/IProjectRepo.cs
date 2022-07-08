using System.Collections.Generic;
using Timelogger.Entities;
using System;

namespace Timelogger.Repositories.Interfaces
{
    public interface IProjectRepo
    {
         IEnumerable<Project> GetAll();
         Project GetById(Guid id);
         void Add(Project project);
         void Update(Guid id, Project project);
         void Delete(Guid id);
    }
}