using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure {
    public class PeerAssessmentSystemDbContext : DbContext {
        public DbSet<User> Users { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<StudentEvaluation> StudentEvaluations { get; set; }

        public string DbPath { get; }


        public PeerAssessmentSystemDbContext() {
            var folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Environment.GetFolderPath(folder);
            DbPath = System.IO.Path.Join(path, "CodebustersPAS.db");
        }

        // The following configures EF to create a Sqlite database file in the special "local" folder
        protected override void OnConfiguring(DbContextOptionsBuilder options)
                => options.UseSqlite($"Data Source={DbPath}");

        protected override void OnModelCreating(ModelBuilder modelBuilder) {

            modelBuilder.Entity<User>()
                .HasOne(u => u.student)
                .WithOne(s => s.User)
                .HasForeignKey<Student>(e => e.UserID)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<User>()
                .HasOne(u => u.teacher)
                .WithOne(t => t.User)
                .HasForeignKey<Teacher>(e => e.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Student>()
                .HasMany(s => s.EvaluationsGiven)
                .WithOne(e => e.Evaluator)
                .IsRequired(true)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Student>()
                .HasMany(s => s.EvaluationsRecived)
                .WithOne(e => e.Evaluated)
                .IsRequired(true)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Team>()
                .HasMany(t => t.StudentEvaluations)
                .WithOne(e => e.Team)
                .IsRequired(true)
                .OnDelete(DeleteBehavior.Cascade);

            base.OnModelCreating(modelBuilder);
        }
    }
}
