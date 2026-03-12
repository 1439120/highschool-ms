using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HighSchoolManagementApi.Models
{
    public class Lessons
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public int Duration { get; set; }
        public int TopicId { get; set; }
        public SubjectTopics Topic { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
        public DateTime LastUpdatedOn { get; set; } = DateTime.UtcNow;
    }
}