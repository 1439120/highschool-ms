using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HighSchoolManagementApi.Dtos.Classroom
{
    public class UpdateClassroomDto
    {
        public string Name { get; set; } = string.Empty;
        public int? Grade { get; set; }
        public int? ClassTeacher { get; set; }
        public int MaximumOccupants { get; set; }
        public int RegisteredStudents { get; set; }
        public int academicYear { get; set; }
        public string roomNumber { get; set; } = string.Empty;
    }
}