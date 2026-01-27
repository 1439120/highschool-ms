using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HighSchoolManagementApi.Models
{
    public class Classroom
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int? GradeId { get; set; }
        public Grades? Grade { get; set; } // Navigation property
        public int? ClassTeacherId { get; set; }
        public Users ClassTeacher { get; set; } // Navigation property
        public int MaximumOccupants { get; set; }
        public int RegisteredStudents { get; set; }
        public int RegisteredStudents { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now();
    }
}