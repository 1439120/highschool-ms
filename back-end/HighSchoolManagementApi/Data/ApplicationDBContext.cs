using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using HighSchoolManagementApi.Models;

namespace HighSchoolManagementApi.Data
{
    public class ApplicationDBContext: DbContext
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions): base(dbContextOptions)
        {
            
        }

        public DbSet<Grades> Grades { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<Subjects> Subjects { get; set; }
        public DbSet<Classroom> Classroom { get; set; }
    }
}