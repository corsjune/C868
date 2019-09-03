using System;
using System.Collections.Generic;
using System.Text;

namespace PiBooking.Core.ViewModels
{
    public class PaymentViewModel
    {
        public Guid PaymentId { get; set; }

        public Guid JobId { get; set; }

        public string PaymentConfirmationId { get; set; }

        public DateTime PaymentDatetime { get; set; }

        public Decimal PaymentAmount { get; set; }
 
    }
}
