﻿using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Renipe.DataContext;
using Renipe.Models;
using System.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace Renipe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly RenipeDBContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(RenipeDBContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserDto userDto)
        {
            if (_context.Users.Where(u => u.Username == userDto.Username).Any())
            {
                return BadRequest("Username taken");
            }

            var hmac = new HMACSHA512();
            byte[] salt = hmac.Key;
            byte[] hash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(userDto.Password));

            User user = new User(userDto.Username, hash, salt);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(userDto);
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UserDto userDto)
        {
            User user = _context.Users.FirstOrDefault(u => u.Username.Equals(userDto.Username));
            if (user == null)
            {
                return BadRequest("Invalid login");
            }
            var hmac = new HMACSHA512(user.PasswordSalt);
            byte[] pw = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(userDto.Password));
            if (!pw.SequenceEqual(user.PasswordHash))
            {
                return BadRequest("Invalid login");
            }

            string token = CreateToken(user);

            //Sample code to extract Id from token
            //JwtSecurityToken jwt = new JwtSecurityToken(token);
            //string id = jwt.Claims.Single(c => c.Type == ClaimTypes.NameIdentifier).Value;

            return Ok(token);
        }
        private string CreateToken(User user)
        {
            //Information stored in the token
            List<Claim> claims = new List<Claim>
            {
                //new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                //new Claim(ClaimTypes.Name, user.Username)
                new Claim("userId", user.Id.ToString()),
                new Claim("username", user.Username)
            };
            //Signature for token security, gets key from appsettings.json
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("Auth:Token").Value));

            var signature = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            //add claims, expiration date, and use signature on token
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(3),
                signingCredentials: signature);

            //generate token string that will be sent
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
        public static bool ValidateToken(string token, byte[] key, out JwtSecurityToken jwtToken)
        {
            JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
            try
            {
                handler.ValidateToken(token, new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);
                jwtToken = (JwtSecurityToken)validatedToken;
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                jwtToken = null;
                return false;
            }
        }
        public static void GetTokenFromHeader(
            IHeaderDictionary headers,
            byte[] key,
            out JwtSecurityToken token,
            out bool isValidToken,
            out int userId,
            out string username)
        {
            try
            {
                if (headers.ContainsKey("Authorization")){
                    string tokenString = headers.Authorization;
                    isValidToken = ValidateToken(tokenString, key, out token);
                    if (isValidToken)
                    {
                        userId = int.Parse(token.Claims.Single(c => c.Type == "userId").Value);
                        username = token.Claims.Single(c => c.Type == "username").Value;
                    }
                    else
                    {
                        throw new Exception("Invalid Token");
                    }
                    return;
                }
                else
                {
                    throw new Exception("No Authorization");
                }
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                token = null;
                isValidToken = false;
                userId = -1;
                username = null;
                throw;
            }
        }
    }
}
