using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Renipe.DataContext;
using Renipe.Models;

namespace Renipe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SavedRecipesController : ControllerBase
    {
        private readonly RenipeDBContext _context;
        private readonly IConfiguration _configuration;
        private readonly byte[] key;

        public SavedRecipesController(RenipeDBContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
            key = System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("Auth:Token").Value);
        }

        // GET: api/SavedRecipes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SavedRecipe>>> GetRecipes()
        {
            var request = Request;
            var headers = request.Headers;
            try
            {
                AuthController.GetTokenFromHeader(headers, key, out JwtSecurityToken token, out bool isValidToken, out int userId, out string username);
                if (!_context.Users.Where(u => u.Username == username && u.Id == userId).Any()) {
                    return Unauthorized();
                }
                //stuff here
                return await _context.Recipes.ToListAsync();
            }
            catch(Exception ex){
                return Unauthorized(ex.Message);
            }
        }

        // GET: api/SavedRecipes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SavedRecipe>> GetSavedRecipe(int id)
        {
            var request = Request;
            var headers = request.Headers;
            try{
                AuthController.GetTokenFromHeader(headers, key, out JwtSecurityToken token, out bool isValidToken, out int userId, out string username);
                if(!_context.Users.Where(u => u.Username == username && u.Id == userId).Any()){
                    return Unauthorized();
                }
                //stuff here
                var savedRecipe = await _context.Recipes.FindAsync(id);

                if (savedRecipe == null)
                {
                    return NotFound();
                }

                return savedRecipe;
            }
            catch(Exception ex){
                return Unauthorized(ex.Message);
            }
        }

        // PUT: api/SavedRecipes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSavedRecipe(int id, SavedRecipe savedRecipe)
        {
            var request = Request;
            var headers = request.Headers;
            try{
                AuthController.GetTokenFromHeader(headers, key, out JwtSecurityToken token, out bool isValidToken, out int userId, out string username);
                if(!_context.Users.Where(u => u.Username == username && u.Id == userId).Any()){
                    return Unauthorized();
                }
                //stuff here
                if (id != savedRecipe.ID)
                {
                    return BadRequest();
                }

                _context.Entry(savedRecipe).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!SavedRecipeExists(id))
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
            catch(Exception ex){
                return Unauthorized(ex.Message);
            }
        }

        // POST: api/SavedRecipes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SavedRecipe>> PostSavedRecipe(SavedRecipe savedRecipe)
        {
            var request = Request;
            var headers = request.Headers;
            try{
                AuthController.GetTokenFromHeader(headers, key, out JwtSecurityToken token, out bool isValidToken, out int userId, out string username);
                if(!_context.Users.Where(u => u.Username == username && u.Id == userId).Any()){
                    return Unauthorized();
                }
                //stuff here
                _context.Recipes.Add(savedRecipe);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetSavedRecipe", new { id = savedRecipe.ID }, savedRecipe);
            }
            catch(Exception ex){
                return Unauthorized(ex.Message);
            }
        }

        // DELETE: api/SavedRecipes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSavedRecipe(int id)
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
                //stuff here
                var savedRecipe = await _context.Recipes.FindAsync(id);
                if (savedRecipe == null)
                {
                    return NotFound();
                }

                _context.Recipes.Remove(savedRecipe);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return Unauthorized(ex.Message);
            }
        }

        private bool SavedRecipeExists(int id)
        {
            return _context.Recipes.Any(e => e.ID == id);
        }
    }
}
