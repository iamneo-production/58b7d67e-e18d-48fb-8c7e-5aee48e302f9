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

    }
}
