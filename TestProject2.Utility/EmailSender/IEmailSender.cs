using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestProject2.Utility.EmailSender
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string to, string subject, string message);
    }
}
