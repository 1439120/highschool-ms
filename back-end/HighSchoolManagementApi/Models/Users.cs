using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HighSchoolManagementApi.Models
{
    public class Users
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public DateOnly DateOfBirth { get; set; }
        public DateOnly DateJoined { get; set; }
        public string Type { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.Now();
    }
}