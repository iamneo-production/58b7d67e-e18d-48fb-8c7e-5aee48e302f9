using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Models;
using System.Data.SqlClient;
using System.Data;
namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        BusinessLayer businesslayer = new BusinessLayer();
        [HttpPost]
        [Route("admin/signup")]
        public string saveAdmin([FromBody] UserModel user)
        {
            return (businesslayer.saveAdmin(user));
        }
        [HttpPost]
        [Route("admin/login")]
        public Boolean isAdminPresent(LoginModel data)
        {
            return (businesslayer.isAdminPresent(data));
        }
        [HttpGet]
        [Route("getAdminByEmailId")]
        public UserModel getAdminByEmailId(string email)
        {
            return (businesslayer.getAdminByEmailId(email));
        }
        [HttpPost]
        [Route("user/signup")]
        public string saveUser(UserModel user)
        {
            return businesslayer.saveUser(user);
        }
        [HttpPost]
        [Route("user/login")]
        public Boolean isUserPresent(LoginModel data)
        {
            return businesslayer.isUserPresent(data);
        }
        [HttpGet]
        [Route("getUserByEmailId")]
        public UserModel getUserByEmailId(string email)
        {
            return businesslayer.getUserByEmailId(email);
        }
    }
       
}


