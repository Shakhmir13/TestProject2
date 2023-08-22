using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace TestProject2.Models
{
    public class ApplicationUser : IdentityUser<long>
    {

        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }

    }
}
