using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Models;
using HighSchoolManagementApi.Dtos.Grades;

namespace HighSchoolManagementApi.Dtos.Subjects
{
    public class SubjectsDto
    {
         public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public GradesDto? Grade { get; set; }
    }
}