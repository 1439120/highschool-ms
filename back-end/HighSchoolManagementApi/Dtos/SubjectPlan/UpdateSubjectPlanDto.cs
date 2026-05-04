using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HighSchoolManagementApi.Dtos.SubjectPlan
{
    public class UpdateSubjectPlanDto
    {
        public string Name { get; set; }
        public int SubjectId { get; set; }
        public int GradeId { get; set; }
    }
}