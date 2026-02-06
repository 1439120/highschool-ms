using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HighSchoolManagementApi.Models
{
    [Table("Classrooms")]
    public class Classroom
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int? GradeId { get; set; }
        public Grades? Grade { get; set; } // Navigation property
        public int? ClassTeacherId { get; set; } = null;
        public Users? ClassTeacher { get; set; } = null;// Navigation property
        public int MaximumOccupants { get; set; }
        public int RegisteredStudents { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public List<Users> Learners {get; set;} = new List<Users>();
    }
}