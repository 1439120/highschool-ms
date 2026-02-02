using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Models;

namespace HighSchoolManagementApi.Dtos.Grades
{
    public class CreateGradesDto
    {
        public string Name { get; set; } = string.Empty;
        public int GradeNumber { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;
    }
}