using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Renipe.Models
{
    public class DayView
    {
        public List<Meal> Meals { get; set; }

        [DataType(System.ComponentModel.DataAnnotations.DataType.Date)]
        [DisplayName("Date")]
        public DateTime date => Meals.FirstOrDefault().Date;
        [Key]
        public int Id => (date - new DateTime(2023, 1, 1)).Days;

        public DayView(List<Meal> meals) 
        {
            Meals = meals;
        }

        public DayView() { }
        [DisplayName("Calories")]
        public int calories => (int)Math.Round(Meals.Sum(m => m.CaloriesPerServing * m.Servings));
        [DisplayName("Carbohydrates")]
        public int carbohydrates => (int)Math.Round(Meals.Sum(m => m.CarbohydratesPerServing * m.Servings));
        [DisplayName("Protein")]
        public int protein => (int)Math.Round(Meals.Sum(m => m.ProteinPerServing * m.Servings));
        [DisplayName("Fat")]
        public int fat => (int)Math.Round(Meals.Sum(m => m.FatPerServing * m.Servings));
        [DisplayName("Phosphorus")]
        public int phosphorus => (int)Math.Round(Meals.Sum(m => m.PhosphorusPerServing * m.Servings));
        [DisplayName("Potassium")]
        public int potassium => (int)Math.Round(Meals.Sum(m => m.PotassiumPerServing * m.Servings));
        [DisplayName("Sodium")]
        public int sodium => (int)Math.Round(Meals.Sum(m => m.SodiumPerServing * m.Servings));
    }
}
