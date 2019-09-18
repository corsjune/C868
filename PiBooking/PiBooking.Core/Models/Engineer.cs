using System;
using System.Collections.Generic;
using System.Text;
using Dapper.Contrib.Extensions;

namespace PiBooking.Core.Models
{
    public class Engineer
    {
        [Key]
        public int EngineerID { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public int EmployeeID { get; set; }

    }
}
