using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;

namespace dotnetapp.Controllers
{
    /*This class Control the user /admin signup and signin*/
    //[Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        BusinessLayer businesslayer = new BusinessLayer();

        /* this method returns an IActionResult, and the result being returned is a string
         *   * and By returning Ok(result), the result will be sent as the response*/
        [HttpPost]
        [Route("admin/signup")]
        public IActionResult saveAdmin([FromBody] UserModel user)
        {
            string result = businesslayer.saveAdmin(user);
            return Created("AdminSignup",result);
        }

        /* this method returns an IActionResult, and the result being returned is a boolean */
        [HttpPost]
        [Route("admin/login")]
        public IActionResult isAdminPresent(LoginModel data)
        {
            Boolean result = businesslayer.isAdminPresent(data);
            return Created("AdminLogin",result);
        }

        /* this method returns an IActionResult, and the result being returned is a string */
        [HttpGet]
        [Route("getAdminByEmailId")]
        public IActionResult getAdminByEmailId(string email)
        {
            UserModel result = businesslayer.getAdminByEmailId(email);
            return Ok(result);
        }

        /* this method returns an IActionResult, and the result being returned is a string */
        [HttpPost]
        [Route("user/signup")]
        public IActionResult saveUser(UserModel user)
        {
            string result = businesslayer.saveUser(user);
            return Created("UserSignup",result);
        }

        /* this method returns an IActionResult, and the result being returned is a Boolean */
        [HttpPost]
        [Route("user/login")]
        public IActionResult isUserPresent(LoginModel data)
        {
            Boolean result = businesslayer.isUserPresent(data);
            return Created("UserLogin",result);
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