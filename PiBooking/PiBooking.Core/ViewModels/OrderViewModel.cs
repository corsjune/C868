using System;
using System.Collections.Generic;
using System.Text;

namespace PiBooking.Core.ViewModels
{
    public class OrderViewModel
    {
        public CustomerViewModel Customer { get; set; }
        public JobViewModel Job { get; set; }
        public PaymentViewModel Payment { get; set; }
        public List<TimeSlotViewModel> TimeSlots { get; set; }
        public string Signature { get; set; }
    }
}
