using System;
using System.Collections.Generic;
using System.Text;

namespace PiBooking.Core.ViewModels
{
    public class TimeSlotViewModel
    {
        public Guid TimeslotId { get; set; }

        public DateTime BeginDatetime { get; set; }

        public DateTime EndDatetime { get; set; }

        public Decimal Rate { get; set; }

        public bool IsBooked { get; set; }
    }
}
