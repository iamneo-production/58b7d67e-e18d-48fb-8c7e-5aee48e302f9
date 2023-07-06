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
using dotnetapp.Models;
using System.Data;
using System.Text.Json.Serialization;
using System.Net.Mail;
using System.Net;
namespace dotnetapp
{
    public class DataAccessLayer
    {

        SqlConnection conn = new SqlConnection("User ID=sa;password=examlyMssql@123;Server=localhost;Database=master2;trusted_connection=false;Persist Security Info=False;Encrypt=False");
        SqlCommand cmd = null;
        SqlDataAdapter da = null;
        SqlDataReader dr = null;

        internal string saveAdmin(UserModel user)
        {
            string msg = string.Empty;
            try
            {
                cmd = new SqlCommand("AddAdmin", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@email", user.Email);
                cmd.Parameters.AddWithValue("@password", user.Password);
                cmd.Parameters.AddWithValue("@username", user.UserName);
                cmd.Parameters.AddWithValue("@mobileNumber", user.MobileNumber);
                cmd.Parameters.AddWithValue("@userRole", user.UserRole);
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
        internal Boolean isAdminPresent(LoginModel data)
        {
            Boolean msg = false;
            try
            {
                da = new SqlDataAdapter("CameraServiceAdminLogin", conn);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                da.SelectCommand.Parameters.AddWithValue("@email", data.Email);
                da.SelectCommand.Parameters.AddWithValue("@password", data.Password);
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
        internal string saveUser(UserModel user)
        {
            string msg = string.Empty;
            try
            {
                cmd = new SqlCommand("AddUser", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@email", user.Email);
                cmd.Parameters.AddWithValue("@password", user.Password);
                cmd.Parameters.AddWithValue("@username", user.UserName );
                cmd.Parameters.AddWithValue("@mobileNumber", user.MobileNumber);
                cmd.Parameters.AddWithValue("@userRole", user.UserRole);
                conn.Open();
                int data = cmd.ExecuteNonQuery();
                if (data >= 1)
                {
                    MailMessage email = new MailMessage();
                    email.From = new MailAddress("kraftcamservices@gmail.com");
                    email.To.Add(user.Email);
                    email.Subject = "Thanks for Signing in with our services Kraft-Cam";
                    string emailBody = $"Hello {user.UserName},\n\n"
                    + "Thank you for signing up for our website! We are thrilled to have you as a new member of our community and are excited to provide you with our exceptional services.\n\n"
                    + "At Kraft-Cam, our mission is to deliver top-notch Camera Services that meet your needs and exceed your expectations. We have a team of dedicated professionals who are passionate about ensuring your satisfaction.\n\n"
                    + "As a valued member, you now have access to a wide range of features and benefits. Whether it's Lens Clean, Internal services, Battery services, etc., we have designed our platform to cater to your needs.\n\n"
                    + "We invite you to explore our website and take full advantage of the resources available to you. Should you have any questions, concerns, or feedback, our friendly support team is always here to assist you. We value your input and strive to continuously improve our services based on your valuable insights.\n\n"
                    + "Once again, thank you for choosing Kraft-Cam. We truly appreciate your trust and confidence in us. We look forward to serving you and ensuring that your experience with us is nothing short of exceptional.\n\n"
                    + "Best wishes,\n"
                    + "Team Kraft_Cam";

                    email.Body = emailBody;

                    SmtpClient smtp = new SmtpClient
                    {
                        Host = "smtp.gmail.com",
                        Port = 587,
                        EnableSsl = true,
                        UseDefaultCredentials = false,
                        Credentials = new NetworkCredential("kraftcamservices@gmail.com", "nvutaqbuynvnqeia")
                    };

                    smtp.Send(email);
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
        internal Boolean isUserPresent(LoginModel data)
        {
            Boolean msg = false;
            try
            {
                da = new SqlDataAdapter("CameraServiceUserLogin", conn);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                da.SelectCommand.Parameters.AddWithValue("@email", data.Email);
                da.SelectCommand.Parameters.AddWithValue("@password", data.Password);
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


        /*this method insert the availableSlots while adding the service center*/
        internal string availableSlots(AppointmentModel m)
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

        /*this method helps the admin to add the service center*/
        internal string addServiceCenter([FromBody] JsonElement jsonData)
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

        /*TimeSpanConverter class that inherits from JsonConverter<TimeSpan>. 
        * This class overrides the Read method from the JsonConverter base class to provide custom deserialization logic
        * for converting a JSON string representation into a TimeSpan object. */
        internal class TimeSpanConverter : JsonConverter<TimeSpan>
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
        

    }
}