using System;
using System.Collections.Generic;
using System.Text;

namespace PiBooking.Core.ViewModels
{
    public class PaymentViewModel
    {
        public int PaymentId { get; set; }

        public int JobId { get; set; }

        public string PaymentConfirmationId { get; set; }

        public DateTime PaymentDatetime { get; set; }

        public Decimal PaymentAmount { get; set; }
 
    }
}
