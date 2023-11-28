using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestProject2.Models;

namespace TestProject2.DbContext.Repository
{
    public class OrderDetailRepository : Repository<OrderDetail>
    {
        private ApplicationDbContext _context;
        public OrderDetailRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }
    }
}
