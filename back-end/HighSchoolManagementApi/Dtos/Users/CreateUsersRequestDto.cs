using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HighSchoolManagementApi.Dtos.Users
{
    public class CreateUsersRequestDto
    {
        [Required]
        [MinLength(3, ErrorMessage = "Name must be 3 characters")]
        [MaxLength(20, ErrorMessage = "Name cannot be over 20 characters")]
        public string Name { get; set; } = string.Empty;
        [Required]
        [MinLength(3, ErrorMessage = "Surname must be 3 characters")]
        [MaxLength(20, ErrorMessage = "Surname cannot be over 20 characters")]
        public string Surname { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public DateOnly? DateOfBirth { get; set; }
        public DateOnly? DateJoined { get; set; }
        [Required]
        public string Type { get; set; } = string.Empty;
    }
}