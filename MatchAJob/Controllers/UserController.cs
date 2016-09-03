using MatchAJob.Models;
using MatchAJob.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MatchAJob.Controllers
{
    public class UserController : Controller
    {
        public UserService userService { get; set; }

        public UserController()
        {
            this.userService = new UserService();
        }

        [HttpPost]
        public string find(User user)
        {
            return this.userService.find(user);
        }

        [HttpPost]
        public string add(User user)
        {
            return this.userService.add(user);
        }
    }
}