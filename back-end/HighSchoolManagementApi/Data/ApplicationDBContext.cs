using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using HighSchoolManagementApi.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace HighSchoolManagementApi.Data
{
    public class ApplicationDBContext: IdentityDbContext<AuthUser>
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions): base(dbContextOptions)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // defining a many 2 many relation wfor subjects and teachers/learners
            modelBuilder.Entity<UserSubject>(x => x.HasKey(p => new {p.AuthUserId, p.SubjectId}));
            modelBuilder.Entity<UserSubject>()
                .HasOne(u => u.AuthUser)
                .WithMany(u => u.UserSubject)
                .HasForeignKey(p => p.AuthUserId);
            
            modelBuilder.Entity<UserSubject>()
                .HasOne(u => u.Subjects)
                .WithMany(u => u.UserSubject)
                .HasForeignKey(p => p.SubjectId);

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

            // Composite keys for my many 2 many relations
            modelBuilder.Entity<UserClasses>()
                .HasKey(uc => new { uc.UsersId, uc.ClassId });

            modelBuilder.Entity<ClassSubjects>()
                .HasKey(uc => new { uc.ClassId, uc.SubjectId });
            
            modelBuilder.Entity<UserAssignedSubjects>()
                .HasKey(uc => new { uc.UserId, uc.ClassId, uc.SubjectId });

            List<IdentityRole > roles = new List<IdentityRole >
            {
                new IdentityRole 
                {
                    Id = "cac43a6e-f7bb-4448-ba05-931d27eb5e93",
                    Name = "Admin",
                    NormalizedName = "ADMIN",
                },
                new IdentityRole 
                {
                    Id = "8af1a341-3b76-4654-979b-57777174620f",
                    Name = "User",
                    NormalizedName = "USER",
                }
            };
            modelBuilder.Entity<IdentityRole>().HasData(roles);
        }

        public DbSet<Grades> Grades { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<Subjects> Subjects { get; set; }
        public DbSet<Classroom> Classroom { get; set; }
        public DbSet<UserSubject> UserSubject { get; set; }
        public DbSet<LessonPlan> LessonPlan { get; set; }
        public DbSet<SubjectPlan> SubjectPlan { get; set; }
        public DbSet<UserClasses> UserClasses { get; set; }
        public DbSet<ClassSubjects> ClassSubjects { get; set; }
        public DbSet<UserAssignedSubjects> UserAssignedSubjects { get; set; }
    }
}