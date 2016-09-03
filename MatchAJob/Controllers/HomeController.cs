using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MatchAJob.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult index()
        {
            return Redirect("/content/views/login.html");
        }
    }
}