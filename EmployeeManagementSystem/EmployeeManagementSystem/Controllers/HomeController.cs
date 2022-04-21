using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagementSystem.Controllers
{
   
    public class HomeController : ControllerBase
    {
        public string index()
        {
            return "API is Running";
        }
    }
}
