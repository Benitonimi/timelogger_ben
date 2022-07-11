using System;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace Timelogger.Entities.Dto
{
    public class ProjectDetailsDto
    {
        [JsonProperty("id")]
        public Guid Id { get; set; }
		[JsonProperty("name")]
		public string Name { get; set; }
		[JsonProperty("status")]
		public string Status { get; set; }
		[JsonProperty("startDate")]
		public DateTime StartDate { get; set; }
		[JsonProperty("endDate")]
		public DateTime EndDate { get; set; }
		[JsonProperty("estimatedCost")]
		public double EstimatedCost { get; set; }
        [JsonProperty("totalProjectDays")]
		public int TotalProjectDays { get; set; }
        [JsonProperty("activeProjectCount")]
        public int ActiveProjectCount { get; set; }
        public virtual ICollection<Activity> Activities { get; set; }
        
    }
}