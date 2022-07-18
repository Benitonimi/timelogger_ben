using System;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace Timelogger.Entities.Dto
{
    public class ProjectDetailsDto : ProjectDto
    {       

		[JsonProperty("totalProjectDays")]
		public int TotalProjectDays { get; set; }
        
    }
}