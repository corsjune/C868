using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;
 

namespace PiBooking.Core.Models
{
    public class Timeslot
    {
        [Key]
        public int TimeslotId { get; set; }

       // [Column(ForceToUtc = false)]
        public DateTime BeginDatetime { get; set; }

       // [Column(ForceToUtc = false)]
        public DateTime EndDatetime { get; set; }

        public Decimal Rate { get; set; }

        //[Reference(ReferenceType.Foreign, ColumnName = "payment_id", ReferenceMemberName = "payment_id")]
        //[ComplexMapping]
        public Guid? PaymentId { get; set; }

        //[Reference(ReferenceType.Foreign, ColumnName = "job_id", ReferenceMemberName = "job_id")]
        //[ComplexMapping]
        public Guid? JobId { get; set; }
 

    }
}
