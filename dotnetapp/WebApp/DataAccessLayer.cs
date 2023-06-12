using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Web.Http;
using WebApp.Models;
using System.Data;
using System.Text.Json.Serialization;

namespace WebApp
{
    public class DataAccessLayer
    {

        SqlConnection conn = new SqlConnection("User ID=sa;password=examlyMssql@123;server=localhost;Database=master;trusted_connection=false;Persist Security Info=False;Encrypt=False");
        SqlCommand cmd = null;
        SqlDataAdapter da = null;
        SqlDataReader dr = null;

        public string saveAdmin(UserModel user)
        {
            string msg = string.Empty;
            try
            {
                cmd = new SqlCommand("AddAdmin", conn);
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
            catch (Exception e)
            {
                msg = e.Message;
            }
            return msg;
        }
        public Boolean isAdminPresent(LoginModel data)
        {
            Boolean msg = false;
            try
            {
                da = new SqlDataAdapter("CameraServiceAdminLogin", conn);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                da.SelectCommand.Parameters.AddWithValue("@email", data.email);
                da.SelectCommand.Parameters.AddWithValue("@password", data.password);
                DataTable dt = new DataTable();
                da.Fill(dt);
                if (dt.Rows.Count >= 1)
                {
                    msg = true;
                }
                else
                {
                    msg = false;
                }
            }
            catch (Exception e)
            {

            }
            return msg;
        }
        public UserModel getAdminByEmailId(string email)
        {
            UserModel m = new UserModel();

            try
            {
                SqlDataReader dr;
                cmd = new SqlCommand("getAdminByEmail", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@email", email);
                conn.Open();
                dr = cmd.ExecuteReader();
                while (dr.Read() == true)
                {
                    m.username = dr["username"].ToString();
                    m.userRole = dr["userRole"].ToString();
                }
            }
            catch (Exception e)
            {

            }
            conn.Close();
            return m;
        }
        public string saveUser(UserModel user)
        {
            string msg = string.Empty;
            try
            {
                cmd = new SqlCommand("AddUser", conn);
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
            catch (Exception e)
            {
                msg = e.Message;
            }
            return msg;
        }
        public Boolean isUserPresent(LoginModel data)
        {
            Boolean msg = false;
            try
            {
                da = new SqlDataAdapter("CameraServiceUserLogin", conn);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                da.SelectCommand.Parameters.AddWithValue("@email", data.email);
                da.SelectCommand.Parameters.AddWithValue("@password", data.password);
                DataTable dt = new DataTable();
                da.Fill(dt);
                if (dt.Rows.Count >= 1)
                {
                    msg = true;
                }
                else
                {
                    msg = false;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            return msg;
        }

        public UserModel getUserByEmailId(string email)
        {
            UserModel m = new UserModel();

            try
            {
                SqlDataReader dr;
                cmd = new SqlCommand("getUserByEmail", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@email", email);

                conn.Open();
                dr = cmd.ExecuteReader();
                while (dr.Read() == true)
                {
                    m.username = dr["username"].ToString();
                    m.userRole = dr["userRole"].ToString();
                }
            }
            catch (Exception e)
            {

            }
            conn.Close();
            return m;
        }

        //UserController 

        public string addUser(UserModel user)
        {
            string msg = string.Empty;
            try
            {
                cmd = new SqlCommand("AddUser", conn);
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
            catch (Exception e)
            {
                msg = e.Message;
            }
            return msg;
        }
        List<UserModel> list = new List<UserModel>();
        public List<UserModel> getAllUsers()
        {
            SqlDataReader dr;
            cmd = new SqlCommand("getAllUsers", conn);
            cmd.CommandType = CommandType.StoredProcedure;

            conn.Open();
            dr = cmd.ExecuteReader();
            while (dr.Read() == true)
            {
                UserModel user = new UserModel();
                user.UserId = int.Parse(dr["UserId"].ToString());
                user.email = dr["email"].ToString();
                user.username = dr["username"].ToString();
                user.password = dr["password"].ToString();
                user.mobileNumber = dr["mobileNumber"].ToString();
                user.userRole = dr["userRole"].ToString();

                list.Add(user);
            }
            conn.Close();

            return list;
        }
        public UserModel getUser(int UserId)
        {
            UserModel user = new UserModel();
            try
            {
                SqlDataReader dr;
                cmd = new SqlCommand("getUsersById", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@UserId", UserId);
                conn.Open();
                dr = cmd.ExecuteReader();
                while (dr.Read() == true)
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

            }
            return user;
        }
        public string editUsersById(UserModel user, int UserId)
        {
            string msg = string.Empty;

            try
            {
                cmd = new SqlCommand("editUser", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@UserId", UserId);
                cmd.Parameters.AddWithValue("@userRole", user.userRole);
                cmd.Parameters.AddWithValue("@email", user.email);
                cmd.Parameters.AddWithValue("@password", user.password);
                cmd.Parameters.AddWithValue("@username", user.username);
                cmd.Parameters.AddWithValue("@mobileNumber", user.mobileNumber);

                conn.Open();
                int data = cmd.ExecuteNonQuery();
                conn.Close();

                if (data >= 1)
                {
                    msg = "User Details Updated";
                }
                else
                {
                    msg = "Failed";
                }

            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return msg;
        }
        public string deleteUsers(List<int> userIds)
        {
            string msg = string.Empty;
            try
            {
                foreach (int userId in userIds)
                {
                    using (SqlCommand cmd = new SqlCommand("deleteById", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@userId", userId);
                        conn.Open();
                        int data = cmd.ExecuteNonQuery();
                        conn.Close();
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

        //Appointment controller

        public List<AppointmentModel> getSlotDetailsByDate(string serviceCenterId, DateTime Date)
        {
            List<AppointmentModel> list1 = new List<AppointmentModel>();

            try
            {
                SqlDataReader dr;
                cmd = new SqlCommand("showAvailableSlots", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@serviceCenterId", serviceCenterId);
                cmd.Parameters.AddWithValue("@Appointmentdate", Date);
                conn.Open();
                dr = cmd.ExecuteReader();
                while (dr.Read() == true)
                {
                    AppointmentModel m1 = new AppointmentModel();
                    List<string> availableSlots1 = dr["availableSlots"].ToString().Split(',').ToList();
                    m1.availableSlots = availableSlots1;
                    list1.Add(m1);

                }
            }
            catch (Exception e)
            {

            }
            return list1;

        }
        public string saveAppointment(ProductModel data)
        {
            string msg = string.Empty;

            try
            {
                cmd = new SqlCommand("addAppointment", conn);
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

                conn.Open();
                int d = cmd.ExecuteNonQuery();
                conn.Close();

                if (d >= 1)
                {
                    msg = "Appointment Booked Successfully";
                }
                else
                {
                    msg = "Appointment is already booked";
                }
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return msg;
        }
        public string postAvailableSlots(AppointmentModel model)
        {
            string msg = string.Empty;
            try
            {

                cmd = new SqlCommand("setAvailableSlots", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@serviceCenterId", model.serviceCenterId);

                cmd.Parameters.AddWithValue("@Appointmentdate", model.Appointmentdate);

                List<string> availableSlots = model.availableSlots;
                string slotsString = string.Join(",", availableSlots);
                cmd.Parameters.AddWithValue("@availableSlots", slotsString);

                conn.Open();
                int d = cmd.ExecuteNonQuery();
                conn.Close();

                if (d >= 1)
                {
                    msg = "Slots Updated";
                }
                else
                {
                    msg = "Failed to update";
                }
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return msg;
        }
        public List<ProductModel> getAppointment(string email)
        {
            List<ProductModel> list = new List<ProductModel>();

            try
            {
                SqlDataReader dr;
                cmd = new SqlCommand("getAppointmentDetails", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@userEmail", email);
                conn.Open();
                dr = cmd.ExecuteReader();
                while (dr.Read() == true)
                {
                    ProductModel model = new ProductModel();
                    model.ID = int.Parse(dr["ID"].ToString());
                    model.serviceCenterName = dr["serviceCenterName"].ToString();
                    model.dateOfAppointment = DateTime.Parse(dr["dateOfAppointment"].ToString());
                    model.bookedSlots = dr["bookedSlots"].ToString();
                    model.serviceCost = dr["serviceCost"].ToString();
                    model.serviceCenterId = dr["serviceCenterId"].ToString();
                    list.Add(model);
                }

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            conn.Close();
            return list;
        }
        public ProductModel getAppointmentSlotsById(int id)
        {
            SqlDataReader dr;
            ProductModel model = new ProductModel();
            try
            {
                cmd = new SqlCommand("getAppointmentDetailsByID", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ID", id);
                conn.Open();
                dr = cmd.ExecuteReader();
                while (dr.Read() == true)
                {
                    model.productName = dr["productName"].ToString();
                    model.productModelNo = dr["productModelNo"].ToString();
                    model.dateofPurchase = DateTime.Parse(dr["dateofPurchase"].ToString());
                    model.contactNumber = dr["contactNumber"].ToString();
                    model.problemDescription = dr["problemDescription"].ToString();
                    model.bookedSlots = dr["bookedSlots"].ToString();
                    model.dateOfAppointment = DateTime.Parse(dr["dateOfAppointment"].ToString());
                    model.serviceCenterId = dr["serviceCenterId"].ToString();
                    model.serviceCenterName = dr["serviceCenterName"].ToString();
                    model.serviceCost = (dr["serviceCost"].ToString());
                }
            }
            catch (Exception e)
            {

            }
            conn.Close();
            return model;
        }
        public string EditAppointment(int ID, [FromBody] ProductModel model)
        {
            string msg = string.Empty;

            try
            {
                cmd = new SqlCommand("updateAppointment", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ID", ID);
                cmd.Parameters.AddWithValue("@productName", model.productName);
                cmd.Parameters.AddWithValue("@productModelNo", model.productModelNo);
                cmd.Parameters.AddWithValue("@dateOfPurchase", model.dateofPurchase);
                cmd.Parameters.AddWithValue("@contactNumber", model.contactNumber);
                cmd.Parameters.AddWithValue("@problemDescription", model.problemDescription);
                cmd.Parameters.AddWithValue("@dateOfAppointment", model.dateOfAppointment);
                cmd.Parameters.AddWithValue("@bookedSlots", model.bookedSlots);

                conn.Open();
                int data = cmd.ExecuteNonQuery();
                conn.Close();

                if (data >= 1)
                {
                    msg = "Appointement updated";
                }
                else
                {
                    msg = "Failed";
                }


            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return msg;
        }
        public string updateOnDeleteAppointment(AppointmentModel model)
        {
            string msg = string.Empty;
            try
            {
                cmd = new SqlCommand("onDeleteAppointment", conn);

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@serviceCenterId", model.serviceCenterId);

                cmd.Parameters.AddWithValue("@Appointmentdate", model.Appointmentdate);

                cmd.Parameters.AddWithValue("@availableSlot", model.availableSlots[0]);


                conn.Open();
                int d = cmd.ExecuteNonQuery();
                conn.Close();

                if (d >= 1)
                {
                    msg = "Slots Updated";
                }
                else
                {
                    msg = "Failed to update";
                }
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return msg;
        }
        public string deleteAppointment(int ID)
        {
            string msg = string.Empty;
            try
            {
                cmd = new SqlCommand("cancelAppointment", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ID", ID);
                conn.Open();
                int data = cmd.ExecuteNonQuery();
                conn.Close();
                if (data >= 1)
                {
                    msg = "Appointment Canceled";
                }
                else
                {
                    msg = "FAiled to cancel appointment";
                }
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return msg;
        }
        public List<ProductModel> getAllAppointments()
        {
            List<ProductModel> m = new List<ProductModel>();
            SqlDataReader dr;

            cmd = new SqlCommand("getAllAppointments", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            conn.Open();
            dr = cmd.ExecuteReader();
            while (dr.Read() == true)
            {
                ProductModel model = new ProductModel();
                model.email = dr["email"].ToString();
                model.productName = dr["productName"].ToString();
                model.dateOfAppointment = DateTime.Parse(dr["dateOfAppointment"].ToString());
                model.contactNumber = dr["contactNumber"].ToString();
                model.bookedSlots = dr["bookedSlots"].ToString();
                model.serviceCenterId = dr["serviceCenterId"].ToString();
                model.serviceCenterName = dr["serviceCenterName"].ToString();
                model.dateOfAppointmentBooking = DateTime.Parse(dr["dateOfAppointmentBooking"].ToString());
                model.serviceCost = (dr["serviceCost"].ToString());
                m.Add(model);

            }
            conn.Close();
            return m;
        }
        // ServiceCenterController
        public string availableSlots(AppointmentModel m)
        {
            string msg = string.Empty;
            try
            {
                cmd = new SqlCommand("InsertAvailableSlots", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@serviceCenterId", m.serviceCenterId);

                List<string> availableSlots = m.availableSlots;
                string slotsString = string.Join(",", availableSlots);
                cmd.Parameters.AddWithValue("@availableSlots", slotsString);

                conn.Open();
                int data = cmd.ExecuteNonQuery();
                conn.Close();

                msg = "Success";
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return msg;
        }
        List<ServiceCenterModel> getAllServiceCenterDetails = new List<ServiceCenterModel>();
        public List<ServiceCenterModel> viewServiceCenter()
        {
            SqlDataReader dr;

            cmd = new SqlCommand("getAllServiceCenterDetails", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            conn.Open();
            dr = cmd.ExecuteReader();
            while (dr.Read() == true)
            {
                ServiceCenterModel model = new ServiceCenterModel();
                model.serviceCenterId = dr["serviceCenterId"].ToString();
                model.serviceCenterName = dr["serviceCenterName"].ToString();
                model.serviceCenterPhone = dr["serviceCenterPhone"].ToString();
                model.serviceCenterAddress = dr["serviceCenterAddress"].ToString();
                model.serviceCenterImageUrl = dr["serviceCenterImageUrl"].ToString();
                model.serviceCenterMailId = dr["serviceCenterMailId"].ToString();
                model.serviceCost = (dr["serviceCost"].ToString());
                model.serviceCenterStartTime = TimeSpan.Parse(dr["serviceCenterStartTime"].ToString());
                model.serviceCenterEndTime = TimeSpan.Parse(dr["serviceCenterEndTime"].ToString());
                model.serviceCenterDescription = dr["serviceCenterDescription"].ToString();
                getAllServiceCenterDetails.Add(model);
            }
            conn.Close();
            return getAllServiceCenterDetails;
        }
        public ServiceCenterModel viewServiceCenterByID(string serivceCenterId)
        {
            SqlDataReader dr;
            ServiceCenterModel model = new ServiceCenterModel();
            cmd = new SqlCommand("getServiceCenterById", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@serviceCenterId", serivceCenterId);
            conn.Open();
            dr = cmd.ExecuteReader();
            while (dr.Read() == true)
            {

                model.serviceCenterId = dr["serviceCenterId"].ToString();
                model.serviceCenterName = dr["serviceCenterName"].ToString();
                model.serviceCenterPhone = dr["serviceCenterPhone"].ToString();
                model.serviceCenterAddress = dr["serviceCenterAddress"].ToString();
                model.serviceCenterImageUrl = dr["serviceCenterImageUrl"].ToString();
                model.serviceCenterMailId = dr["serviceCenterMailId"].ToString();
                model.serviceCost = (dr["serviceCost"].ToString());
                model.serviceCenterStartTime = TimeSpan.Parse(dr["serviceCenterStartTime"].ToString());
                model.serviceCenterEndTime = TimeSpan.Parse(dr["serviceCenterEndTime"].ToString());
                model.serviceCenterDescription = dr["serviceCenterDescription"].ToString();

            }
            conn.Close();
            return model;
        }
        public string updateGetSlots(string serviceCenterId, AppointmentModel model)
        {
            string msg = string.Empty;

            try
            {
                cmd = new SqlCommand("editAvailableSlots", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@serviceCenterId", serviceCenterId);
                List<string> availableSlots = model.availableSlots;
                string slotsString = string.Join(",", availableSlots);
                cmd.Parameters.AddWithValue("@availableSlots", slotsString);
                conn.Open();
                int data = cmd.ExecuteNonQuery();
                conn.Close();

                if (data >= 1)
                {
                    msg = "Service center updated";
                }
                else
                {
                    msg = "Failed";
                }


            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return msg;
        }
        public string deleteServiceCenter(string serivceCenterId)
        {
            string msg = string.Empty;
            try
            {
                cmd = new SqlCommand("deleteServiceCenterId", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@serviceCenterId", serivceCenterId);
                conn.Open();
                int data = cmd.ExecuteNonQuery();
                conn.Close();
                if (data >= 1)
                {
                    msg = "Service center deleted";
                }
                else
                {
                    msg = "Can't Delete Service Center Appointments booked for that service center";
                }
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return msg;
        }
        public string deleteAvailableSlots(string serviceCenterId)
        {
            string msg = string.Empty;
            try
            {
                cmd = new SqlCommand("deleteAvailableSlots", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@serviceCenterId", serviceCenterId);
                conn.Open();
                int data = cmd.ExecuteNonQuery();
                conn.Close();
                if (data >= 1)
                {
                    msg = "Service center deleted";
                }
                else
                {
                    msg = "Failed to Delete";
                }
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return msg;
        }
        public string addServiceCenter([FromBody] JsonElement jsonData)
        {
            string msg = string.Empty;
            try
            {
                var options = new JsonSerializerOptions
                {
                    Converters = { new TimeSpanConverter() }
                };

                var model = JsonSerializer.Deserialize<ServiceCenterModel>(jsonData.GetRawText(), options);

                cmd = new SqlCommand("AdminAddServiceCenter", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@serviceCenterId", model.serviceCenterId);
                cmd.Parameters.AddWithValue("@serviceCenterName", model.serviceCenterName);
                cmd.Parameters.AddWithValue("@serviceCenterPhone", model.serviceCenterPhone);
                cmd.Parameters.AddWithValue("@serviceCenterAddress", model.serviceCenterAddress);
                cmd.Parameters.AddWithValue("@serviceCenterImageUrl", model.serviceCenterImageUrl);
                cmd.Parameters.AddWithValue("@serviceCenterMailId", model.serviceCenterMailId);
                cmd.Parameters.AddWithValue("@serviceCost", model.serviceCost);
                cmd.Parameters.AddWithValue("@serviceCenterStartTime", model.serviceCenterStartTime);
                cmd.Parameters.AddWithValue("@serviceCenterEndTime", model.serviceCenterEndTime);
                cmd.Parameters.AddWithValue("@serviceCenterDescription", model.serviceCenterDescription);

                conn.Open();
                int data = cmd.ExecuteNonQuery();
                if (data >= 1)
                {
                    msg = "Service Center added";
                }
                else
                {
                    msg = "Failed to Add Service Center";
                }
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return msg;
        }
        public string editServiceCenter(string serviceCenterId, [FromBody] JsonElement jsonData)
        {
            string msg = string.Empty;

            try
            {

                var options = new JsonSerializerOptions
                {
                    Converters = { new TimeSpanConverter() }
                };

                var model = JsonSerializer.Deserialize<ServiceCenterModel>(jsonData.GetRawText(), options);

                cmd = new SqlCommand("updateAddCenters", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@serviceCenterId", serviceCenterId);
                cmd.Parameters.AddWithValue("@serviceCenterName", model.serviceCenterName);
                cmd.Parameters.AddWithValue("@serviceCenterPhone", model.serviceCenterPhone);
                cmd.Parameters.AddWithValue("@serviceCenterAddress", model.serviceCenterAddress);
                cmd.Parameters.AddWithValue("@serviceCenterImageUrl", model.serviceCenterImageUrl);
                cmd.Parameters.AddWithValue("@serviceCenterMailId", model.serviceCenterMailId);
                cmd.Parameters.AddWithValue("@serviceCost", model.serviceCost);
                cmd.Parameters.AddWithValue("@serviceCenterStartTime", model.serviceCenterStartTime);
                cmd.Parameters.AddWithValue("@serviceCenterEndTime", model.serviceCenterEndTime);
                cmd.Parameters.AddWithValue("@serviceCenterDescription", model.serviceCenterDescription);
                conn.Open();
                int data = cmd.ExecuteNonQuery();
                conn.Close();

                if (data >= 1)
                {
                    msg = "Service center updated";
                }
                else
                {
                    msg = "Failed";
                }


            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return msg;

        }
        public class TimeSpanConverter : JsonConverter<TimeSpan>
        {
            public override TimeSpan Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
            {
                string value = reader.GetString();
                return TimeSpan.Parse(value);
            }

            public override void Write(Utf8JsonWriter writer, TimeSpan value, JsonSerializerOptions options)
            {
                writer.WriteStringValue(value.ToString());
            }
        }
        //Review Controller
         public  string AddReview(ReviewModel model)
        {
            string msg = string.Empty;
           
            try
            {
              

                cmd = new SqlCommand("addingReviews", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@userEmail", model.userEmail);
                cmd.Parameters.AddWithValue("@serviceCenterId", model.serviceCenterId);
                cmd.Parameters.AddWithValue("@Rating", model.Rating);
                cmd.Parameters.AddWithValue("@review", model.review);
                conn.Open();
                int d = cmd.ExecuteNonQuery();
                conn.Close();

                if (d >= 1)
                {
                    msg = "Thanks for the Feedback";
                }
                else
                {
                    msg = "Failed to give review";
                }
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return msg;
        }
        public  ReviewModel getReviews(string id)
        {
            SqlDataReader dr;
            ReviewModel model = new ReviewModel();
            try
            {
                cmd = new SqlCommand("GetAverageRating", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@serviceCenterId", id);
                conn.Open();
                dr = cmd.ExecuteReader();
                while (dr.Read() == true)
                {
                    model.Rating = int.Parse(dr["AverageRating"].ToString());

                }
            }
            catch (Exception e)
            {

            }
            conn.Close();
            return model;
        }


    }
}
