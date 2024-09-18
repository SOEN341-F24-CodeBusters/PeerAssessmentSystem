namespace Infrastructure.Models {
    public class Team {
        public Guid Id { get; set; }

        public String TeamName { get; set; }
        public Group Group { get; set; }

        public List<User> Students { get; set; }
    }
}
