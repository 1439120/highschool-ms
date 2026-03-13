using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HighSchoolManagementApi.Dtos.SubjectTopic
{
    public class AddSubjectTopicDto
    {
        public string Name { get; set; } = string.Empty;
        public int Term { get; set; }
        public int StartWeek { get; set; }
        public int EndWeek { get; set; }
        public int Progress { get; set; }
        public string Description { get; set; }
        public int SubjectPlanId { get; set; }
    }
}