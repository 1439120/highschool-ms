using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HighSchoolManagementApi.Models
{
    [Table("UserSubject")]
    public class UserSubject
    {
        public string AuthUserId { get; set; }
        public int SubjectId { get; set; }
        public AuthUser AuthUser { get; set; }
        public Subjects Subjects { get; set; }
    }
}