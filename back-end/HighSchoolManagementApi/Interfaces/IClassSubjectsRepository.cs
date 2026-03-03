using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Models;

namespace HighSchoolManagementApi.Interfaces
{
    public interface IClassSubjectsRepository
    {
        Task<List<Subjects>> GetClassSubjects(int classId);
        Task<ClassSubjects> AddSubjectToClass(ClassSubjects classSubject);
        Task<ClassSubjects?> DeleteClassSubject(int classId, int subjectId);
    }
}