using CameraAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

namespace CameraAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("addUser")]
        public string AddUser([FromBody] UserModel user)
        {
            string connectionString = _configuration.GetConnectionString("connection");
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("AddUser", connection);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@email", user.email);
                    cmd.Parameters.AddWithValue("@password", user.password);
                    cmd.Parameters.AddWithValue("@username", user.username);
                    cmd.Parameters.AddWithValue("@mobileNumber", user.mobileNumber);
                    cmd.Parameters.AddWithValue("@userRole", user.userRole);

                    connection.Open();
                    int data = cmd.ExecuteNonQuery();
                    if (data >= 1)
                    {
                        return "User Added";
                    }
                    else
                    {
                        return "Email Id or Mobile Number already Exists!";
                    }
                }
                catch (Exception e)
                {
                    return e.Message;
                }
            }
        }

        [HttpGet]
        [Route("getAllUsers")]
        public List<UserModel> GetAllUsers()
        {
            List<UserModel> userList = new List<UserModel>();
            string connectionString = _configuration.GetConnectionString("connection");
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("getAllUsers", connection);
                    cmd.CommandType = CommandType.StoredProcedure;
                    connection.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        UserModel user = new UserModel();
                        user.UserId = Convert.ToInt32(dr["UserId"]);
                        user.email = dr["email"].ToString();
                        user.username = dr["username"].ToString();
                        user.password = dr["password"].ToString();
                        user.mobileNumber = dr["mobileNumber"].ToString();
                        user.userRole = dr["userRole"].ToString();
                        userList.Add(user);
                    }
                }
                catch (Exception e)
                {
                    // Handle exception
                }
            }
            return userList;
        }

        [HttpGet]
        [Route("getUser/{UserId}")]
        public UserModel GetUser(int UserId)
        {
            UserModel user = new UserModel();
            string connectionString = _configuration.GetConnectionString("connection");
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("getUsersById", connection);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserId", UserId);
                    connection.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        user.email = dr["email"].ToString();
                        user.username = dr["username"].ToString();
                        user.password = dr["password"].ToString();
                        user.mobileNumber = dr["mobileNumber"].ToString();
                        user.userRole = dr["userRole"].ToString();
                    }
                }
                catch (Exception e)
                {
                    // Handle exception
                }
            }
            return user;
        }

        [HttpPut]
        [Route("editUsersById/{UserId}")]
        public string EditUsersById([FromBody] UserModel user, int UserId)
        {
            string connectionString = _configuration.GetConnectionString("connection");
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("editUser", connection);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserId", UserId);
                    cmd.Parameters.AddWithValue("@userRole", user.userRole);
                    cmd.Parameters.AddWithValue("@email", user.email);
                    cmd.Parameters.AddWithValue("@password", user.password);
                    cmd.Parameters.AddWithValue("@username", user.username);
                    cmd.Parameters.AddWithValue("@mobileNumber", user.mobileNumber);

                    connection.Open();
                    int data = cmd.ExecuteNonQuery();
                    if (data >= 1)
                    {
                        return "User Details Updated";
                    }
                    else
                    {
                        return "Failed";
                    }
                }
                catch (Exception e)
                {
                    return e.Message;
                }
            }
        }

        [HttpDelete]
        [Route("deleteUsers")]
        public string DeleteUsers(List<int> userIds)
        {
            string connectionString = _configuration.GetConnectionString("connection");
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                string msg = string.Empty;
                try
                {
                    foreach (int userId in userIds)
                    {
                        using (SqlCommand cmd = new SqlCommand("deleteById", connection))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@UserId", userId);
                            connection.Open();
                            int data = cmd.ExecuteNonQuery();
                            if (data >= 1)
                            {
                                msg += $"User with ID {userId} deleted!\n";
                            }
                            else
                            {
                                msg += $"Failed to delete user with ID {userId}\n";
                            }
                        }
                    }
                }
                catch (Exception e)
                {
                    msg = e.Message;
                }
                return msg;
            }
        }
    }
}
