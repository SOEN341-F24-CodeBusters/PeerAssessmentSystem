using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure {
    public static class DependencyInjection {
        public static IServiceCollection AddPASDbContext(this IServiceCollection services) {
            services.AddDbContext<PeerAssessmentSystemDbContext>();

            return services;
        }
    }
}
