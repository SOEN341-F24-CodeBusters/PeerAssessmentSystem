using System.ComponentModel.DataAnnotations.Schema;

namespace Infrastructure.Models {
    public class Team {
        public Guid Id { get; set; }

        public required string TeamName { get; set; }
        public required Group Group { get; set; }
        public required List<Student> Students { get; set; }
    }
}
