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
        public int SubjectsId { get; set; }
        public Subjects Subjects { get; set; }
        public string ResponsibleId { get; set; }
        public AuthUser Responsible { get; set; }
        public int GradesId { get; set; }
        public Grades Grades { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
        public DateTime LastUpdatedOn { get; set; } = DateTime.UtcNow;
    }
}