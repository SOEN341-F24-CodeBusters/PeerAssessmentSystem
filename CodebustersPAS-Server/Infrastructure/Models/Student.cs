using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Infrastructure.Models {
    public class Student {

        [Key]
        public Guid Id { get; set; }
        public int StudentID { get; set; }

        public Guid? UserID { get; set; }
        public User? User { get; set; }

        public List<Team>? Teams { get; set; }

        public required List<StudentEvaluation> EvaluationsGiven { get; set; }
        public required List<StudentEvaluation> EvaluationsRecived { get; set; }
    }
}