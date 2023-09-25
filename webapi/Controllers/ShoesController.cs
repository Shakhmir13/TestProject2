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
            if (ModelState.IsValid)
            {
                string fileName = String.Empty;
                if (file != null)
                {
                    string uploadPath = Path.Combine(_webHostEnvironment.WebRootPath, "ProductImage");
                    fileName = Guid.NewGuid().ToString() + file.FileName;
                    string filePath = Path.Combine(uploadPath, fileName);

                    if (vm.shoes.ImageUrl != null)
                    {
                        var oldImagePath = Path.Combine(_webHostEnvironment.WebRootPath, vm.shoes.ImageUrl.TrimStart('\\'));
                        if (System.IO.File.Exists(oldImagePath))
                        {
                            System.IO.File.Delete(oldImagePath);
                        }
                    }
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        file.CopyTo(fileStream);
                    }
                    vm.shoes.ImageUrl = @"\ProductImage\" + fileName;
                }
                if (vm.shoes.Id == 0)
                {
                    _action.Shoes.Add(vm.shoes);
                }
                else
                {
                    _action.Shoes.Update(vm.shoes);
                }

                _action.Save();
            }
        }
    }
}
