using Microsoft.EntityFrameworkCore;

namespace Infrastructure {
    public static class DbInitializer {
        public static void Initialize(PeerAssessmentSystemDbContext context) {

            if (context.Database.GetPendingMigrations().Any()) {
                context.Database.Migrate();
            }
        }
    }
}
