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

        //Auth controllers
        /*by creating an object for the data access layer, we are accessing all the methods */
        public string saveAdmin(UserModel user)
        {
            return dataAccessLayer.saveAdmin(user);
        }

        public Boolean isAdminPresent(LoginModel data)
        {
            return (dataAccessLayer.isAdminPresent(data));
        }

        public string saveUser(UserModel user)
        {
            return dataAccessLayer.saveUser(user);
        }
        
        public Boolean isUserPresent(LoginModel data)
        {
            return dataAccessLayer.isUserPresent(data);
        }

         //Auth controllers
        /*by creating an object for the data access layer, we are accessing all the methods */
        
        public UserModel getAdminByEmailId(string email)
        {
            return (dataAccessLayer.getAdminByEmailId(email));
        }
        public UserModel getUserByEmailId(string email)
        {
            return dataAccessLayer.getUserByEmailId(email);
        }

        
        //AppointmentController
        /*by creating an object for the data access layer, we are accessing all the methods */
        public List<ProductModel> getAllAppointments()
        {
            return dataAccessLayer.getAllAppointments();
        }


        //servicecentercontroller
        /*by creating an object for the data access layer, we are accessing all the methods */
        public string availableSlots(AppointmentModel m)
        {
            return dataAccessLayer.availableSlots(m);
        }
          public ServiceCenterModel viewServiceCenterByID(string serivceCenterId)
        {
            return dataAccessLayer.viewServiceCenterByID(serivceCenterId);
        }
        public string updateGetSlots(string serviceCenterId, AppointmentModel model)
        {
            return dataAccessLayer.updateGetSlots(serviceCenterId, model);
        }
        public string deleteServiceCenter(string serivceCenterId)
        {
            return dataAccessLayer.deleteServiceCenter(serivceCenterId);
        }
        public string deleteAvailableSlots(string serviceCenterId)
        {
            return dataAccessLayer.deleteAvailableSlots(serviceCenterId);
        }
        public string editServiceCenter(string serviceCenterId, [FromBody] JsonElement jsonData)
        {
            return dataAccessLayer.editServiceCenter(serviceCenterId, jsonData);
        }
        public string addServiceCenter([FromBody] JsonElement jsonData)
        {
            return dataAccessLayer.addServiceCenter(jsonData);
        }



           //User Controller
        /*by creating an object for the data access layer, we are accessing all the methods */
        public string addUser(UserModel user)
        {
            return dataAccessLayer.addUser(user);
        }
        public List<UserModel> getAllUsers()
        {
            return dataAccessLayer.getAllUsers();
        }
        public UserModel getUser(int UserId)
        {
            return dataAccessLayer.getUser(UserId);
        }
        public string deleteUsers(List<int> userIds)
        {
            return dataAccessLayer.deleteUsers(userIds);
        }
         public string editUsersById(UserModel user, int UserId)
        {
            return dataAccessLayer.editUsersById(user, UserId);
        }









          //Review Controller
        /*by creating an object for the data access layer, we are accessing all the methods */
        public string AddReview(ReviewModel model)
        {
            return dataAccessLayer.AddReview( model);
        }
        public List<ReviewModel> getAllReviews()
        {
            return dataAccessLayer.getAllReviews();
        }
    }
}