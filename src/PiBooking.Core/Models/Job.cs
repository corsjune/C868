using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper.Contrib.Extensions;

namespace PiBooking.Core.Models
{
    [Table("Job")]
    public class Job : BaseModel
    {
        [Key]
        public int  JobId { get; set; }

        public int CustomerId { get; set; }

        public string JobName { get; set; }

        public string JobDescription { get; set; }


    }
}
