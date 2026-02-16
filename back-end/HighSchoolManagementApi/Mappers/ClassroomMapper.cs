using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Models;
using HighSchoolManagementApi.Dtos.Classroom;

namespace HighSchoolManagementApi.Mappers
{
    public static class ClassroomMapper
    {
        public static ClassroomDto? ToClassroomDto(this Classroom classromModel)
        {
            if(classromModel == null) return null;
            
            return new ClassroomDto
            {
                Id = classromModel.Id,
                Name = classromModel.Name,
                Grade = classromModel.Grade.ToGradesDto(),
                ClassTeacher = classromModel.ClassTeacher.ToUsersDto(),
                MaximumOccupants = classromModel.MaximumOccupants,
                RegisteredStudents = classromModel.RegisteredStudents,
                CreatedOn = classromModel.CreatedOn,
                Learners = classromModel.Learners.Select(c => c.ToUsersDto()).ToList(),
                roomNumber = classromModel.roomNumber,
                academicYear = classromModel.academicYear,
            };
        }

        public static Classroom ToClassroomFromCreateDTO(this CreateClassroomDto classromModel)
        {
            return new Classroom
            {
                Name = classromModel.Name,
                GradeId = classromModel.Grade,
                ClassTeacherId = classromModel.ClassTeacher,
                MaximumOccupants = classromModel.MaximumOccupants,
                RegisteredStudents = classromModel.RegisteredStudents,
                roomNumber = classromModel.roomNumber,
                academicYear = classromModel.academicYear,
            };
        }
    }
}