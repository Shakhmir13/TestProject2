using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestProject2.Models
{
    public class OrderDetail
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public Order order { get; set; }
        public int ProductId { get; set; }
        public Shoes shoes { get; set; }
        public double price { get; set; }
        public int count { get; set; }
    }
}
