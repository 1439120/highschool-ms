using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Models;

namespace HighSchoolManagementApi.Interfaces
{
    public interface IUserSubjectRepository
    {
        Task<List<Subjects>> GetUserSubjects(AuthUser user);
        Task<UserSubject> CreateAsync(UserSubject userSubject);
        Task<UserSubject> DeeleteUserSubject(AuthUser authUser, string symbol);
    }
}