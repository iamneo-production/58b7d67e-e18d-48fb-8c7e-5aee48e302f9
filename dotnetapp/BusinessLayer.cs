using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using System.Web.Http;
using dotnetapp.Models;

namespace dotnetapp
{
    public class BusinessLayer
    {

        DataAccessLayer dataAccessLayer = new DataAccessLayer();


        /*The BusinessLayer class represents the business layer in our application. 
        * It acts as an intermediary between the presentation layer (such as a user interface) and the data access layer. 
        * Its purpose is to encapsulate business logic and coordinate the interaction between the presentation layer and the data access layer. */

        //Appointment Controller
        /*by creating an object for the data access layer, we are accessing all the methods */
        public List<ProductModel> getAppointment(string email)
        {
            return dataAccessLayer.getAppointment(email);
        }
        public ProductModel getAppointmentSlotsById(int id)
        {
            return dataAccessLayer.getAppointmentSlotsById(id);
        }
        public string EditAppointment(int ID, [FromBody] ProductModel model)
        {
            return dataAccessLayer.EditAppointment(ID, model);
        }
        public string updateOnDeleteAppointment(AppointmentModel model)
        {
            return dataAccessLayer.updateOnDeleteAppointment(model);
        }
        public string deleteAppointment(int ID)
        {
            return dataAccessLayer.deleteAppointment(ID);
        }
    }
 }
