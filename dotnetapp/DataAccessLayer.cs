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

        
        // ServiceCenterController

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

    }
}
