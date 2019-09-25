using System;
using System.Collections.Generic;
using System.Text;

namespace PiBooking.Core.ViewModels
{
    public class EngineerViewModel
    {
        public int EngineerID { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public int EmployeeID { get; set; }

        public decimal Rate { get; set; }

        public DateTime AvailableStartDate { get; set; }

        public DateTime AvailableEndDate { get; set; }

        public TimeSpan WorkDayBeginTime { get; set; }

        public TimeSpan WorkDayEndTime { get; set; }
    }
}
