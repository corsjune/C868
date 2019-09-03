using System;
using System.Collections.Generic;
using System.Text;
using Dapper.Contrib.Extensions;

namespace PiBooking.Core.Models
{
    public class Order
    {
        [Key]
        public Guid OrderID { get; set; }

        public Guid Customer { get; set; }
        public Guid Job { get; set; }
        public Guid Payment { get; set; }
        public List<Timeslot> TimeSlots { get; set; }
        public string Signature { get; set; }
    }
}
