using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Renipe.Models
{
    [Table("NutritionData")]
    public class Meal
    {
        [Key]
        [Column("meal_id")]
        public int MealId { get; set; }
        [Column("food_name")]
        [DisplayName("Name")]
        public string FoodName { get; set; }
        [Column("serving_size")]
        [DisplayName("Serving Size")]
        public string? ServingSize { get; set; }
        [Column("serving_size_unit")]
        [DisplayName("ServingSizeUnit")]
        public string? ServingSizeUnit { get; set; }
        [Column("calories")]
        [DisplayName("Calories")]
        public int CaloriesPerServing { get; set; }
        [Column("carbohydrates")]
        [DisplayName("Carbohydrates")]
        public int CarbohydratesPerServing { get; set; }
        [Column("protein")]
        [DisplayName("Protein")]
        public int ProteinPerServing { get; set; }
        [Column("fat")]
        [DisplayName("Fat")]
        public int FatPerServing { get; set; }
        [Column("phosphorus")]
        [DisplayName("Phosphorus")]
        public int PhosphorusPerServing { get; set; }
        [Column("potassium")]
        [DisplayName("Potassium")]
        public int PotassiumPerServing { get; set; }
        [Column("sodium")]
        [DisplayName("Sodium")]
        public int SodiumPerServing { get; set; }
        [Column("servings")]
        [DisplayName("Servings")]
        public double Servings { get; set; }
        [Column("date")]
        [DisplayName("Date")]
        [System.ComponentModel.DataAnnotations.DataType(System.ComponentModel.DataAnnotations.DataType.Date)]
        public DateTime Date { get; set; }
    }
    public static class MealToDisplay
    {
        public static Meal ToDisplay(this Meal meal)
        {
            return new Meal()
            {
                MealId = meal.MealId,
                FoodName = meal.FoodName,
                ServingSize = meal.ServingSize,
                ServingSizeUnit = meal.ServingSizeUnit,
                CaloriesPerServing = (int)Math.Round(meal.CaloriesPerServing * meal.Servings),
                CarbohydratesPerServing = (int)Math.Round(meal.CarbohydratesPerServing * meal.Servings),
                ProteinPerServing = (int) Math.Round(meal.ProteinPerServing * meal.Servings),
                FatPerServing = (int) Math.Round(meal.FatPerServing * meal.Servings),
                PhosphorusPerServing = (int) Math.Round(meal.PhosphorusPerServing * meal.Servings),
                PotassiumPerServing =(int) Math.Round( meal.PotassiumPerServing * meal.Servings),
                SodiumPerServing = (int) Math.Round(meal.SodiumPerServing * meal.Servings),
                Servings = meal.Servings,
                Date = meal.Date
            };
        }
    }
}