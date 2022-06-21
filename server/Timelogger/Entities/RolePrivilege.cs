using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Timelogger.Entities
{
    public class RolePrivilege : _EntityBase
    {
        public RolePrivilege()
        {
        }

        public RolePrivilege(int id, int roleId, Role role, int privilegeId, Privilege privilege)
        {
            this.Id = id;
            this.RoleId = roleId;
            this.Role = role;
            this.PrivilegeId = privilegeId;
            this.Privilege = privilege;

        }
        public int Id { get; set; }
        public int RoleId { get; set; }
        [ForeignKey("RoleId")]
        public Role Role { get; set; }
        public int PrivilegeId { get; set; }
        [ForeignKey("PrivilegeId")]
        public Privilege Privilege { get; set; }
    }

}