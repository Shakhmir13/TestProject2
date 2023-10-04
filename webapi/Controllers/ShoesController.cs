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
                    shoes.ImageUrl = filePath;
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
        [HttpGet("GetAllCategories")]
        public IActionResult GetCategories()
        {
            var categories = _action.Category.GetAll();
            return Ok(categories);
        }
        [HttpGet("GetAllManufacturers")]
        public IActionResult GetManufacturers()
        {
            var manufacturers = _action.Manufacturer.GetAll();
            return Ok(manufacturers);
        }
        [HttpGet("GetAllShoes")]
        public IActionResult GetShoes()
        {
            var shoes = _action.Shoes.GetAll(includeProperties: "Category,Manufacturer");
            return Ok(shoes);
        }
        [HttpPost("GetShoesByName")]
        public IActionResult GetShoesByName(string? searchtext)
        {
            var shoes = _action.Shoes.GetAll(x => x.Name.Contains(searchtext), includeProperties: "Category,Manufacturer");
            return Ok(shoes);
        }
        [HttpPost("GetShoesByCategory")]
        public IActionResult GetShoesByCategory(int? categoryId)
        {
            var shoes = _action.Shoes.GetAll(x => x.CategoryId == categoryId, includeProperties: "Category,Manufacturer");
            return Ok(shoes);
        }
        [HttpPost("GetShoesByManufacturer")]
        public IActionResult GetShoesByManufacturer(int? manufacturerId)
        {
            var shoes = _action.Shoes.GetAll(x => x.ManufacturerId == manufacturerId, includeProperties: "Category,Manufacturer");
            return Ok(shoes);
        }
        [HttpPut("UpdateCategoryById")]
        public IActionResult UpdateCategoryById(int categoryId, string newName)
        {
            var category = _action.Category.GetT(x => x.Id == categoryId);
            category.Name = newName;
            _action.Category.Update(category);
            _action.Save();
            return Ok(category);
        }
        [HttpPut("UpdateManufacturerById")]
        public IActionResult UpdateManufacturerById(int manufacturerId, string newName)
        {
            var manufacturer = _action.Manufacturer.GetT(x => x.Id == manufacturerId);
            manufacturer.Name = newName;
            _action.Manufacturer.Update(manufacturer);
            _action.Save();
            return Ok(manufacturer);
        }
    }
}
