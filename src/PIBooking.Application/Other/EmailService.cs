using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Text;

namespace PiBooking.Application.Other
{
    public interface IEmailService
    {
        bool SendMail(List<string> To, List<string> CC, List<string> BCC, string subject, string body);
    }
    public class EmailService : IEmailService
    {
        private string _server;
        private int _port;
        private string _userName;
        private string _password;
        private string _emailFrom;
        private string _emailFromName;

        public EmailService(IOptions<AppSettings.AppSettings> settings)
        {
            _server = settings.Value.EmailSMTPHost;
            _port = Convert.ToInt32(settings.Value.EmailSMTPPort);
            _userName = settings.Value.EmailSMTPUser;
            _password = settings.Value.EmailSMTPPassword;
            _emailFrom = settings.Value.EmailFrom;
            _emailFromName = settings.Value.EmailFromName;
        }

        public bool SendMail(List<string> To, List<string> CC, List<string> BCC, string subject, string body)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(_emailFromName, _emailFrom));
            To.ForEach(x => message.To.Add(new MailboxAddress(x, x)));
            CC.ForEach(x => message.Cc.Add(new MailboxAddress(x, x)));
            BCC.ForEach(x => message.Bcc.Add(new MailboxAddress(x, x)));

            message.Subject = subject;
            message.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = body
            };

            using (var client = new SmtpClient())
            {
                // For demo-purposes, accept all SSL certificates (in case the server supports STARTTLS)
                client.ServerCertificateValidationCallback = (s, c, h, e) => true;

                client.Connect(_server, _port, false);

                // Note: only needed if the SMTP server requires authentication
                client.Authenticate(_userName, _password);

                client.Send(message);
                client.Disconnect(true);
            }

            return true;
        }
    }
}
