
using System.ComponentModel.DataAnnotations.Schema;

namespace Infrastructure.Models {
    public class User {
        public Guid Id { get; set; }
        public required string email { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Password { get; set; }


        [NotMapped]
        public Student? student { get; set; }
        [NotMapped]
        public Teacher? teacher { get; set; }
    }
}
