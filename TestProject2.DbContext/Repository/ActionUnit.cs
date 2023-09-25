using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestProject2.DbContext.Repository.Interfaces;

namespace TestProject2.DbContext.Repository
{
    public class ActionUnit : IActionUnit
    {
        private ApplicationDbContext _context;
        public UserRepository User { get; private set; }
        public CategoryRepository Category { get; private set; }
        public ManufacturerRepository Manufacturer { get; private set; }
        public ShoesRepository Shoes { get; private set; }
        public ActionUnit(ApplicationDbContext context)
        {
            _context = context;
            User = new UserRepository(context);
            Category = new CategoryRepository(context);
            Manufacturer = new ManufacturerRepository(context);
            Shoes = new ShoesRepository(context);
        }
        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
