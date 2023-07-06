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

          /* this method returns an IActionResult, and the result being returned is a string */
        [HttpGet]
        [Route("getAdminByEmailId")]
        public IActionResult getAdminByEmailId(string email)
        {
            UserModel result = businesslayer.getAdminByEmailId(email);
            return Ok(result);
        }

        /* this method returns an IActionResult, and the result being returned is a Model */
        [HttpGet]
        [Route("getUserByEmailId")]
        public IActionResult getUserByEmailId(string email)
        {
            UserModel result = businesslayer.getUserByEmailId(email);
            return Ok(result);
        }
    }
}