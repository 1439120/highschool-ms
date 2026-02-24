using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HighSchoolManagementApi.Dtos.UserClasses
{
    public class UserClassesCreateDto
    {
        public int UsersId { get; set; }
        public int ClassId { get; set; }
    }
}