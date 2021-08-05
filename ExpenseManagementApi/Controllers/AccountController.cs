using AutoMapper;
using ExpenseManagement.Data.DTO;
using ExpenseManagement.Data.Entity;
using ExpenseManagementApi.JwtFeatures;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace ExpenseManagementApi.Controllers
{
    [Route("api/account")]
    [ApiController]
    [Authorize]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IMapper _mapper;
        private readonly JwtHandler _jwtHandler;

        public AccountController(
            UserManager<User> userManager,
            IMapper mapper,
            JwtHandler jwtHandler,
            SignInManager<User> signInManager
            )
        {
            _userManager = userManager;
            _mapper = mapper;
            _jwtHandler = jwtHandler;
            _signInManager = signInManager;
        }

        [HttpPost("Registration")]
        [AllowAnonymous]
        public async Task<IActionResult> RegisterUser([FromBody] UserForRegistrationDto userForRegistration)
        {
            if (userForRegistration == null || !ModelState.IsValid)
                return BadRequest();

            var user = _mapper.Map<User>(userForRegistration);

            var result = await _userManager.CreateAsync(user, userForRegistration.Password);
            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description);

                return BadRequest(new RegistrationResponseDto { Errors = errors });
            }
            else
            {
                var res = await _userManager.AddToRoleAsync(user, "customer");
            }

            return StatusCode(201);
        }
        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] UserForAuthenticationDto userForAuthentication)
        {
            var user = await _userManager.FindByNameAsync(userForAuthentication.Email);
            try
            {
                var role = await _userManager.GetRolesAsync(user);
            



            if (user == null || !await _userManager.CheckPasswordAsync(user, userForAuthentication.Password))
                return Unauthorized(new AuthResponseDto { ErrorMessage = "Invalid Authentication" });
            var res = await _signInManager.PasswordSignInAsync(userForAuthentication.Email, userForAuthentication.Password, false, false);

            //var getUser = await _userManager.FindByEmailAsync(userForAuthentication.Email);
            //await _loginService.CreateLoginTimeAsync(getUser.Id);

            var signingCredentials = _jwtHandler.GetSigningCredentials();
            var claims = _jwtHandler.GetClaims(user, role[0]);
            var tokenOptions = _jwtHandler.GenerateTokenOptions(signingCredentials, claims);
            var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            return Ok(new AuthResponseDto { IsAuthSuccessful = true, Token = token, Role = role[0] });
            }
            catch (Exception ex)
            {
                return Unauthorized();
            }
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            //var userId = _appUserService.GetuserId();
            //await _loginService.CreateLogoutTimeAsync(userId);
            await _signInManager.SignOutAsync();
            return StatusCode(200);
        }


    }
}
