using MatchAJob.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace MatchAJob.Config
{
    public class Contexts : DbContext
    {
        public Contexts() : base("StringPadrao") { }

        public DbSet<User> Users { get; set; }
    }
}