using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HighSchoolManagementApi.Models;
using HighSchoolManagementApi.Interfaces;
using HighSchoolManagementApi.Dtos.Documents;
using HighSchoolManagementApi.Mappers;

namespace HighSchoolManagementApi.Controllers
{
    [Route("api/attachments")]
    [ApiController]
    public class DocumentsController: ControllerBase
    {
        private readonly IDocumentsRepository _docRepo;
        public DocumentsController(IDocumentsRepository docRepo)
        {
            _docRepo = docRepo;
        }
        [HttpGet("{fieldname}/{table}")]
        public async Task<IActionResult> GetFieldsDocuments([FromRoute] string fieldname, [FromRoute] string table)
        {
            var documents = await _docRepo.GetDocumentsAsync(fieldname, table);
            return Ok(documents);
        }
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetDocumentsByID([FromRoute] int id)
        {
            var documents = await _docRepo.GetDocumentByIDAsync(id);
            return Ok(documents);
        }
        [HttpPost]
        public async Task<IActionResult> UploadDocument([FromBody] CreateDocumentDto document)
        {
            await _docRepo.UploadDocumentDAsync(document.FromCreateToDocumentModel());
            return Ok(document);
        }
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteDocument([FromRoute] int id)
        {
            var document = await _docRepo.DeleteDocumentDAsync(id);
            return Ok(document);
        }
    }
}