using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Models;

namespace HighSchoolManagementApi.Interfaces
{
    public interface IDocumentsRepository
    {
        Task<List<Documents>> GetDocumentsAsync(string fieldname, string table);
        Task<Documents> GetDocumentByIDAsync(int id);
        Task<Documents> UploadDocumentDAsync(Documents document);
        Task<Documents> DeleteDocumentDAsync(int id);
    }
}