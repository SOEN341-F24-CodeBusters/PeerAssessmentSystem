﻿namespace Infrastructure.Models {
    public class Group {
        public Guid Id { get; set; }

        public required string Name { get; set; }
        public required Teacher Teacher { get; set; }

        public required List<Team> Teams { get; set; }
    }
}
