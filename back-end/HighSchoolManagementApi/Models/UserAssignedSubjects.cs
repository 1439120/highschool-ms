using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HighSchoolManagementApi.Models
{
    public class UserAssignedSubjects
    {
        public int UserId { get; set; }
        public int ClassId { get; set; }
        public int SubjectId { get; set; }
        public Users User { get; set; }
        public Subjects Subject { get; set; }
        public Classroom Class { get; set; }
    }
}