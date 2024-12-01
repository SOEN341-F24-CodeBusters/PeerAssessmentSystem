using System.ComponentModel.DataAnnotations;

namespace Infrastructure.Models;

public class StudentEvaluation {
    [Key]
    public Guid Id { get; set; }
    
    public required Team Team { get; set; }
    public required Student Evaluator { get; set; }
    public required Student Evaluated { get; set; }


    public short cooperation { get; set; }
    public short conceptualContributions { get; set; }
    public short practicalContributions { get; set; }
    public short workEthic { get; set; }
    public required string Comments { get; set; }

}