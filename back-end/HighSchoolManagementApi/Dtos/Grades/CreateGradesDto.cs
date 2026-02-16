using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Models;
using System.ComponentModel.DataAnnotations;

namespace HighSchoolManagementApi.Dtos.Grades
{
    public class CreateGradesDto
    {
        [Required]
        [MinLength(3, ErrorMessage = "Name must be 3 characters")]
        [MaxLength(20, ErrorMessage = "Name cannot be over 20 characters")]
        public string Name { get; set; } = string.Empty;
        [Required]
        [Range(1,12)]
        public int GradeNumber { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
    }
}