using System.ComponentModel.DataAnnotations;

namespace Timelogger.Entities
{
    public class Organization : _EntityBase
    {
        public Organization(int id, string name, string phone, string fax, string email, string address1, string address2, string state, string city, string zip, string district)
        {
            this.Id = id;
            this.Name = name;
            this.Phone = phone;
            this.Fax = fax;
            this.Email = email;
            this.Address1 = address1;
            this.Address2 = address2;
            this.State = state;
            this.City = city;
            this.Zip = zip;
            this.District = district;

        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Fax { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        [Required]
        public string State { get; set; }
        public string City { get; set; }
        public string Zip { get; set; }
        [Required]
        public string District { get; set; }


    }
}