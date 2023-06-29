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
    public class UserController : ControllerBase
    {

        BusinessLayer businesslayer = new BusinessLayer();
        [HttpPost]
        [Route("addUser")]
       public IActionResult addUser(UserModel user)
        {
            string result = businesslayer.addUser(user);
            return Ok(result);
        }

        [HttpGet]
        [Route("getAllUsers")]
        public IActionResult  getAllUsers()
        {
            List <UserModel> result = businesslayer.getAllUsers();
            return Ok(result);
        }


        [HttpGet]
        [Route("getUser/{UserId}")]

        public IActionResult getUser(int UserId)
        {
            UserModel result = businesslayer.getUser(UserId);
            return Ok(result);
        }

        [HttpPut]
        [Route("editUsersById/{UserId}")]
        public IActionResult editUsersById(UserModel user, int UserId)
        {
            string result = businesslayer.editUsersById(user, UserId);
            return Ok(result);
        }

        [HttpDelete]
        [Route("deleteUsers")]
        public IActionResult deleteUsers(List<int> userIds)
        {
            string result = businesslayer.deleteUsers(userIds);
            return Ok(result);
        }
    }
       
}


