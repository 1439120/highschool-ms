using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Dtos.Classroom;

namespace HighSchoolManagementApi.Dtos.UserClasses
{
    public class UserClassesDto
    {
        public int UsersId { get; set; }
        public ClassroomDto Class { get; set; }
    }
}