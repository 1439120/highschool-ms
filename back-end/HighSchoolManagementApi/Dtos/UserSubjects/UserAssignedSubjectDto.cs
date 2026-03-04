using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HighSchoolManagementApi.Dtos.UserSubjects
{
    public class UserAssignedSubjectDto
    {
        public int UserId { get; set; }
        public int ClassId { get; set; }
        public int SubjectId { get; set; }
    }
}