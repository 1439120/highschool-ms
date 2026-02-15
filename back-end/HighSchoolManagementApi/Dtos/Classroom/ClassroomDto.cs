using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Dtos.Users;
using HighSchoolManagementApi.Dtos.Grades;

namespace HighSchoolManagementApi.Dtos.Classroom
{
    public class ClassroomDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public GradesDto? Grade { get; set; }
        public UsersDto? ClassTeacher { get; set; }
        public int MaximumOccupants { get; set; }
        public int RegisteredStudents { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public int academicYear { get; set; }
        public string roomNumber { get; set; } = string.Empty;
        public List<UsersDto> Learners {get; set;} 
    }
}