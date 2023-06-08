using WebApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

namespace WebApp.Controllers
{
    [Route("api/Bill")]
    [ApiController]
    public class BillController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public BillController(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("connection");
        }

        [HttpPost]
        public string InsertBillInformation(BillModel model)
        {
            string msg = string.Empty;

            try
            {
                using (var conn = new SqlConnection(_connectionString))
                using (var cmd = new SqlCommand("InsertBillInformation", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@productName", model.productName);
                    cmd.Parameters.AddWithValue("@contactNumber", model.contactNumber);
                    cmd.Parameters.AddWithValue("@username", model.username);
                    cmd.Parameters.AddWithValue("@email", model.email);
                    cmd.Parameters.AddWithValue("@serviceCenterId", model.serviceCenterId);
                    cmd.Parameters.AddWithValue("@serviceCenterName", model.serviceCenterName);
                    cmd.Parameters.AddWithValue("@serviceCost", model.serviceCost);

                    conn.Open();
                    int data = cmd.ExecuteNonQuery();

                    if (data >= 1)
                    {
                        msg = "Bill Inserted!";
                    }
                    else
                    {
                        msg = "Failed to insert bill!";
                    }
                }
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }
            return msg;
        }
    }
}
