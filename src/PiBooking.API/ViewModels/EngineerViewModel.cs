using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;
using PiBooking.API.Utility;

namespace PiBooking.Core.ViewModels
{
    public class EngineerViewModel
    {
        public int EngineerID { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public int EmployeeID { get; set; }

        public decimal Rate { get; set; }

        [JsonConverter(typeof(AureliaDateTimeJsonConverter))]
        public DateTime AvailableStartDate { get; set; }

        [JsonConverter(typeof(AureliaDateTimeJsonConverter))]
        public DateTime? AvailableEndDate { get; set; }

        [JsonConverter(typeof(AureliaTimeOnlyJsonConverter))]
        public TimeOnly WorkDayBeginTime { get; set; }

        [JsonConverter(typeof(AureliaTimeOnlyJsonConverter))]
        public TimeOnly WorkDayEndTime { get; set; }
    }
}
