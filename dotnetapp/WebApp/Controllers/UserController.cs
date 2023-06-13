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
        public string addUser(UserModel user)
        {
            return (businesslayer.addUser(user));
        }
        [HttpGet]
        [Route("getAllUsers")]
        public List<UserModel> getAllUsers()
        {
            return businesslayer.getAllUsers();
        }
        [HttpGet]
        [Route("getUser/{UserId}")]

        public UserModel getUser(int UserId)
        {
            return businesslayer.getUser(UserId);
        }
        [HttpPut]
        [Route("editUsersById/{UserId}")]
        public string editUsersById(UserModel user, int UserId)
        {
            return businesslayer.editUsersById(user, UserId);
        }
        [HttpDelete]
        [Route("deleteUsers")]
        public string deleteUsers(List<int> userIds)
        {
            return businesslayer.deleteUsers(userIds);
        }
    }
       
}


