using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.SqlClient;
using System.Data;
using WebApp.Models;
using System.Threading.Tasks;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        BusinessLayer businesslayer = new BusinessLayer();
        [HttpGet]
        [Route("getSlotDetailsByDate/{serviceCenterId},{Date}")]
        public List<AppointmentModel> getSlotDetailsByDate(string serviceCenterId, DateTime Date)
        {
            return (businesslayer.getSlotDetailsByDate(serviceCenterId, Date));
        }
        [HttpPost]
        [Route("user/appointment")]
        public string saveAppointment(ProductModel data)
        {
            return businesslayer.saveAppointment(data);
        }
        [HttpPost]
        [Route("postAvailableSlots")]
        public string postAvailableSlots(AppointmentModel model)
        {
            return businesslayer.postAvailableSlots(model);
        }
        [HttpGet]
        [Route("getAppointment")]
        public List<ProductModel> getAppointment(string email)
        {
            return businesslayer.getAppointment(email);
        }
        [HttpGet]
        [Route("getAppointmentSlotsById/{id}")]
        public ProductModel getAppointmentSlotsById(int id)
        {
            return businesslayer.getAppointmentSlotsById(id);
        }
        [HttpPut]
        [Route("user/EditAppointment/{ID}")]
        public string EditAppointment(int ID, [FromBody] ProductModel model)
        {
            return businesslayer.EditAppointment(ID, model);
        }
        [HttpPost]
        [Route("updateOnDeleteAppointment")]
        public string updateOnDeleteAppointment(AppointmentModel model)
        {
            return businesslayer.updateOnDeleteAppointment(model);
        }

        [HttpDelete]
        [Route("user/cancelappointment/{ID}")]
        public string deleteAppointment(int ID)
        {
            return businesslayer.deleteAppointment(ID);
        }
        [HttpGet]
        [Route("getAllAppointments")]
        public List<ProductModel> getAllAppointments()
        {
            return businesslayer.getAllAppointments();
        }
    }
}
