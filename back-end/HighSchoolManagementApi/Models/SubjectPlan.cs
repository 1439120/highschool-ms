using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HighSchoolManagementApi.Models
{
    public class SubjectPlan
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int SubjectId { get; set; }
        public Subjects Subject { get; set; }
        public string CreatedById { get; set; }
        public AuthUser CreatedBy { get; set; }
        public int GradeId { get; set; }
        public Grades Grade { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
        public DateTime LastUpdatedOn { get; set; } = DateTime.UtcNow;
        public int Year { get; set; }
        public List<LessonPlan> LessonPlans {get; set;} = new List<LessonPlan>();
    }
}