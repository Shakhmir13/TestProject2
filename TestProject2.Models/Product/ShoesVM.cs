using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestProject2.Models.Product
{
    public class ShoesVM
    {
        public Shoes shoes { get; set; } = new Shoes();
        [ValidateNever]
        public IEnumerable<Shoes> products { get; set; } = new List<Shoes>();
        [ValidateNever]
        public IEnumerable<SelectListItem> Categories { get; set; }
    }
}
