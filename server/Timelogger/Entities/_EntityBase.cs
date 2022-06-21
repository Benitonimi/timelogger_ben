using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Timelogger.Entities
{
    using System;

    public class _EntityBase
    {
        //for entities that already have another base
        public interface IEntityBase
        {
            DateTime CreatedUtc { get; set; }

            int CreatedById { get; set; }

            DateTime UpdatedUtc { get; set; }

            int UpdatedById { get; set; }

            bool Deleted { get; set; }
        }

        public partial class EntityBase : IEntityBase
        {
            public EntityBase()
            {
                this.CreatedUtc = DateTime.UtcNow;
                this.CreatedById = 1;
                this.UpdatedUtc = DateTime.UtcNow;
                this.UpdatedById = 1;
                this.Deleted = false;
            }

            [Required, DatabaseGenerated(DatabaseGeneratedOption.Computed)]
            [Column(TypeName = "DateTime2")]
            public DateTime CreatedUtc { get; set; }

            public int CreatedById { get; set; }

            [Required]
            [Column(TypeName = "DateTime2")]
            public DateTime UpdatedUtc { get; set; }

            public int UpdatedById { get; set; }

            public bool Deleted { get; set; }
        }

    }
}