using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestProject2.Models;

namespace TestProject2.DbContext.Repository
{
    public class ShoesRepository : Repository<Shoes>
    {
        private ApplicationDbContext _context;
        public ShoesRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }
    }
}
