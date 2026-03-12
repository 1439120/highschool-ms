using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HighSchoolManagementApi.Models
{
    public class SubjectTopics
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int StartWeek { get; set; }
        public int EndWeek { get; set; }
        public int Progress { get; set; }
        public string Description { get; set; }
        public List<LessonObjectives> Objectives { get; set; } = new List<LessonObjectives>();
        public List<Lessons> Lessons { get; set; } = new List<Lessons>();
    }
}