using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestProject2.Models
{
    public class Order
    {
        public int Id { get; set; }
        public ApplicationUser User { get; set; }
        public DateTime Created { get; set; }
        public double Total { get; set; }
        public string City { get; set; }
        public string Adress { get; set; }
        public string Phone { get; set; }
    }
}
