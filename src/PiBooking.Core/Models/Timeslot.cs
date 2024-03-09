using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;
 

namespace PiBooking.Core.Models
{
    [Table("Timeslot")]
    public class TimeSlot : BaseModel
    {
        [Key]
        public int TimeslotID { get; set; }

        public int EngineerID { get; set; }

       // [Column(ForceToUtc = false)]
        public DateTime BeginDatetime { get; set; }

       // [Column(ForceToUtc = false)]
        public DateTime EndDatetime { get; set; }

        public Decimal? Rate { get; set; }

        public int Status { get; set; }

        public int? OrderID { get; set; }

        //[Reference(ReferenceType.Foreign, ColumnName = "payment_id", ReferenceMemberName = "payment_id")]
        //[ComplexMapping]
        //public Guid? PaymentId { get; set; }

        //[Reference(ReferenceType.Foreign, ColumnName = "job_id", ReferenceMemberName = "job_id")]
        //[ComplexMapping]
        //public Guid? JobId { get; set; }


    }
}
