using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HighSchoolManagementApi.Helpers
{
    public class QueryObject
    {
        public string? Name { get; set; } = null;
        public string? Surname { get; set; } = null;
        public string? SortBy { get; set; } = null;
        public bool IsDescending { get; set; } = false;
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 20;
        public string? Type { get; set; }
        public int Grade { get; set; } = 0;
        public int Term { get; set; } = 1;
    }
}