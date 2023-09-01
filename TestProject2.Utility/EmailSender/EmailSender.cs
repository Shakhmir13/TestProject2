using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace TestProject2.Utility.EmailSender
{
    public class EmailSender
    {
        private readonly string _smtpHost = "smtp-pulse.com";
        private readonly int _smtpPort = 2525; // порт SMTP сервера
        private readonly string _smtpUsername = "sh.paltushev@alatau-clinic.kz";
        private readonly string _smtpPassword = "sXHMnbgF5ZTqXe";

        public async Task SendEmailAsync(string to, string subject, string message)
        {
            using (var client = new SmtpClient(_smtpHost, _smtpPort))
            {
                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential(_smtpUsername, _smtpPassword);
                client.EnableSsl = true;

                var mailMessage = new MailMessage();
                mailMessage.From = new MailAddress(_smtpUsername);
                mailMessage.To.Add(to);
                mailMessage.Subject = subject;
                mailMessage.Body = message;
                mailMessage.IsBodyHtml = true;

                await client.SendMailAsync(mailMessage);
            }
        }
    }
}
