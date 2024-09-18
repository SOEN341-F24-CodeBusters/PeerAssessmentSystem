namespace Infrastructure.Models {
    public class Group {
        public Guid Id { get; set; }

        public User Teacher { get; set; }
        public List<User> Students { get; set; }
    }
}
