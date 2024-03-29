using System.Collections.Generic;
using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Timelogger.Entities
{
    public class Activity : _EntityBase
    {
        [JsonProperty("id")]
        public Guid Id { get; set; }
        [JsonProperty("name")]
		public string Name { get; set; }
        [JsonProperty("description")]
		public string Description { get; set; }
        [JsonProperty("projectId")]
		public Guid? ProjectId { get; set; }
        [JsonProperty("status")]
		public string Status { get; set; }
        [ForeignKey("ProjectId")]
        [JsonProperty("project")]
        public Project Project { get; set; }
        [JsonProperty("totalHours")]
        public int TotalHours { get; set; }
        [JsonProperty("startDate")]
		public DateTime? StartDate { get; set; }
		[JsonProperty("endDate")]
		public DateTime? EndDate { get; set; }
        //public ICollection<User> UserList { get; set; }

    }
}