using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace HighSchoolManagementApi.Dtos.Classroom
{
    public class CreateClassroomDto
    {
        [Required]
        [MinLength(3, ErrorMessage = "Name must be 3 characters")]
        [MaxLength(20, ErrorMessage = "Name cannot be over 20 characters")]
        public string Name { get; set; } = string.Empty;
        public int? Grade { get; set; }
        public int? ClassTeacher { get; set; }
        public int MaximumOccupants { get; set; }
        public int RegisteredStudents { get; set; }
        public int academicYear { get; set; }
        public string roomNumber { get; set; } = string.Empty;
    }
}