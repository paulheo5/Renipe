using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NuGet.Protocol;
using Renipe.DataContext;
using Renipe.Models;

namespace Renipe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MealsController : ControllerBase
    {
        private readonly RenipeDBContext _context;
        private readonly IConfiguration _configuration;
        private readonly byte[] key;

        public MealsController(RenipeDBContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
            key = System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("Auth:Token").Value);
        }

        // GET: api/Meals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Meal>>> GetNutritionData()
        {
            var request = Request;
            var headers = request.Headers;
            try
            {
                AuthController.GetTokenFromHeader(headers, key, out JwtSecurityToken token, out bool isValidToken, out int userId, out string username);
                if (!_context.Users.Where(u => u.Username == username && u.Id == userId).Any())
                {
                    return Unauthorized();
                }
                return await _context.NutritionData.Where(m => m.UserId == userId).ToListAsync();

            }
            catch (Exception ex)
            {
                return Unauthorized(ex.Message);
            }
        }

        // GET: api/Meals/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Meal>> GetMeal(int id)
        {

            var request = Request;
            var headers = request.Headers;
            try
            {
                AuthController.GetTokenFromHeader(headers, key, out JwtSecurityToken token, out bool isValidToken, out int userId, out string username);
                if (!_context.Users.Where(u => u.Username == username && u.Id == userId).Any())
                {
                    return Unauthorized();
                }
                var meal = await _context.NutritionData.FindAsync(id);

                if (meal == null)
                {
                    return NotFound();
                }

                if (meal.UserId != userId)
                {
                    return Unauthorized();
                }

                return meal;

            }
            catch (Exception ex)
            {
                return Unauthorized(ex.Message);
            }
        }

        // PUT: api/Meals/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMeal(int id, Meal meal)
        {
            //Sample code to extract Id from token
            //JwtSecurityToken jwt = new JwtSecurityToken(token);
            //string id = jwt.Claims.Single(c => c.Type == ClaimTypes.NameIdentifier).Value;

            var request = Request;
            var headers = request.Headers;

            try
            {
                AuthController.GetTokenFromHeader(headers, key, out JwtSecurityToken token, out bool isValidToken, out int userId, out string username);
                if (!_context.Users.Where(u => u.Username == username && u.Id == userId).Any())
                {
                    return Unauthorized();
                }

                meal.User = _context.Users.Single(u => u.Id == userId);
                if (meal.User == null)
                {
                    return BadRequest("No user for meal");
                }
                _context.Entry(meal).State = EntityState.Modified;
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!MealExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return NoContent();
            }
            catch (Exception ex)
            {
                return Unauthorized(ex.Message);
            }
        }

        // POST: api/Meals
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Meal>> PostMeal(Meal meal)
        {
            var request = Request;
            var headers = request.Headers;

            try
            {
                AuthController.GetTokenFromHeader(headers, key, out JwtSecurityToken token, out bool isValidToken, out int userId, out string username);
                if (!_context.Users.Where(u => u.Username == username && u.Id == userId).Any())
                {
                    return Unauthorized();
                }

                meal.UserId = userId;
                meal.User = _context.Users.Single(u => u.Id == userId);

                _context.NutritionData.Add(meal);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetMeal", new { id = meal.MealId }, meal);
            }
            catch (Exception ex)
            {
                return Unauthorized(ex.Message);
            }
        }

        // DELETE: api/Meals/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMeal(int id)
        {
            var request = Request;
            var headers = request.Headers;

            try
            {
                AuthController.GetTokenFromHeader(headers, key, out JwtSecurityToken token, out bool isValidToken, out int userId, out string username);
                if (!_context.Users.Where(u => u.Username == username && u.Id == userId).Any())
                {
                    return Unauthorized();
                }

                var meal = await _context.NutritionData.FindAsync(id);
                if (meal == null)
                {
                    return NotFound();
                }

                if(meal.UserId != userId)
                {
                    return BadRequest();
                }

                _context.NutritionData.Remove(meal);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return Unauthorized(ex.Message);
            }
        }

        private bool MealExists(int id)
        {
            return _context.NutritionData.Any(e => e.MealId == id);
        }
    }
}
