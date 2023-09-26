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
        [Consumes("multipart/form-data")]
        public void CreateShoes([FromForm] ShoesVM vm)
        {
            if (ModelState.IsValid)
            {
                string fileName = String.Empty;
                Shoes shoes = new Shoes();
                if (vm.ImageData != null)
                {
                    string uploadPath = Path.Combine(_webHostEnvironment.WebRootPath, "ProductImage");
                    fileName = Guid.NewGuid().ToString() + vm.ImageData.FileName;
                    string filePath = Path.Combine(uploadPath, fileName);
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        vm.ImageData.CopyTo(fileStream);
                    }
                    shoes.ImageUrl = @"\ProductImage\" + fileName;
                }
                shoes.Name = vm.Name;
                shoes.ManufacturerId = vm.ManufacturerId;
                shoes.CategoryId = vm.CategoryId;
                shoes.Description = vm.Description;
                shoes.Price = vm.Price;
                shoes.Category = _action.Category.GetT(x => x.Id == vm.CategoryId);
                shoes.Manufacturer = _action.Manufacturer.GetT(x => x.Id == vm.ManufacturerId);
                _action.Shoes.Add(shoes);
                _action.Save();
            }
        }
    }
}
