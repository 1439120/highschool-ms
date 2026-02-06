using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HighSchoolManagementApi.Models
{
    [Table("Subjects")]
    public class Subjects
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int? GradeId { get; set; }
        public Grades? Grade { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public List<UserSubject> UserSubject {get; set;} = new List<UserSubject>();
    }
}