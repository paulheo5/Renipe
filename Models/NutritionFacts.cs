using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Permissions;

namespace Renipe.Models
{
    static class ToMealClass
    {
        public static Meal ToMeal(this NutritionFacts nf)
        {
            return new Meal()
            {
                FoodName = nf.FoodName,
                ServingSize = nf.ServingSize,
                ServingSizeUnit = nf.ServingSizeUnit,
                CaloriesPerServing = nf.CaloriesPerServing,
                CarbohydratesPerServing = nf.CarbohydratesPerServing,
                ProteinPerServing = nf.ProteinPerServing,
                FatPerServing = nf.FatPerServing,
                PhosphorusPerServing = nf.PhosphorusPerServing,
                PotassiumPerServing = nf.PotassiumPerServing,
                SodiumPerServing = nf.SodiumPerServing,
                Servings = 1,
                Date = DateTime.Now
            };
        }
    }
    public class NutritionFacts
    {
        [Key]
        public int NutritionId { get; set; }
        [DisplayName("Name")]
        public string FoodName { get; set; }
        [DisplayName("ServingSize")]
        public string? ServingSize { get; set; }
        [DisplayName("ServingSizeUnit")]
        public string? ServingSizeUnit { get; set; }
        [DisplayName("Calories")]
        public int CaloriesPerServing { get; set; }
        [DisplayName("Carbohydrates")]
        public int CarbohydratesPerServing { get; set; }
        [DisplayName("Protein")]
        public int ProteinPerServing { get; set; }
        [DisplayName("Fat")]
        public int FatPerServing { get; set; }
        [DisplayName("Phosphorus")]
        public int PhosphorusPerServing { get; set; }
        [DisplayName("Potassium")]
        public int PotassiumPerServing { get; set; }
        [DisplayName("Sodium")]
        public int SodiumPerServing { get; set; }
    }
}
