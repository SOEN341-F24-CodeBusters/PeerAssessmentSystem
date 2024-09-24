
namespace Infrastructure.Models {
    public class User {
        public Guid Id { get; set; }
        public required string username { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Password { get; set; }
    }
}
