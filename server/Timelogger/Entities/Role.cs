using System.Collections.Generic;

namespace Timelogger.Entities
{
    public class Role : _EntityBase
    {
        public Role(int id, int name, string description)
        {
            this.Id = id;
            this.Name = name;
            this.Description = description;

        }
        public int Id { get; set; }
        public int Name { get; set; }
        public string Description { get; set; }
        public ICollection<RolePrivilege> RolePrivileges { get; set; }
    }
}

