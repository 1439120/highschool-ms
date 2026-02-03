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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Classroom>()
                .HasOne(c => c.ClassTeacher)           // Classroom has one ClassTeacher
                .WithMany()                             // Teacher has many classrooms (or zero)
                .HasForeignKey(c => c.ClassTeacherId)  // use this FK property
                .OnDelete(DeleteBehavior.Restrict);     // usually Restrict or SetNull for teachers


            modelBuilder.Entity<Classroom>()
                .HasMany(c => c.Learners)              // Classroom has many Learners
                .WithOne()                              // each Learner belongs to one Classroom (or none)
                .HasForeignKey(u => u.LearnerClassroomId)     // ← IMPORTANT: you need this FK on Users!
                .OnDelete(DeleteBehavior.Restrict);     // or Cascade / SetNull depending on business rule
        }

        public DbSet<Grades> Grades { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<Subjects> Subjects { get; set; }
        public DbSet<Classroom> Classroom { get; set; }
    }
}