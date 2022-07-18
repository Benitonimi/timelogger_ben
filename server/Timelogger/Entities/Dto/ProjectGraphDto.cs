using System.ComponentModel.DataAnnotations;
namespace Timelogger.Entities.Dto
{
    public class ProjectGraphDto
    {
        public string ProjectName { get; set; }
        [RegularExpression(@"^\d+\.\d{0,2}$")]
        public decimal ProjectPercent { get; set; }
        public int ActivityCount { get; set; }
        public int CompletedActivityCount { get; set; }
        [RegularExpression(@"^\d+\.\d{0,2}$")]
        public decimal CompletedActivityPercent { get; set; }
        
    }
}