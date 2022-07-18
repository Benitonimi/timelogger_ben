using System;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace Timelogger.Entities.Dto
{
    public class ProjectSummaryDto
    {
		[JsonProperty("totalProjectCount")]
		public int TotalProjectCount { get; set; }
		[JsonProperty("activeProjectCount")]
        public int ActiveProjectCount { get; set; }
		[JsonProperty("completedProjectCount")]
        public int CompletedProjectCount { get; set; }
		[JsonProperty("totalProjectRevenue")]
		public double TotalProjectRevenue { get; set; }
		[JsonProperty("totalProjectCost")]
		public double TotalProjectCost { get; set; }
		[JsonProperty("totalActivityCount")]
		public int TotalActivityCount { get; set; }
		[JsonProperty("activeActivityCount")]
        public int ActiveActivityCount { get; set; }
		[JsonProperty("completedActivityCount")]
        public int CompletedActivityCount { get; set; }        
        
    }
}