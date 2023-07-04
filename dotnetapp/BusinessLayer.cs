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

        //AppointmentController
        /*by creating an object for the data access layer, we are accessing all the methods */
        public List<AppointmentModel> getSlotDetailsByDate(string serviceCenterId, DateTime Date)
        {
            return dataAccessLayer.getSlotDetailsByDate(serviceCenterId, Date);
        }
        public string saveAppointment(ProductModel data)
        {
            return dataAccessLayer.saveAppointment(data);
        }
        public string postAvailableSlots(AppointmentModel model)
        {
            return dataAccessLayer.postAvailableSlots(model);
        }

        //Review Controller
        /*by creating an object for the data access layer, we are accessing all the methods */
        
        public ReviewModel getReviews(string id)
        {
            return dataAccessLayer.getReviews(id);
        }
        
    }
 }
