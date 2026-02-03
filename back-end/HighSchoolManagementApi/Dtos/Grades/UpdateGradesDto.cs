using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HighSchoolManagementApi.Dtos.Grades
{
    public class UpdateGradesDto
    {
        public string Name { get; set; } = string.Empty;
        public int GradeNumber { get; set; }
    }
}