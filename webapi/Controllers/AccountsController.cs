﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using TestProject2.Models.Identity;
using TestProject2.Models;
using TestProject2.Utility.Token;
using TestProject2.DbContext;
using TestProject2.Utility.EmailSender;
using System.Text;
using Microsoft.AspNetCore.WebUtilities;

namespace TestProject2.Controllers
{
    [ApiController]
    [Route("accounts")]
    public class AccountsController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole<long>> _roleManager;
        private readonly ApplicationDbContext _context;
        private readonly ITokenService _tokenService;
        private readonly IConfiguration _configuration;
        private readonly IEmailSender _emailSender;

        public AccountsController(ITokenService tokenService, ApplicationDbContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole<long>> roleManager, IConfiguration configuration, IEmailSender emailSender)
        {
            _tokenService = tokenService;
            _context = context;
            _userManager = userManager;
            _configuration = configuration;
            _roleManager = roleManager;
            _emailSender = emailSender;
        }

        /// <summary>
        /// Аутентификация пользователя.
        /// </summary>
        /// <param name="request">Данные для аутентификации.</param>
        /// <returns>Информация об аутентификации.</returns>
        [HttpPost("login")]
        [ProducesResponseType(typeof(AuthResponse), 200)]
        [ProducesResponseType(typeof(string), 400)]
        public async Task<ActionResult<AuthResponse>> Authenticate([FromBody] AuthRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var managedUser = await _userManager.FindByEmailAsync(request.Email.ToLower());
            if (managedUser == null)
            {
                var errorResponse = new ErrorResponse
                {
                    Message = "Ошибка аутентификации",
                    Errors = new List<string> { "Пользователь с таким email не существует" }
                };

                return BadRequest(errorResponse);
            }
            var isPasswordValid = await _userManager.CheckPasswordAsync(managedUser, request.Password);
            if (!isPasswordValid)
            {
                var errorResponse = new ErrorResponse
                {
                    Message = "Ошибка аутентификации",
                    Errors = new List<string> { "Неверный пароль" }
                };

                return BadRequest(errorResponse);
            }
            var user = _context.Users.FirstOrDefault(u => u.Email == request.Email.ToLower());
            if (user is null)
                return Unauthorized();
            var roleIds = _context.UserRoles.Where(r => r.UserId == user.Id).Select(x => x.RoleId).ToList();
            var roles = _context.Roles.Where(x => roleIds.Contains(x.Id)).ToList();
            var accessToken = _tokenService.CreateToken(user, roles);
            user.RefreshToken = _configuration.GenerateRefreshToken();
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(_configuration.GetSection("Jwt:RefreshTokenValidityInDays").Get<int>());
            await _context.SaveChangesAsync();

            Response.Cookies.Append("accessToken", accessToken);
            Response.Cookies.Append("Email", user.Email);

            return Ok(new AuthResponse
            {
                Username = user.UserName!,
                Email = user.Email!,
                Token = accessToken,
                RefreshToken = user.RefreshToken
            });
        }

        /// <summary>
        /// Регистрация нового пользователя.
        /// </summary>
        /// <param name="request">Данные для регистрации.</param>
        /// <returns>Информация об аутентификации после успешной регистрации.</returns>
        [HttpPost("register")]
        [ProducesResponseType(typeof(AuthResponse), 200)]
        [ProducesResponseType(typeof(string), 400)]
        public async Task<ActionResult<AuthResponse>> Register([FromBody] RegisterRequest request)
        {
            if (request.Password == null)
            {
                var errorResponse = new ErrorResponse
                {
                    Message = "Ошибка регистрации",
                    Errors = new List<string> { "Пароль не может быть пустым" }
                };

                return BadRequest(errorResponse);
            }
            if (request.Password!=request.PasswordConfirm)
            {
                var errorResponse = new ErrorResponse
                {
                    Message = "Ошибка регистрации",
                    Errors = new List<string> { "Пароли не совпадают" }
                };

                return BadRequest(errorResponse);
            }
            if (request.Password.Length < 8)
            {
                var errorResponse = new ErrorResponse
                {
                    Message = "Ошибка регистрации",
                    Errors = new List<string> { "Пароль должен содержать минимум 8 символов" }
                };

                return BadRequest(errorResponse);
            }
            string specialCharacters = "!@#$%^&*()_+{}[]|\\:;\"'<>,.?/-="; // Специальные символы
            bool containsSpecialCharacter = false;
            foreach (char c in request.Password)
            {
                if (specialCharacters.Contains(c))
                {
                    containsSpecialCharacter = true;
                    break;
                }
            }
            if (!containsSpecialCharacter)
            {
                var errorResponse = new ErrorResponse
                {
                    Message = "Ошибка регистрации",
                    Errors = new List<string> { "Пароль должен содержать минимум 1 специальный символ" }
                };

                return BadRequest(errorResponse);
            }
            var existuser = _context.Users.FirstOrDefault(u => u.Email == request.Email);
            if (existuser != null) 
            {
                var errorResponse = new ErrorResponse
                {
                    Message = "Ошибка регистрации",
                    Errors = new List<string> { "Пользователь с таким email уже существует" }
                };

                return BadRequest(errorResponse);
            }
            var user = new ApplicationUser
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email.ToLower(),
                UserName = request.Email.ToLower()
            };
            var result = await _userManager.CreateAsync(user, request.Password);
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
            if (!result.Succeeded) return BadRequest(request);
            var findUser = _context.Users.FirstOrDefault(x => x.Email == request.Email.ToLower());
            if (findUser == null) throw new Exception($"User {request.Email} not found");
            if (findUser.Email == "admin@admin.com")
            {
                await _userManager.AddToRoleAsync(findUser, RoleConsts.Administrator);
                return await Authenticate(new AuthRequest
                {
                    Email = request.Email,
                    Password = request.Password
                });
            }
            if (!await _roleManager.RoleExistsAsync(RoleConsts.Member))
            {
                var role = new IdentityRole<long>(RoleConsts.Member);
                var createRoleResult = await _roleManager.CreateAsync(role);
                if (!createRoleResult.Succeeded)
                {
                    return BadRequest(createRoleResult.Errors);
                }
            }
            if (!await _roleManager.RoleExistsAsync(RoleConsts.Moderator))
            {
                var role = new IdentityRole<long>(RoleConsts.Moderator);
                var createRoleResult = await _roleManager.CreateAsync(role);
                if (!createRoleResult.Succeeded)
                {
                    return BadRequest(createRoleResult.Errors);
                }
            }
            if (!await _roleManager.RoleExistsAsync(RoleConsts.Administrator))
            {
                var role = new IdentityRole<long>(RoleConsts.Administrator);
                var createRoleResult = await _roleManager.CreateAsync(role);
                if (!createRoleResult.Succeeded)
                {
                    return BadRequest(createRoleResult.Errors);
                }
            }
            await _userManager.AddToRoleAsync(findUser, RoleConsts.Member);
            return await Authenticate(new AuthRequest
            {
                Email = request.Email,
                Password = request.Password
            });
        }

        /// <summary>
        /// Обновление токена доступа с помощью токена обновления.
        /// </summary>
        /// <param name="tokenModel">Модель токена для обновления.</param>
        /// <returns>Новый токен доступа и токен обновления.</returns>
        [HttpPost]
        [Route("refresh-token")]
        [ProducesResponseType(typeof(object), 200)]
        [ProducesResponseType(typeof(string), 400)]
        public async Task<IActionResult> RefreshToken(TokenModel? tokenModel)
        {
            if (tokenModel is null)
            {
                return BadRequest("Invalid client request");
            }
            var accessToken = tokenModel.AccessToken;
            var refreshToken = tokenModel.RefreshToken;
            var principal = _configuration.GetPrincipalFromExpiredToken(accessToken);
            if (principal == null)
            {
                return BadRequest("Invalid access token or refresh token");
            }
            var username = principal.Identity!.Name;
            var user = await _userManager.FindByNameAsync(username!);
            if (user == null || user.RefreshToken != refreshToken)
            {
                return BadRequest("Invalid access token or refresh token");
            }
            var newAccessToken = _configuration.CreateToken(principal.Claims.ToList());
            var newRefreshToken = _configuration.GenerateRefreshToken();
            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(_configuration.GetSection("Jwt:RefreshTokenValidityInDays").Get<int>());
            await _userManager.UpdateAsync(user);
            return new ObjectResult(new
            {
                accessToken = new JwtSecurityTokenHandler().WriteToken(newAccessToken),
                refreshToken = newRefreshToken
            });
        }

        /// <summary>
        /// Запрос восстановления пароля.
        /// </summary>
        /// <param name="EmailModel">Email</param>
        /// <returns>Отправляет письмо с сылкой восстановления пароля на указанную почту.</returns>
        [HttpPost]
        [Route("request-reset")]
        public async Task<IActionResult> RequestPasswordReset([FromBody] EmailModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid request data.");
            }

            var user = await _userManager.FindByEmailAsync(model.Email.ToLower());
            if (user == null)
            {
                return NotFound("User not found.");
            }
            var code = await _userManager.GeneratePasswordResetTokenAsync(user);
            var encodedcode = Encoding.UTF8.GetBytes(code);
            var validcode = WebEncoders.Base64UrlEncode(encodedcode);
            string url = $"{_configuration["AppUrl"]}/reset?Email={model.Email}&ValidCode={validcode}";
            await _emailSender.SendEmailAsync(user.Email, "Восстановление пароля", $"<p>Для сброса пароля перейдите по ссылке <a href='{url}'>Click here</a></p>");
            return Ok("Password reset link sent successfully.");
        }

        /// <summary>
        /// Обновление пароля пользователя.
        /// </summary>
        /// <param name="ResetPasswordModel">Модель восстановления пароля.</param>
        /// <returns>Модель пользователя.</returns>
        [HttpPost]
        [Route("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(model.Email.ToLower());
                var decodedcode = WebEncoders.Base64UrlDecode(model.ValidCode);
                string normalcode = Encoding.UTF8.GetString(decodedcode);
                var result = await _userManager.ResetPasswordAsync(user, normalcode, model.Password);

                if (result.Succeeded)
                    return Ok(result);

                return BadRequest(result);
            }
            return BadRequest("Что-то пошло не так");
        }
    }
}
