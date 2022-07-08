using System.Collections.Generic;
using Timelogger.Entities;

namespace Timelogger.Repositories.Interfaces
{
    public interface IActivityRepo
    {
         IEnumerable<Activity> GetAll();
         Activity GetById(string id);
         void Add(Activity activity);
         void Update(string id, Activity activity);
         void Delete(string id);
    }
}