using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HighSchoolManagementApi.Dtos.SubjectTopic
{
    public class AddLessonDto
    {
        public string Name { get; set; } = string.Empty;
        public string Status { get; set; } = "New";
        public int Duration { get; set; }
        public int TopicId { get; set; }
    }
}