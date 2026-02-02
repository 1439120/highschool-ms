using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Models;

namespace HighSchoolManagementApi.Dtos.Subjects
{
    public class UpdateSubjectsDto
    {
        public string Name { get; set; } = string.Empty;
        public int? GradeId { get; set; }
    }
}