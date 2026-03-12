using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Models;
using HighSchoolManagementApi.Dtos.Subjects;
using HighSchoolManagementApi.Dtos.Users;
using HighSchoolManagementApi.Dtos.Grades;

namespace HighSchoolManagementApi.Dtos.SubjectPlan
{
    public class SubjectPlanDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public SubjectsDto Subject { get; set; }
        public UsersDto CreatedBy { get; set; }
        public GradesDto Grade { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime LastUpdatedOn { get; set; }
    }
}