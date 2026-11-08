using System.Security.Claims;
using System.Text;
using InventoryManagementSystem.Data;
using InventoryManagementSystem.DTO;
using InventoryManagementSystem.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;

namespace InventoryManagementSystem.Controllers
{
    public class AuthController : Controller
    {
        private readonly AppDBContext _db;
        private readonly IConfiguration _config;

        public AuthController(AppDBContext db, IConfiguration config)
        {
            _db = db;
            _config = config;
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Username == dto.Username);
            if (user == null || !PasswordHelper.Verify(dto.Password, user.PasswordHash))
                return Unauthorized(new { message = "Invalid username or password." });

            var expiryMinutes = int.Parse(_config["Jwt:ExpiryMinutes"] ?? "60");
            var expires = DateTime.UtcNow.AddMinutes(expiryMinutes);
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));

            var descriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("sub", user.Id.ToString()),
                    new Claim("name", user.Username),
                    new Claim("role", user.Role)
                }),
                Expires = expires,
                Issuer = _config["Jwt:Issuer"],
                Audience = _config["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
            };

            var token = new JsonWebTokenHandler().CreateToken(descriptor);
            return Ok(new { token, username = user.Username, role = user.Role, expires });
        }
    
}
}
