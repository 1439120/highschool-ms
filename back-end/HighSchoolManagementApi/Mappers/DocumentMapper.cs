using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Models;
using HighSchoolManagementApi.Dtos.Documents;

namespace HighSchoolManagementApi.Mappers
{
    public static class DocumentMapper
    {
        public static Documents? FromCreateToDocumentModel(this CreateDocumentDto documentDto)
        {
            if(documentDto == null) return null;
            return new Documents
            {
                Filename = documentDto.Filename,
                Fieldname = documentDto.Fieldname,
                Table = documentDto.Table,
                Data = documentDto.Data,
                CreatedById = documentDto.CreatedById
            };
        }
    }
}