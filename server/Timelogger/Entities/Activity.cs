using System.Collections.Generic;

namespace Timelogger.Entities
{
    public class Activity : _EntityBase
    {
        public int Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public int ProjectId { get; set; }
		public string Status { get; set; }
        public ICollection<User> UserList { get; set; }
    }
}