using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using System.Linq;
using dotnetapp.Models;
namespace dotnetapp.Controllers{

[ApiController]
public class AuthController : ControllerBase
{
        BusinessLayer bussinessLayer = new BusinessLayer();
        
        [HttpPost]
        [Route("admin/signup")]
        public IActionResult saveAdmin([FromBody] UserModel user)
        {
            return Created("AdminSignup", bussinessLayer.saveAdmin(user));
        }

       
        [HttpPost]
        [Route("admin/login")]
        public IActionResult isAdminPresent(LoginModel data)
        {
            return Created("AdminLogin",bussinessLayer.isAdminPresent(data));
        }

        [HttpPost]
        [Route("user/signup")]
        public IActionResult saveUser([FromBody] UserModel user)
        {
            return Created("UserSignup", bussinessLayer.saveUser(user));
        }

        [HttpPost]
        [Route("user/login")]
        public IActionResult isUserPresent(LoginModel data)
        {
            return Created("UserLogin",bussinessLayer.isUserPresent(data));
        }

        //main branch
    }
}