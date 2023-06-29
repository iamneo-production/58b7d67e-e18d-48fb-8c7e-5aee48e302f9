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
        public IActionResult getSlotDetailsByDate(string serviceCenterId, DateTime Date)
        {
            List<AppointmentModel> result = businesslayer.getSlotDetailsByDate(serviceCenterId, Date);
            return Ok(result);
        }

        [HttpPost]
        [Route("user/appointment")]
        public IActionResult saveAppointment(ProductModel data)
        {
            string result = businesslayer.saveAppointment(data);
            return Ok(result);
        }

        [HttpPost]
        [Route("postAvailableSlots")]
        public IActionResult postAvailableSlots(AppointmentModel model)
        {
            string result = businesslayer.postAvailableSlots(model);
            return Ok(result);
        }

        [HttpGet]
        [Route("getAppointment")]
        public IActionResult getAppointment(string email)
        {
            List<ProductModel> result = businesslayer.getAppointment(email);
            return Ok(result);
        }

        [HttpGet]
        [Route("getAppointmentSlotsById/{id}")]
        public IActionResult getAppointmentSlotsById(int id)
        {
            ProductModel result = businesslayer.getAppointmentSlotsById(id);
            return Ok(result);
        }

        [HttpPut]
        [Route("user/EditAppointment/{ID}")]
        public IActionResult EditAppointment(int ID, [FromBody] ProductModel model)
        {
            string result = businesslayer.EditAppointment(ID, model);
            return Ok(result);
        }

        [HttpPost]
        [Route("updateOnDeleteAppointment")]
        public IActionResult updateOnDeleteAppointment(AppointmentModel model)
        {
            string result = businesslayer.updateOnDeleteAppointment(model);
            return Ok(result);
        }

        [HttpDelete]
        [Route("user/cancelappointment/{ID}")]
        public IActionResult deleteAppointment(int ID)
        {
            string result = businesslayer.deleteAppointment(ID);
            return Ok(result);
        }

        [HttpGet]
        [Route("getAllAppointments")]
        public IActionResult getAllAppointments()
        {
            List<ProductModel> result = businesslayer.getAllAppointments();
            return Ok(result);
        }
    }
}
