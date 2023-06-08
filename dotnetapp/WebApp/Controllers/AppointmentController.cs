using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

namespace CameraAPI.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _conn;

        public AppointmentController(IConfiguration configuration)
        {
            _configuration = configuration;
            _conn = new SqlConnection(_configuration.GetConnectionString("connection"));
        }

        [HttpPost]
        [Route("appointment")]
        public ActionResult<string> SaveAppointment(ProductModel data)
        {
            string msg = string.Empty;

            try
            {
                using (var cmd = new SqlCommand("addAppointment", _conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@productName", data.productName);
                    cmd.Parameters.AddWithValue("@productModelNo", data.productModelNo);
                    cmd.Parameters.AddWithValue("@dateofPurchase", data.dateofPurchase);
                    cmd.Parameters.AddWithValue("@contactNumber", data.contactNumber);
                    cmd.Parameters.AddWithValue("@problemDescription", data.problemDescription);
                    cmd.Parameters.AddWithValue("@bookedSlots", data.bookedSlots);
                    cmd.Parameters.AddWithValue("@dateOfAppointment", data.dateOfAppointment);
                    cmd.Parameters.AddWithValue("@userEmail", data.email);
                    cmd.Parameters.AddWithValue("@serviceCenterId", data.serviceCenterId);
                    cmd.Parameters.AddWithValue("@serviceCenterName", data.serviceCenterName);
                    cmd.Parameters.AddWithValue("@serviceCost", data.serviceCost);

                    _conn.Open();
                    int d = cmd.ExecuteNonQuery();
                    _conn.Close();

                    if (d >= 1)
                    {
                        msg = "Appointment Booked Successfully";
                    }
                    else
                    {
                        msg = "Appointment is already booked";
                    }
                }
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return msg;
        }

        [HttpGet]
        [Route("getAppointment")]
        public ActionResult<List<ProductModel>> GetAppointment(string email)
        {
            List<ProductModel> list = new List<ProductModel>();

            try
            {
                using (var cmd = new SqlCommand("getAppointmentDetails", _conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@userEmail", email);

                    _conn.Open();
                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            ProductModel model = new ProductModel();
                            model.ID = int.Parse(dr["ID"].ToString());
                            model.serviceCenterName = dr["serviceCenterName"].ToString();
                            model.dateOfAppointment = DateTime.Parse(dr["dateOfAppointment"].ToString());
                            model.bookedSlots = dr["bookedSlots"].ToString();
                            list.Add(model);
                        }
                    }
                    _conn.Close();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return list;
        }

        [HttpDelete]
        [Route("cancelappointment/{ID}")]
        public ActionResult<string> DeleteAppointment(int ID)
        {
            string msg = string.Empty;

            try
            {
                using (var cmd = new SqlCommand("cancelAppointment", _conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", ID);

                    _conn.Open();
                    int data = cmd.ExecuteNonQuery();
                    _conn.Close();

                    if (data >= 1)
                    {
                        msg = "Appointment Canceled";
                    }
                    else
                    {
                        msg = "Failed to cancel appointment";
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
        [Route("updateSlotsondeleteappointment")]
        public ActionResult<string> UpdateOnDeleteAppointment(AppointmentModel data)
        {
            string msg = string.Empty;

            try
            {
                using (var cmd = new SqlCommand("updateSlotsOnDeleteAppointment", _conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@serviceCenterId", data.serviceCenterId);
                    cmd.Parameters.AddWithValue("@dateOfAppointment", data.dateOfAppointment);
                    cmd.Parameters.AddWithValue("@bookedSlots", data.bookedSlots);

                    _conn.Open();
                    int d = cmd.ExecuteNonQuery();
                    _conn.Close();

                    if (d >= 1)
                    {
                        msg = "Slots Updated Successfully";
                    }
                    else
                    {
                        msg = "Failed to update slots";
                    }
                }
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return msg;
        }

        [HttpGet]
        [Route("getAppointmentSlots/{ID}")]
        public ActionResult<ProductModel> GetAppointmentSlotsById(int ID)
        {
            ProductModel model = new ProductModel();

            try
            {
                using (var cmd = new SqlCommand("getAppointmentSlotsById", _conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", ID);

                    _conn.Open();
                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            model.ID = int.Parse(dr["ID"].ToString());
                            model.serviceCenterName = dr["serviceCenterName"].ToString();
                            model.dateOfAppointment = DateTime.Parse(dr["dateOfAppointment"].ToString());
                            model.bookedSlots = dr["bookedSlots"].ToString();
                        }
                    }
                    _conn.Close();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return model;
        }

        [HttpGet]
        [Route("getSlotDetails/{serviceCenterId}/{date}")]
        public ActionResult<List<AppointmentModel>> GetSlotDetailsByDate(int serviceCenterId, string date)
        {
            List<AppointmentModel> list = new List<AppointmentModel>();

            try
            {
                using (var cmd = new SqlCommand("getSlotDetailsByDate", _conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@serviceCenterId", serviceCenterId);
                    cmd.Parameters.AddWithValue("@date", date);

                    _conn.Open();
                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            AppointmentModel model = new AppointmentModel();
                            model.ID = int.Parse(dr["ID"].ToString());
                            model.serviceCenterId = int.Parse(dr["serviceCenterId"].ToString());
                            model.dateOfAppointment = DateTime.Parse(dr["dateOfAppointment"].ToString());
                            model.bookedSlots = dr["bookedSlots"].ToString();
                            list.Add(model);
                        }
                    }
                    _conn.Close();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return list;
        }

        [HttpPost]
        [Route("updateSlots")]
        public ActionResult<string> PostAvailableSlots(AppointmentModel data)
        {
            string msg = string.Empty;

            try
            {
                using (var cmd = new SqlCommand("updateSlots", _conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@serviceCenterId", data.serviceCenterId);
                    cmd.Parameters.AddWithValue("@dateOfAppointment", data.dateOfAppointment);
                    cmd.Parameters.AddWithValue("@bookedSlots", data.bookedSlots);

                    _conn.Open();
                    int d = cmd.ExecuteNonQuery();
                    _conn.Close();

                    if (d >= 1)
                    {
                        msg = "Slots Updated Successfully";
                    }
                    else
                    {
                        msg = "Failed to update slots";
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

    public class ProductModel
    {
        public int ID { get; set; }
        public string productName { get; set; }
        public string productModelNo { get; set; }
        public DateTime dateofPurchase { get; set; }
        public string contactNumber { get; set; }
        public string problemDescription { get; set; }
        public string bookedSlots { get; set; }
        public DateTime dateOfAppointment { get; set; }
        public string email { get; set; }
        public int serviceCenterId { get; set; }
        public string serviceCenterName { get; set; }
        public decimal serviceCost { get; set; }
    }

    public class AppointmentModel
    {
        internal List<string> availableSlots;

        public int ID { get; set; }
        public int serviceCenterId { get; set; }
        public DateTime dateOfAppointment { get; set; }
        public string bookedSlots { get; set; }
    }
}