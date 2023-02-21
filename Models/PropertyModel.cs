using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Renipe.Models
{

    public partial class PropertyModel
    {
        [Key]
        public int ID { get; set; }

        public int RecipeId { get; set; }
        [Required]
        public string Title { get; set; } = null!;

        public string SourceUrl { get; set; }

    }
}
