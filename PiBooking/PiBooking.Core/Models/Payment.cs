using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataStore.Public
{
    public class Payment
    {
        public Guid PaymentId { get; set; }

        public string PaymentConfirmationId{ get; set; }

        public DateTime PaymentDatetime { get; set; }

        public Decimal PaymentAmount { get; set; }

        //[Reference(ReferenceType.Foreign, ColumnName = "job_id", ReferenceMemberName = "job_id")]
        //[ComplexMapping]
        public Guid JobId { get; set; }

 
    }
}
