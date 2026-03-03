using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HighSchoolManagementApi.Models
{
    public class ClassSubjects
    {
        public int ClassId { get; set; }
        public int SubjectId { get; set; }
        public Classroom Class { get; set; }
        public Subjects Subject { get; set; }
    }
}