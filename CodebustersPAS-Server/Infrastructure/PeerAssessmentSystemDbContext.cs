using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure {
    public class PeerAssessmentSystemDbContext : DbContext {
        public DbSet<User> Users { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Team> Teams { get; set; }

        public string DbPath { get; }


        public PeerAssessmentSystemDbContext() {
            var folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Environment.GetFolderPath(folder);
            DbPath = System.IO.Path.Join(path, "CodebustersPAS.db");
        }

        // The following configures EF to create a Sqlite database file in the special "local" folder
        protected override void OnConfiguring(DbContextOptionsBuilder options)
                => options.UseSqlite($"Data Source={DbPath}");
    }
}
