﻿using System;
using System.Collections.Generic;
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

        public SavedRecipesController(RenipeDBContext context)
        {
            _context = context;
        }

        // GET: api/SavedRecipes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SavedRecipe>>> GetRecipes()
        {
            return await _context.Recipes.ToListAsync();
        }

        // GET: api/SavedRecipes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SavedRecipe>> GetSavedRecipe(int id)
        {
            var savedRecipe = await _context.Recipes.FindAsync(id);

            if (savedRecipe == null)
            {
                return NotFound();
            }

            return savedRecipe;
        }

        // PUT: api/SavedRecipes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSavedRecipe(int id, SavedRecipe savedRecipe)
        {
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

        // POST: api/SavedRecipes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SavedRecipe>> PostSavedRecipe(SavedRecipe savedRecipe)
        {
            _context.Recipes.Add(savedRecipe);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSavedRecipe", new { id = savedRecipe.ID }, savedRecipe);
        }

        // DELETE: api/SavedRecipes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSavedRecipe(int id)
        {
            var savedRecipe = await _context.Recipes.FindAsync(id);
            if (savedRecipe == null)
            {
                return NotFound();
            }

            _context.Recipes.Remove(savedRecipe);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SavedRecipeExists(int id)
        {
            return _context.Recipes.Any(e => e.ID == id);
        }
    }
}
