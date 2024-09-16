using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    public class Group
    {
        public Guid Id { get; set; }

        public User Teacher {  get; set; }
        public List<User> Students { get; set; }
    }
}
