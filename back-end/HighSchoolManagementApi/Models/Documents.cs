using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HighSchoolManagementApi.Models
{
    public class Documents
    {
        public int Id { get; set; }
        public string Filename { get; set; }
        public string Fieldname { get; set; }
        public string Table { get; set; }
        public byte[] Data { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
        public DateTime LastUpdatedOn { get; set; } = DateTime.UtcNow;
        public string CreatedById { get; set; }
        public AuthUser CreatedBy { get; set; }
    }
}