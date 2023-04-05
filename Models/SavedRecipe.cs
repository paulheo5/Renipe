using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Renipe.Models
{
    [Table("saved_recipe")]
    public partial class SavedRecipe
    {
        [Key]
        public int ID { get; set; }

        public int RecipeId { get; set; }
        [Required]
        public string Title { get; set; } = null!;

        public string SourceUrl { get; set; }

        [ForeignKey(nameof(User))]
        [Column("user_id")]
        [DisplayName("User Id")]
        public int UserId { get; set; }
        public User? User { get; set; }
    }
}
