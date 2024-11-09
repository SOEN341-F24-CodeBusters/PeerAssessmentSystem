using System.ComponentModel.DataAnnotations;

namespace Infrastructure.Models;

public class StudentEvaluation {
    [Key]
    public Guid Id { get; set; }
    
    public required Team Team { get; set; }
    public required Student Evaluator { get; set; }
    public required Student Evaluated { get; set; }

    public int Score { get; set; }
    public required string Comments { get; set; }

}