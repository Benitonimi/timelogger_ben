using System.Collections.Generic;
using Newtonsoft.Json;
using System;

namespace Timelogger.Entities
{
    public class Activity : _EntityBase
    {
        public int Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public int? ProjectId { get; set; }
		public string Status { get; set; }
        public Project Project { get; set; }
        public TimeSpan? TotalHours { get; set; }
        [JsonProperty("startDate")]
		public DateTime? StartDate { get; set; }
		[JsonProperty("endDate")]
		public DateTime? EndDate { get; set; }
        public ICollection<User> UserList { get; set; }

        
        
        
        
        
        
    }
}