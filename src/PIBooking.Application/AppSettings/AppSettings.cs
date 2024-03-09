using System;
using System.Collections.Generic;
using System.Text;

namespace PiBooking.Application.AppSettings
{
    public class AppSettings
    {
        public string Secret { get; set; }
        public string PersistanceConnectionString { get; set; }
        public string EmailFromName { get; set; }
        public string EmailFrom { get; set; }
        public string EmailSMTPUser { get; set; }
        public string EmailSMTPSubject { get; set; }
        public string EmailSMTPPassword { get; set; }
        public string EmailSMTPHost { get; set; }
        public string EmailSMTPPort { get; set; }


    }
}
