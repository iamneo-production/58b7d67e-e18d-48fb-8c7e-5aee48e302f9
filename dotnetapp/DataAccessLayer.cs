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
        /*The DataAccessLayer class represents a data access layer in the application. 
     * It is responsible for handling database operations and interacting with the underlying database. */

        /*creates a new instance of the SqlConnection class, which establishes a connection to the database.
         the connection string indicates the server name (DESKTOP-IB4OOTB\\SQLEXPRESS), the database name (CameraServices), 
        and that Windows integrated security should be used for authentication*/
        SqlConnection conn = new SqlConnection("User ID=sa;password=examlyMsSql@123;Server=localhost;Database=master;trusted_connection=false;Persist Security Info=False;Encryt=False");

        /*SqlCommand declares a SqlCommand object that will be used to execute SQL commands 
        * against the database.*/
        SqlCommand cmd = null;

        /* SqlDataAdapter object that provides the ability 
      * to fill a DataSet or DataTable with data from the database. */
        SqlDataAdapter da = null;

        /* SqlDataReader object that allows forward-only, 
        * read-only access to the result of executing a SQL query against the database. */
        SqlDataReader dr = null;

        //AppointmentController

        /*this method helps the get the slots according to the given date*/
        internal List<AppointmentModel> getSlotDetailsByDate(string serviceCenterId, DateTime Date)
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

        /* This method helps the user to save the new appointment in the database. */
        internal string saveAppointment(ProductModel data)
        {
            string msg = string.Empty;

            try
            {
                cmd = new SqlCommand("addAppointment", conn);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@customerName", data.customerName);

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
                    MailMessage email = new MailMessage();
                    email.From = new MailAddress("kraftcamservices@gmail.com");
                    email.To.Add(data.email);
                    email.Subject = "Appointment Booked Successfully - Kraft-Cam Services";
                    string emailBody = $"Hello, {data.customerName}\n\n"
                        + "Thank you for booking an appointment with Kraft-Cam! We are thrilled to have you as our customer and are committed to providing you with the best camera services.\n\n"
                        + $"Service Name: {data.serviceCenterName}\n"
                        + $"Camera Name: {data.productName}\n"
                        + $"Customer Contact: {data.contactNumber}\n"
                         + $"Appointment Date: {data.dateOfAppointment.ToString("dd-MM-yyyy")}\n"
                        + $"Booked Slot: {data.bookedSlots}\n\n"
                        + "At Kraft-Cam, our mission is to deliver top-notch camera services that meet your needs and exceed your expectations. We have a team of dedicated professionals who are passionate about ensuring your satisfaction.\n\n"
                        + "We invite you to visit our service center 10 minutes before your booked slot. Our experts will be ready to assist you with your camera needs.\n\n"
                        + "Once again, thank you for choosing Kraft-Cam. We truly appreciate your trust and confidence in us. We look forward to providing you with exceptional service and a great experience.\n\n"
                        + "Best regards,\n"
                        + "Team Kraft-Cam";


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

        /*this method helps to add available slots at the time of appointment booking*/
        internal string postAvailableSlots(AppointmentModel model)
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

        internal List<ProductModel> getAllAppointments()
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
                model.ID =int.Parse( dr["ID"].ToString());
                model.customerName = dr["customerName"].ToString();
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

        List<ServiceCenterModel> getAllServiceCenterDetails = new List<ServiceCenterModel>();

        /*this method gets the list of the service centers*/
        internal List<ServiceCenterModel> viewServiceCenter()
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

        //Review Controller
        
        /*this method helps to get the reviews by their id's*/
        internal ReviewModel getReviews(string id)
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
