using Dapper.Contrib.Extensions;

namespace PiBooking.Core.Models
{
    [Table("Customer")]
    public class CustomerAccount : BaseModel
    {
        [Key]
        public int CustomerId { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Phone { get; set; }

        public string Address { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public string ZipCode { get; set; }

        public string Company { get; set; }

        public string CompanyTitle { get; set; }
    }
}
