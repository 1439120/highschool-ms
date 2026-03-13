using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HighSchoolManagementApi.Dtos.SubjectTopic
{
    public class SubjectTopicDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Term { get; set; }
        public int StartWeek { get; set; }
        public int EndWeek { get; set; }
        public int Progress { get; set; }
        public string Description { get; set; }
        public List<ObjectiveDto> Objectives { get; set; } = new List<ObjectiveDto>();
        public List<LessonsDto> Lessons { get; set; } = new List<LessonsDto>();
    }
}