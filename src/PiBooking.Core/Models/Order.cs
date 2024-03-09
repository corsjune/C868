using System;
using System.Collections.Generic;
using System.Text;
using Dapper.Contrib.Extensions;

namespace PiBooking.Core.Models
{
    [Table("[Order]")]
    public class Order : BaseModel
    {
        [Key]
        public int OrderID { get; set; }
 
        public int JobID { get; set; }
        public bool HasPaid { get; set; }

        [Computed]
        public List<TimeSlot> TimeSlots { get; set; }
        public string Signature { get; set; }

        public Decimal Total { get; set; }
    }
}
