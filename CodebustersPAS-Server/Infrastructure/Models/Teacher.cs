using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Infrastructure.Models {
    public class Teacher {

        [Key]
        public Guid Id { get; set; }

        [NotMapped]
        public User? user { get; set; }
    }
}