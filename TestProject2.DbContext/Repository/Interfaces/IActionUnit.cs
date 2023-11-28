using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestProject2.DbContext.Repository.Interfaces
{
    public interface IActionUnit
    {
        UserRepository User { get; }
        CategoryRepository Category { get; }
        ManufacturerRepository Manufacturer { get; }
        ShoesRepository Shoes { get; }
        CartRepository Cart { get; }
        OrderRepository Order { get; }
        OrderDetailRepository OrderDetail { get; }
        void Save();
    }
}
