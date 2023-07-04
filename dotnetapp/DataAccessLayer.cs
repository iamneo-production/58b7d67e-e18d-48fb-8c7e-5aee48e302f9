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


    }
}
