using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestProject2.Models;

namespace TestProject2.DbContext.Repository
{
    public class ManufacturerRepository : Repository<Manufacturer>
    {
        private ApplicationDbContext _context;
        public ManufacturerRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }
    }
}
