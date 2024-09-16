using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddPASDbContext(this IServiceCollection services)
        {
            services.AddDbContext<PeerAssessmentSystemDbContext>();

            return services;
        }
    }
}
