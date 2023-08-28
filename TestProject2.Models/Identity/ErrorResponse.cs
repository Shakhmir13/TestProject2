using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestProject2.Models.Identity
{
    public class ErrorResponse
    {
        public string Message { get; set; }
        public List<string> Errors { get; set; }
    }
}
