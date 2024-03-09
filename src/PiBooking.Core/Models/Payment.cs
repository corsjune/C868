using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper.Contrib.Extensions;

namespace PiBooking.Core.Models
{
    public class Payment
    {
        [Key]
        public int PaymentId { get; set; }

        public string PaymentConfirmationId{ get; set; }

        public DateTime PaymentDatetime { get; set; }

        public Decimal PaymentAmount { get; set; }

        //[Reference(ReferenceType.Foreign, ColumnName = "job_id", ReferenceMemberName = "job_id")]
        //[ComplexMapping]
        public Guid JobId { get; set; }

 
    }
}
