using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Models;
using HighSchoolManagementApi.Interfaces;
using HighSchoolManagementApi.Data;
using Microsoft.EntityFrameworkCore;

namespace HighSchoolManagementApi.Repository
{
    public class DocumentsRepository: IDocumentsRepository
    {
        private readonly ApplicationDBContext _context;
        public DocumentsRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<List<Documents>> GetDocumentsAsync(string fieldname, string table)
        {
            return await _context
                .Documents
                .Where(c => c.Filename == fieldname && c.Table == table)
                .ToListAsync();
        }
        public async Task<Documents> GetDocumentByIDAsync(int id)
        {
            return await _context
                .Documents
                .FirstOrDefaultAsync(c => c.Id == id);
        }
        public async Task<Documents> UploadDocumentDAsync(Documents document)
        {
            await _context.Documents.AddAsync(document);
            await _context.SaveChangesAsync();
            return document;
        }
        public async Task<Documents> DeleteDocumentDAsync(int id)
        {
            var document = await GetDocumentByIDAsync(id);
            _context.Documents.Remove(document);
            await _context.SaveChangesAsync();
            return document;
        }
    }
}