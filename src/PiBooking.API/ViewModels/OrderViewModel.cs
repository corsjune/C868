using System;
using System.Collections.Generic;
using System.Text;

namespace PiBooking.Core.ViewModels
{
    public class OrderViewModel
    {
        public int OrderID { get; set; }
        public CustomerViewModel Customer { get; set; }
        public JobViewModel Job { get; set; } 
        public EngineerViewModel Engineer { get; set; }
        public bool HasPaid { get; set; }
        public List<TimeSlotViewModel> TimeSlots { get; set; }
        public string Signature { get; set; }
         
        public Decimal  Total { get; set; }

        public DateTime? CreateDate { get; set; }

        public DateTime? UpdateDate { get; set; }
    }
}
