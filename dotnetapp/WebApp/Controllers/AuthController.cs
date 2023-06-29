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
        public IActionResult saveAdmin([FromBody] UserModel user)
        {
            string result = businesslayer.saveAdmin(user);
            return Ok(result);
        }
        [HttpPost]
        [Route("admin/login")]
        public IActionResult isAdminPresent(LoginModel data)
        {
            Boolean result = businesslayer.isAdminPresent(data);
            return Ok(result);
        }
        [HttpGet]
        [Route("getAdminByEmailId")]
        public IActionResult getAdminByEmailId(string email)
        {
            UserModel result = businesslayer.getAdminByEmailId(email);
            return Ok(result);
        }

        [HttpPost]
        [Route("user/signup")]
        public IActionResult saveUser(UserModel user)
        {
            string result = businesslayer.saveUser(user);
            return Ok(result);
        }
        [HttpPost]
        [Route("user/login")]
        public IActionResult isUserPresent(LoginModel data)
        {
            Boolean result = businesslayer.isUserPresent(data);
            return Ok(result);
        }
        [HttpGet]
        [Route("getUserByEmailId")]
        public IActionResult getUserByEmailId(string email)
        {
            UserModel result = businesslayer.getUserByEmailId(email);
            return Ok(result);
        }
    }
       
}


