
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Renipe.Models
{
    public class RecipeData
    {
        //[JsonProperty("id")]
        [Key]
        public int ID { get; set; }

        public string Title { get; set; }
        public string Image { get; set; }

        public string ReadyInMinutes { get; set; }

        public string Summary { get; set; }

        public List<AnalyzedInstruction> analyzedInstructions { get; set; }
        //public string name { get; set; }

        //public List<Step> steps { get; set; }

        //[JsonProperty("sourceUrl")]
        public string SourceUrl { get; set; }
        public List<ExtendedIngredient> extendedIngredients { get; set; }

    }
    public class AnalyzedInstruction
    {

        //public string name { get; set; }
        public List<Step> steps { get; set; }
    }
    public class Step
        
    {


        //public int number { get; set; }
        public string step { get; set;}
    }
    public class Ingredients
    {
        public int id { get; set; }
        public string name { get; set; }
        public string localizedName { get; set; }
        public string image { get; set; }
    }
    public class ExtendedIngredient
    {
        public int id { get; set; }
        public string aisle { get; set; }
        public string image { get; set; }
        public string consistency { get; set; }
        public string name { get; set; }
        public string nameClean { get; set; }
        public string original { get; set; }
        public string originalName { get; set; }
        public double amount { get; set; }
        public string unit { get; set; }
        public List<string> meta { get; set; }
        public Measures measures { get; set; }
    }
    public class Measures
    {
        public Us us { get; set; }
        public Metric metric { get; set; }
    }

    public class Us
    {
        public double amount { get; set; }
        public string unitShort { get; set; }
        public string unitLong { get; set; }
    }
    public class Metric
    {
        public double amount { get; set; }
        public string unitShort { get; set; }
        public string unitLong { get; set; }
    }

}
