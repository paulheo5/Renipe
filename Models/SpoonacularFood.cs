using Microsoft.Identity.Client;

namespace Renipe.Models
{
    public class Bad
    {
        public string title { get; set; }
        public string amount { get; set; }
        public bool indented { get; set; }
        public double percentOfDailyNeeds { get; set; }
    }

    public class CaloricBreakdown
    {
        public double percentProtein { get; set; }
        public double percentFat { get; set; }
        public double percentCarbs { get; set; }
    }

    public class Flavonoid
    {
        public string name { get; set; }
        public double amount { get; set; }
        public string unit { get; set; }
    }

    public class Good
    {
        public string title { get; set; }
        public string amount { get; set; }
        public bool indented { get; set; }
        public double percentOfDailyNeeds { get; set; }
    }

    public class SPIngredient
    {
        public int id { get; set; }
        public string name { get; set; }
        public double amount { get; set; }
        public string unit { get; set; }
        public List<Nutrient> nutrients { get; set; }
    }

    public class Nutrient
    {
        public string name { get; set; }
        public double amount { get; set; }
        public string unit { get; set; }
        public double percentOfDailyNeeds { get; set; }
    }

    public class Property
    {
        public string name { get; set; }
        public double amount { get; set; }
        public string unit { get; set; }
    }
    public static class SPToMeal
    {
        public static NutritionFacts ToNutritionFacts(this SpoonacularFood food)
        {
            int calories = getAmount(food, "calories");
            int carbohydrates = getAmount(food, "carbohydrates");
            int protein = getAmount(food, "protein");
            int fat = getAmount(food, "fat");
            int phosphorus = getAmount(food, "phosphorus");
            int potassium = getAmount(food, "potassium");
            int sodium = getAmount(food, "sodium");
            string servingSize = "";
            string servingSizeUnit = "";

            if(food.weightPerServing != null)
            {
                servingSize = food.weightPerServing.amount.ToString();
                servingSizeUnit = food.weightPerServing.unit;
            }
            return new NutritionFacts()
            {
                ServingSize = servingSize,
                ServingSizeUnit = servingSizeUnit,
                CaloriesPerServing = calories,
                CarbohydratesPerServing = carbohydrates,
                ProteinPerServing = protein,
                FatPerServing = fat,
                PhosphorusPerServing = phosphorus,
                PotassiumPerServing = potassium,
                SodiumPerServing = sodium
            };
        }
        public static int getAmount(SpoonacularFood food, string nutrient)
        {
            if(food.nutrients != null && food.nutrients.SingleOrDefault(n => n.name == nutrient) != null)
            {
                string amount = food.nutrients.SingleOrDefault(n => n.name == nutrient).amount.ToString();
               
                for (int i = 0; i < amount.Length; i++)
                {
                    if (char.IsLetter(amount[i]))
                    {
                        amount = amount.Remove(i);
                    }
                }
                return (int) Math.Round(double.Parse(amount));
            }
            else if(food.good.SingleOrDefault(n => n.title.ToLower() == nutrient) != null)
            {
                string amount = food.good.SingleOrDefault(n => n.title.ToLower() == nutrient).amount;
                for(int i = 0; i < amount.Length; i++)
                {
                    if (char.IsLetter(amount[i]))
                    {
                        amount = amount.Remove(i);
                    }
                }
                return (int)Math.Round(double.Parse(amount));
            }
            else if(food.bad.SingleOrDefault(n => n.title.ToLower() == nutrient) != null)
            {
                string amount = food.bad.SingleOrDefault(n => n.title.ToLower() == nutrient).amount;
                for (int i = 0; i < amount.Length; i++)
                {
                    if (char.IsLetter(amount[i]))
                    {
                        amount = amount.Remove(i);
                    }
                }
                return (int)Math.Round(double.Parse(amount));
            }
            else
            {
                return 0;
            }
        }
    }

    public class SpoonacularFood
    {
        public string calories { get; set; }
        public string carbs { get; set; }
        public string fat { get; set; }
        public string protein { get; set; }
        public List<Bad> bad { get; set; }
        public List<Good> good { get; set; }
        public List<Nutrient>? nutrients { get; set; }
        public List<Property>? properties { get; set; }
        public List<Flavonoid>? flavonoids { get; set; }
        public List<SPIngredient>? ingredients { get; set; }
        public CaloricBreakdown? caloricBreakdown { get; set; }
        public WeightPerServing? weightPerServing { get; set; }
        public long? expires { get; set; }
        public bool? isStale { get; set; }
    }

    public class WeightPerServing
    {
        public int amount { get; set; }
        public string unit { get; set; }
    }
}
