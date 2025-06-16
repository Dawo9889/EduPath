using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace EduPath_backend.Application.Services.Email
{
    public class EmailService : IEmailService
    {
        private readonly string _smtpPassword;
        private readonly IConfiguration _configuration;
        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
            _smtpPassword = _configuration["SMTP_PASSWORD"];
        }


        public Task SendEmailAsync(string to, string subject, string body)
        {
            Console.WriteLine($"Smtp Password: {_smtpPassword}");
            var fromEmail = "edu-path@cupid.pics";
            var mailMessage = new MailMessage(fromEmail, to, subject, body)
            {
                IsBodyHtml = true
            };

            var smtpClient = new SmtpClient("smtp.resend.com")
            {
                Port = 587,
                Credentials = new NetworkCredential("resend", _smtpPassword),
                EnableSsl = true
            };
            try
            {
                smtpClient.Send(mailMessage);
                Console.WriteLine("Email sent successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending email: {ex.Message}");
            }
            return Task.CompletedTask;
        }
    }
}
