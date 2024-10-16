using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Infrastructure.Models {
    public class Student {

        [Key]
        public Guid Id { get; set; }

        public int StudentID { get; set; }


        [NotMapped]
        public User? user { get; set; }
        public List<Group> Groups { get; set; }
        public List<Team> Teams { get; set; }
    }
}