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

        //Appointment controller

        
        /*This method helps the admin to get all the appointments based on user mail id*/
        internal List<ProductModel> getAppointment(string email)
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
                    model.ID = int.Parse(dr["ID"].ToString());//1//2
                    //  model.productName = dr["productName"].ToString();
                    model.serviceCenterName = dr["serviceCenterName"].ToString();//internal ser//h
                    model.dateOfAppointment = DateTime.Parse(dr["dateOfAppointment"].ToString()); //7/8/23//44
                    model.bookedSlots = dr["bookedSlots"].ToString();//12//11
                    model.serviceCost = dr["serviceCost"].ToString();//500
                    model.serviceCenterId = dr["serviceCenterId"].ToString();//shyd
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

        /*this method helps to get the appointmentslots according to the id provided*/
        internal ProductModel getAppointmentSlotsById(int id)
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
                    model.email = dr["email"].ToString();
                    model.productName = dr["productName"].ToString();
                    model.productModelNo = dr["productModelNo"].ToString();
                    model.dateofPurchase = DateTime.Parse(dr["dateofPurchase"].ToString());
                    model.contactNumber = dr["contactNumber"].ToString();
                    model.problemDescription = dr["problemDescription"].ToString();
                    model.bookedSlots = dr["bookedSlots"].ToString();
                    model.dateOfAppointment = DateTime.Parse(dr["dateOfAppointment"].ToString());
                    model.serviceCenterId = dr["serviceCenterId"].ToString();
                    model.serviceCenterName = dr["serviceCenterName"].ToString();
                    model.dateOfAppointmentBooking = DateTime.Parse(dr["dateOfAppointmentBooking"].ToString());
                    model.serviceCost = (dr["serviceCost"].ToString());
                }
            }
            catch (Exception e)
            {

            }
            conn.Close();
            return model;
        }

        
        /*This method helps to edit the details of the appointment and save it again in the database*/
        internal string EditAppointment(int ID, [FromBody] ProductModel model)
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
                    // Select the email address based on the ID
                    string emailAddress = GetEmailAddressByID(ID);

                    if (!string.IsNullOrEmpty(emailAddress))
                    {
                        MailMessage email = new MailMessage();
                        email.From = new MailAddress("kraftcamservices@gmail.com");
                        email.To.Add(emailAddress);
                        email.Subject = "Appointment Updated Successfully - Kraft-Cam Services";

                        // Email body
                        string emailBody = $"Hello,\n\n"
                            + "Thank you for booking an appointment with Kraft-Cam! We are thrilled to have you as our customer and are committed to providing you with the best camera services.\n\n"
                            + $"Camera Name:{model.productName}\n"
                            + $"Customer Contact: {model.contactNumber}\n"
                            + $"Updated Appointment Date: {model.dateOfAppointment.ToString("dd-MM-yyyy")}\n"
                            + $"Updated Slot: {model.bookedSlots}\n\n"
                            + "At Kraft-Cam, our mission is to deliver top-notch camera services that meet your needs and exceed your expectations. We have a team of dedicated professionals who are passionate about ensuring your satisfaction.\n\n"
                            + "We are pleased to inform you that your appointment has been updated successfully.\n\n"
                            + "We kindly remind you to visit our service center 10 minutes before your booked slot. Our experts will be ready to assist you with your camera needs.\n\n"
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
                        msg = "Appointment updated";
                    }
                    else
                    {
                        msg = "Email address not found";
                    }
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

        /* this method helps to get the necessary data for updating an slots after deletion and editing appointment.*/
        internal string updateOnDeleteAppointment(AppointmentModel model)
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

        /*This method helps the admin to delete an appointment and a well as in the database  */
        internal string deleteAppointment(int ID)
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
                    msg = "Failed to cancel appointment";
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
