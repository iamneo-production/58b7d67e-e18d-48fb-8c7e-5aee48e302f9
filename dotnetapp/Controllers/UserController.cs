using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;
using System.Data.SqlClient;
using System.Data;
namespace dotnetapp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {


        /* this method returns an IActionResult, and the result being returned is a string 
           * and By returning Ok(result), the result will be sent as the response*/

        BusinessLayer businesslayer = new BusinessLayer();

        /* this method returns an IActionResult, and the result being returned is a string */
        [HttpPut]
        [Route("editUsersById/{UserId}")]
        public IActionResult editUsersById(UserModel user, int UserId)
        {
            string result = businesslayer.editUsersById(user, UserId);
            return Ok(result);
        }

    }

}