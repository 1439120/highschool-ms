using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HighSchoolManagementApi.Models
{
    public class LessonObjectives
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int TopicId { get; set; }
        public SubjectTopics Topic { get; set; }
    }
}