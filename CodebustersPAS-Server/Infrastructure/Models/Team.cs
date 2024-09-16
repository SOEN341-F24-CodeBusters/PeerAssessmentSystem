using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    public class Team
    {
        public Guid Id { get; set; }

        public String TeamName{ get; set; }
        public Group Group{ get; set; }

        public List<User> Students { get; set; }
    }
}
