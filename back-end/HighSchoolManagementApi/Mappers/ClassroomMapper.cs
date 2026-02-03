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
        public static ClassroomDto ToClassroomDto(this Classroom classromModel)
        {
            return new ClassroomDto
            {
                Id = classromModel.Id,
                Name = classromModel.Name,
                GradeId = classromModel.GradeId,
                ClassTeacherId = classromModel.ClassTeacherId,
                MaximumOccupants = classromModel.MaximumOccupants,
                RegisteredStudents = classromModel.RegisteredStudents,
                CreatedOn = classromModel.CreatedOn,
                Learners = classromModel.Learners.Select(c => c.ToUsersDto()).ToList(),
            };
        }

        public static Classroom ToClassroomFromCreateDTO(this CreateClassroomDto classromModel)
        {
            return new Classroom
            {
                Name = classromModel.Name,
                GradeId = classromModel.GradeId,
                ClassTeacherId = classromModel.ClassTeacherId,
                MaximumOccupants = classromModel.MaximumOccupants,
                RegisteredStudents = classromModel.RegisteredStudents,
                CreatedOn = classromModel.CreatedOn,
            };
        }
    }
}