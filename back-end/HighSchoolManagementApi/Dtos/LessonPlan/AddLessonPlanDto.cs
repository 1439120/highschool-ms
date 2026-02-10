using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HighSchoolManagementApi.Dtos.LessonPlan
{
    public class AddLessonPlanDto
    {
        public string Name { get; set; }
        public int SubjectsId { get; set; }
        public string ResponsibleId { get; set; }
        public int GradesId { get; set; }
    }
}