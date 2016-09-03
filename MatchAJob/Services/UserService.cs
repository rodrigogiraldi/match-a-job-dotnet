using MatchAJob.Config;
using MatchAJob.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MatchAJob.Services
{
    public class UserService
    {
        public Contexts Db { get; set; }

        public UserService()
        {
            this.Db = new Contexts();
        }

        public string find(User user)
        {
            var result = Db.Users.FirstOrDefault(w => w.Email == user.Email && w.Password == user.Password);
            if (result != null)
            {
                return JsonConvert.SerializeObject(result);
            }
            else
            {
                //return "User not found!";
                return JsonConvert.SerializeObject(new { msg = "User not found!" });
            }
        }

        public string add(User user)
        {
            var findByEmail = Db.Users.Where(w => w.Email == user.Email);

            if (findByEmail.Count() > 0)
            {
                return JsonConvert.SerializeObject(new { msg = "Email already used!", error = 1 });
            }
            else
            {
                Db.Users.Add(user);
                Db.SaveChanges();

                user.Password = "";
                return JsonConvert.SerializeObject(user);
            }
        }
    }
}