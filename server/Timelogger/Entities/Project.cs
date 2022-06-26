using System;
using Newtonsoft.Json;

namespace Timelogger.Entities
{
	public class Project : _EntityBase
	{
		[JsonProperty("id")]
        public int Id { get; set; }
		[JsonProperty("name")]
		public string Name { get; set; }
		[JsonProperty("description")]
		public string Description { get; set; }
		[JsonProperty("activity")]
		public Activity Activity { get; set; }
		[JsonProperty("status")]
		public string Status { get; set; }
		[JsonProperty("startDate")]
		public DateTime StartDate { get; set; }
		[JsonProperty("endDate")]
		public DateTime? EndDate { get; set; }
		[JsonProperty("currency")]
		public double Currency { get; set; }
			
	}
}
