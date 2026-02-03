using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Dtos.Users;

namespace HighSchoolManagementApi.Dtos.Classroom
{
    public class ClassroomDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int? GradeId { get; set; }
        public int? ClassTeacherId { get; set; }
        public int MaximumOccupants { get; set; }
        public int RegisteredStudents { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public List<UsersDto> Learners {get; set;} 
    }
}