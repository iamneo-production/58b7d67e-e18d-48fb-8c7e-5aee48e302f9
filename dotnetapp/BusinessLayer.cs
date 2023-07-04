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
        public UserModel getAdminByEmailId(string email)
        {
            return (dataAccessLayer.getAdminByEmailId(email));
        }
        public string saveUser(UserModel user)
        {
            return dataAccessLayer.saveUser(user);
        }
        public Boolean isUserPresent(LoginModel data)
        {
            return dataAccessLayer.isUserPresent(data);
        }
        public UserModel getAdminByEmailId(string email)
        {
            return (dataAccessLayer.getAdminByEmailId(email));
        }
        public UserModel getUserByEmailId(string email)
        {
            return dataAccessLayer.getUserByEmailId(email);
        }

        //User Controller
        /*by creating an object for the data access layer, we are accessing all the methods */
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
        public string editUsersById(UserModel user, int UserId)
        {
            return dataAccessLayer.editUsersById(user, UserId);
        }
        public string deleteUsers(List<int> userIds)
        {
            return dataAccessLayer.deleteUsers(userIds);
        }

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
        public List<ServiceCenterModel> viewServiceCenter()
        {
            return dataAccessLayer.viewServiceCenter();
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
        public string addServiceCenter([FromBody] JsonElement jsonData)
        {
            return dataAccessLayer.addServiceCenter(jsonData);
        }
        public string editServiceCenter(string serviceCenterId, [FromBody] JsonElement jsonData)
        {
            return dataAccessLayer.editServiceCenter(serviceCenterId, jsonData);
        }

        //Review Controller
        /*by creating an object for the data access layer, we are accessing all the methods */
        public string AddReview(ReviewModel model)
        {
            return dataAccessLayer.AddReview( model);
        }
        public ReviewModel getReviews(string id)
        {
            return dataAccessLayer.getReviews(id);
        }
        public List<ReviewModel> getAllReviews()
        {
            return dataAccessLayer.getAllReviews();
        }
    }
 }
