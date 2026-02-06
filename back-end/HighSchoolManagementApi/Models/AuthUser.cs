using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;


namespace HighSchoolManagementApi.Models
{
    public class AuthUser: IdentityUser
    {
        public List<UserSubject> UserSubject {get; set;} = new List<UserSubject>();
    }
}