using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Threading.Tasks;
using dotnetapp.Models;

namespace dotnetapp.Controllers
{
    /*This class Control the user /admin signup and signin*/
    [ApiController]
    public class AuthController : ControllerBase
    {
        BusinessLayer businesslayer = new BusinessLayer();

        /* this method returns an IActionResult, and the result being returned is a string
         *   * and By returning Ok(result), the result will be sent as the response*/
namespace dotnetapp.Controllers
{
    /*This class Control the user /admin signup and signin*/
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
            return Created("AdminSignup", businesslayer.saveAdmin(user));
            return Created("AdminSignup", businesslayer.saveAdmin(user));
        }

       /* this method returns an IActionResult, and the result being returned is a boolean */
       /* this method returns an IActionResult, and the result being returned is a boolean */
        [HttpPost]
        [Route("admin/login")]
        public IActionResult isAdminPresent(LoginModel data)
        {
            return Created("AdminLogin",businesslayer.isAdminPresent(data));
            return Created("AdminLogin",businesslayer.isAdminPresent(data));
        }

        /* this method returns an IActionResult, and the result being returned is a string */
        /* this method returns an IActionResult, and the result being returned is a string */
        [HttpPost]
        [Route("user/signup")]
        public IActionResult saveUser([FromBody] UserModel user)
        {
            return Created("UserSignup", businesslayer.saveUser(user));
            return Created("UserSignup", businesslayer.saveUser(user));
        }

        /* this method returns an IActionResult, and the result being returned is a string */
        /* this method returns an IActionResult, and the result being returned is a string */
        [HttpPost]
        [Route("user/login")]
        public IActionResult isUserPresent(LoginModel data)
        {
            return Created("UserLogin",businesslayer.isUserPresent(data));
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
>>>>>>> d3b1ba8fb5941e415fe114a25a9c8ca16f4af93c
=======
>>>>>>> d3b1ba8fb5941e415fe114a25a9c8ca16f4af93c
        }
    }
}