using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HighSchoolManagementApi.Models
{
    public class UserClasses
    {
        public int UsersId { get; set; }
        public int ClassId { get; set; }
        public Users Users { get; set; }
        public Classroom Class { get; set; }
    }
}