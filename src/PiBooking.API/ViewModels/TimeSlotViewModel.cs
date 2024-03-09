using System;
using System.Collections.Generic;
using System.Text;

namespace PiBooking.Core.ViewModels
{
    public class TimeSlotViewModel
    {
        public int TimeslotId { get; set; }

        public int? EngineerID { get; set; }

        public DateTime BeginDatetime { get; set; }

        public DateTime EndDatetime { get; set; }

        public Decimal? Rate { get; set; }

        public int Status { get; set; }

        public bool IsBooked { get; set; }
    }
}
