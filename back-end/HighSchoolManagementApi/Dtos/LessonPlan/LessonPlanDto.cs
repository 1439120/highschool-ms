using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Models;
using HighSchoolManagementApi.Dtos.Grades;
using HighSchoolManagementApi.Dtos.Subjects;
using HighSchoolManagementApi.Dtos.Account;

namespace HighSchoolManagementApi.Dtos.LessonPlan
{
    public class LessonPlanDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public SubjectsDto Subjects { get; set; }
        public UserDto Responsible { get; set; }
        // public int GradesId { get; set; }
        public GradesDto Grades { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
        public DateTime LastUpdatedOn { get; set; } = DateTime.UtcNow;
    }
}