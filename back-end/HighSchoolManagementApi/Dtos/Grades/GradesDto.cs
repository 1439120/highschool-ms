using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HighSchoolManagementApi.Dtos.Grades
{
    public class GradesDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int GradeNumber { get; set; }
    }
}