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

            public DateTime CreatedUtc { get; set; } = DateTime.UtcNow;

            public int CreatedById { get; set; } = 1;

            public DateTime UpdatedUtc { get; set; } = DateTime.UtcNow;

            public int UpdatedById { get; set; } = 1;

            public bool Deleted { get; set; } = false;
        }

    }
}