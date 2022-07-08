using System.Collections.Generic;
using Timelogger.Entities;
using System;

namespace Timelogger.Repositories.Interfaces
{
    public interface IActivityRepo
    {
         IEnumerable<Activity> GetAll();
         Activity GetById(Guid id);
         void Add(Activity activity);
         void Update(Guid id, Activity activity);
         void Delete(Guid id);
    }
}