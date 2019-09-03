using System;
using System.Collections.Generic;
using System.Text;

namespace PiBooking.Core.ViewModels
{
    public class EngineerViewModel
    {
        public Guid EngineerID { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public int EmployeeID { get; set; }
    }
}
