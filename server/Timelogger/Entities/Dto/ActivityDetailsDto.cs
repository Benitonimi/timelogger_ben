using Newtonsoft.Json;
using System;
namespace Timelogger.Entities.Dto
{
    public class ActivityDetailsDto
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
        [JsonProperty("project")]
        public Project Project { get; set; }
        [JsonProperty("totalHours")]
        public int TotalHours { get; set; }
        [JsonProperty("startDate")]
		public DateTime? StartDate { get; set; }
		[JsonProperty("endDate")]
		public DateTime? EndDate { get; set; }
    }
}