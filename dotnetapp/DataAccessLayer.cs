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


    }
}
