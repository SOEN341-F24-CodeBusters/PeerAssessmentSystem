using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Infrastructure.Models {
    public class Teacher {

        [Key]
        public Guid Id { get; set; }

        public Guid UserID { get; set; }
        public User? User { get; set; }
    }
}