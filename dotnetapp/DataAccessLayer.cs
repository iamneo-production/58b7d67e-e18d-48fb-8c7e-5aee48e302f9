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
        SqlConnection conn = new SqlConnection("User ID=sa;password=examlyMsSql@123;Server=localhost;Database=master2;trusted_connection=false");

        /*SqlCommand declares a SqlCommand object that will be used to execute SQL commands 
        * against the database.*/
        SqlCommand cmd = null;

        /* SqlDataAdapter object that provides the ability 
      * to fill a DataSet or DataTable with data from the database. */
        SqlDataAdapter da = null;

        /* SqlDataReader object that allows forward-only, 
        * read-only access to the result of executing a SQL query against the database. */
        SqlDataReader dr = null;

        //AuthController
        
        /*This method helps to save the admin data in the database.  */
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


        /*This method helps to check whether the admin present or not and check the email and password ae correct and return the boolean value.  */
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

        /*this method helps to  retrieve admin's data based on the provided email.*/
        internal UserModel getAdminByEmailId(string email)
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
                    m.UserName = dr["UserName"].ToString();
                    m.UserRole = dr["UserRole"].ToString();
                    m.UserId =int.Parse(dr["UserId"].ToString());
                }
            }
            catch (Exception e)
            {

            }
            conn.Close();
            return m;
        }
    
        /*This method helps to save the user data in the database.  */
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

        /* This method helps to check whether the user present or not and check the email and password are correct and return the boolean value */
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

        
        /*this method helps to  retrieve user's data based on the provided email.*/
        internal UserModel getUserByEmailId(string email)
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
                    m.UserName = dr["UserName"].ToString();
                    m.UserRole = dr["UserRole"].ToString();
                    m.UserId = int.Parse(dr["UserId"].ToString());
                }
            }
            catch (Exception e)
            {

            }
            conn.Close();
            return m;
        }

        //UserController

        /* this method  adds the user in the database*/
        internal string addUser(UserModel user)
        {
            string msg = string.Empty;
            try
            {
                cmd = new SqlCommand("AddUser", conn);
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

        internal List<UserModel> list = new List<UserModel>();

        /*this method helps to get list of users*/
        internal List<UserModel> getAllUsers()
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
                user.Email = dr["Email"].ToString();
                user.UserName = dr["UserName"].ToString();
                user.Password = dr["Password"].ToString();
                user.MobileNumber = dr["MobileNumber"].ToString();
                user.UserRole = dr["UserRole"].ToString();

                list.Add(user);
            }
            conn.Close();

            return list;
        }

        /*this method get the user details by their id*/
        internal UserModel getUser(int UserId)
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
                    user.Email = dr["Email"].ToString();
                    user.UserName = dr["UserName"].ToString();
                    user.Password = dr["Password"].ToString();
                    user.MobileNumber = dr["MobileNumber"].ToString();
                    user.UserRole = dr["UserRole"].ToString();
                }
            }
            catch (Exception e)
            {

            }
            return user;
        }

        /*this method helps to edit the user's details by their id*/
        internal string editUsersById(UserModel user, int UserId)
        {
            string msg = string.Empty;

            try
            {
                cmd = new SqlCommand("editUser", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@UserId", UserId);
                cmd.Parameters.AddWithValue("@userRole", user.UserRole);
                cmd.Parameters.AddWithValue("@email", user.Email);
                cmd.Parameters.AddWithValue("@password", user.Password);
                cmd.Parameters.AddWithValue("@username", user.UserName);
                cmd.Parameters.AddWithValue("@mobileNumber", user.MobileNumber);

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

        /*this method delete the user's details list in the database*/
        internal string deleteUsers(List<int> userIds)
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

        /*this  method get the user maill id details as per the id*/
        private string GetEmailAddressByID(int userID)
        {
            string emailAddress = string.Empty;
            cmd = new SqlCommand("getAppointmentDetailsByID", conn);
            cmd.Parameters.AddWithValue("@ID", userID);
            cmd.CommandType = CommandType.StoredProcedure;
            conn.Open();
            dr = cmd.ExecuteReader();
            try
            {
                while (dr.Read() == true)
                {
                    UserModel model = new UserModel();
                    emailAddress = dr["Email"].ToString();
                }
                conn.Close();
            }
            catch (Exception e)
            {

                Console.WriteLine(e.Message);
            }
            return emailAddress;
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

        /*this method helps to get the service center details by their id*/
        internal ServiceCenterModel viewServiceCenterByID(string serivceCenterId)
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

        /*this method update the slots while updating the service center*/
        internal string updateGetSlots(string serviceCenterId, AppointmentModel model)
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

        /*this method deletes the service center by the id*/
        internal string deleteServiceCenter(string serivceCenterId)
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

        /*this method deletes the available slots while deleting the service center*/
        internal string deleteAvailableSlots(string serviceCenterId)
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

        /*this method edit the service center details according to the id*/
        internal string editServiceCenter(string serviceCenterId, [FromBody] JsonElement jsonData)
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

        //Review Controller

        /*this method adds the review about the service*/
        internal string AddReview(ReviewModel model)
        {
            string msg = string.Empty;
           
            try
            {
              

                cmd = new SqlCommand("addingReviews", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@userEmail", model.userEmail);
                cmd.Parameters.AddWithValue("@userName", model.userName);
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

        /*this method displays the list of reviews*/
        internal List<ReviewModel> getAllReviews()
        {
            List<ReviewModel> list = new List<ReviewModel>();
            SqlDataReader dr;
            cmd = new SqlCommand("GetAllReviews", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            conn.Open();
            dr = cmd.ExecuteReader();
            while (dr.Read() == true)
            {
                ReviewModel model = new ReviewModel();
                model.userName = dr["userName"].ToString();
                model.userEmail = dr["userEmail"].ToString();
                model.review = dr["review"].ToString();
                model.Rating = int.Parse(dr["Rating"].ToString());
                list.Add(model);
            }
            conn.Close();
            return list;
        }


    }
}
