using Renipe.Models;
using Microsoft.EntityFrameworkCore;

namespace Renipe.DataContext
{
    public class RenipeDBContext : DbContext
    {
        public RenipeDBContext() { }
        public RenipeDBContext(DbContextOptions<RenipeDBContext> options) : base(options)
        {
        }
 
        public DbSet<PropertyModel> PropertyRecipe { get; set; }
        public DbSet<Meal> NutritionData { get; set; }

    }
}

