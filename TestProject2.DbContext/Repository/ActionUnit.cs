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
        public ActionUnit(ApplicationDbContext context)
        {
            _context = context;
            User = new UserRepository(context);
        }
        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
