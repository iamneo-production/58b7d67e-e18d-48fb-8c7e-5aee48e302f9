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
