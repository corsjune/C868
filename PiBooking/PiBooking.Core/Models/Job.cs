using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataStore.Public
{
    public class Job
    {
        public Guid  JobId { get; set; }

        public string JobName { get; set; }

        public string JobDescription { get; set; }

        public Guid CustomerAccountId { get; set; }
    }
}
