using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TestProject2.DbContext.Repository.Interfaces;
using TestProject2.Models;
using TestProject2.Models.Product;

namespace webapi.Controllers
{
    [Authorize]
    [Route("shoes")]
    [ApiController]
    public class ShoesController : ControllerBase
    {
        private IActionUnit _action;
        private IWebHostEnvironment _webHostEnvironment;
        public ShoesController(IActionUnit action, IWebHostEnvironment webHostEnvironment)
        {
            _action = action;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpPost("CreateCategory")]
        public void CreateCategory([FromBody] Category category)
        {
            _action.Category.Add(category);
            _action.Save();
        }

        [HttpPost("CreateManufacturer")]
        public void CreateManufacturer([FromBody] Manufacturer manufacturer)
        {
            _action.Manufacturer.Add(manufacturer);
            _action.Save();
        }

        [HttpPost("CreateShoes")]
        public void CreateShoes(ShoesVM vm, IFormFile? file)
        {
            _action.Shoes.Add(vm);
            _action.Save();
        }
    }
}
