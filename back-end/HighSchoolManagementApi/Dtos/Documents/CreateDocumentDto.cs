using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HighSchoolManagementApi.Dtos.Documents
{
    public class CreateDocumentDto
    {
        public string Filename { get; set; }
        public string Fieldname { get; set; }
        public string Table { get; set; }
        public byte[] Data { get; set; }
        public string CreatedById { get; set; }
    }
}