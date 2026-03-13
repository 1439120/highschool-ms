using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HighSchoolManagementApi.Dtos.SubjectTopic
{
    public class AddObjectiveDto
    {
        public string Name { get; set; } = string.Empty;
        public int TopicId { get; set; }
    }
}