using CameraAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

namespace CameraAPI.Controllers
{
    [Route("api/admin")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("connection");
        }

        [HttpPost]
        [Route("signup")]
        public string SaveAdmin(UserModel user)
        {
            string msg = string.Empty;

            try
            {
                using (var conn = new SqlConnection(_connectionString))
                using (var cmd = new SqlCommand("AddAdmin", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@email", user.email);
                    cmd.Parameters.AddWithValue("@password", user.password);
                    cmd.Parameters.AddWithValue("@username", user.username);
                    cmd.Parameters.AddWithValue("@mobileNumber", user.mobileNumber);
                    cmd.Parameters.AddWithValue("@userRole", user.userRole);

                    conn.Open();
                    int data = cmd.ExecuteNonQuery();

                    if (data >= 1)
                    {
                        msg = "Admin Added";
                    }
                    else
                    {
                        msg = "Email Id or Mobile Number already Exists!";
                    }
                }
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return msg;
        }

        [HttpPost]
        [Route("login")]
        public bool IsAdminPresent(LoginModel data)
        {
            bool msg = false;

            try
            {
                using (var conn = new SqlConnection(_connectionString))
                using (var cmd = new SqlCommand("CameraServiceAdminLogin", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@email", data.email);
                    cmd.Parameters.AddWithValue("@password", data.password);

                    conn.Open();
                    DataTable dt = new DataTable();
                    using (var da = new SqlDataAdapter(cmd))
                    {
                        da.Fill(dt);
                    }

                    msg = dt.Rows.Count >= 1;
                }
            }
            catch (Exception)
            {
                // Handle the exception appropriately
            }

            return msg;
        }

        [HttpGet]
        [Route("getAdminByEmailId")]
        public UserModel GetAdminByEmailId(string email)
        {
            UserModel m = new UserModel();

            try
            {
                using (var conn = new SqlConnection(_connectionString))
                using (var cmd = new SqlCommand("getAdminByEmail", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@email", email);

                    conn.Open();
                    using (var dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            m.username = dr["username"].ToString();
                            m.userRole = dr["userRole"].ToString();
                        }
                    }
                }
            }
            catch (Exception)
            {
                // Handle the exception appropriately
            }

            return m;
        }

        [HttpPost]
        [Route("usersignup")]
        public string SaveUser(UserModel user)
        {
            string msg = string.Empty;

            try
            {
                using (var conn = new SqlConnection(_connectionString))
                using (var cmd = new SqlCommand("AddUser", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@email", user.email);
                    cmd.Parameters.AddWithValue("@password", user.password);
                    cmd.Parameters.AddWithValue("@username", user.username);
                    cmd.Parameters.AddWithValue("@mobileNumber", user.mobileNumber);
                    cmd.Parameters.AddWithValue("@userRole", user.userRole);

                    conn.Open();
                    int data = cmd.ExecuteNonQuery();

                    if (data >= 1)
                    {
                        msg = "User Added";
                    }
                    else
                    {
                        msg = "Email Id or Mobile Number already Exists!";
                    }
                }
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return msg;
        }

        [HttpPost]
        [Route("userlogin")]
        public bool IsUserPresent(LoginModel data)
        {
            bool msg = false;

            try
            {
                using (var conn = new SqlConnection(_connectionString))
                using (var cmd = new SqlCommand("CameraServiceUserLogin", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@email", data.email);
                    cmd.Parameters.AddWithValue("@password", data.password);

                    conn.Open();
                    DataTable dt = new DataTable();
                    using (var da = new SqlDataAdapter(cmd))
                    {
                        da.Fill(dt);
                    }

                    msg = dt.Rows.Count >= 1;
                }
            }
            catch (Exception)
            {
                // Handle the exception appropriately
            }

            return msg;
        }

        [HttpGet]
        [Route("getUserByEmailId")]
        public UserModel GetUserByEmailId(string email)
        {
            UserModel m = new UserModel();

            try
            {
                using (var conn = new SqlConnection(_connectionString))
                using (var cmd = new SqlCommand("getUserByEmail", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@email", email);

                    conn.Open();
                    using (var dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            m.username = dr["username"].ToString();
                            m.userRole = dr["userRole"].ToString();
                        }
                    }
                }
            }
            catch (Exception)
            {
                // Handle the exception appropriately
            }

            return m;
        }
    }
}
