using System;
using System.Collections.Generic;
using System.Text;
using Dapper.Contrib.Extensions;

namespace PiBooking.Core.Models
{
    [Table("Order")]
    public class Order
    {
        [Key]
        public int OrderID { get; set; }

        public int Customer { get; set; }
        public int Job { get; set; }
        public int Payment { get; set; }
        public List<Timeslot> TimeSlots { get; set; }
        public string Signature { get; set; }
    }
}
