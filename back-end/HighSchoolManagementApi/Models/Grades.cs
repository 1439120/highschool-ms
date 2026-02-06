using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HighSchoolManagementApi.Models
{
    [Table("Grades")]
    public class Grades
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int GradeNumber { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;
    }
}