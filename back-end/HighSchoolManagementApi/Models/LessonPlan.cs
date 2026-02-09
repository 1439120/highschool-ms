using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HighSchoolManagementApi.Models
{
    public class LessonPlan
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int SubjectId { get; set; }
        public Subjects Subjects { get; set; }
        public string TeacherId { get; set; }
        public AuthUser Responsible { get; set; }
        public int GradeId { get; set; }
        public Grades Grades { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public DateTime LastUpdatedOn { get; set; } = DateTime.Now;
    }
}