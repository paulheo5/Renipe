


using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Renipe.Models

{
    public class Recipe
    {
        //[JsonProperty("id")]
        //[Required]
        public int ID { get; set; }
        //[JsonProperty("title")]
        public string Title { get; set; }
        //[JsonProperty("summary")]
        public string Summary { get; set; }

        public string Image { get; set; }
        //[JsonProperty("souceUrl")]
        public string SourceUrl { get; set; }
    }
}
