using System;
using System.Collections.Generic;
using System.Text;
using Dapper.Contrib.Extensions;

namespace PiBooking.Core.Models
{
    [Table("Engineer")]
    public class Engineer
    {
        [Key]
        public int EngineerID { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public int EmployeeID { get; set; }

        public decimal Rate { get; set; }

        public DateTime AvailableStartDate { get; set; }

        public DateTime AvailableEndDate { get; set; }

        public DateTime WorkDayBeginTime { get; set; }

        public DateTime WorkDayEndTime { get; set; }

    }
}
