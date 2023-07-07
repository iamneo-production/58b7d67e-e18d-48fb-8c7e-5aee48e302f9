using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.SqlClient;
using System.Data;
using dotnetapp.Models;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace dotnetapp.Controllers
{
    /*This class controls the save/edit/delete/view appointments*/
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        BusinessLayer businesslayer = new BusinessLayer();
        /* this method returns an IActionResult, and the result being returned is a List and By returning Ok(result), the result will be sent as the response*/
        [HttpGet]
        [Route("getAppointment")]
        public IActionResult getAppointment(string email)
        {
            List<ProductModel> result = businesslayer.getAppointment(email);
            return Ok(result);
        }
        /* this method returns an IActionResult, and the result being returned is a string  */
        [HttpPost]
        [Route("user/appointment")]
        public IActionResult saveAppointment(ProductModel data)
        {
            string result = businesslayer.saveAppointment(data);
            return Ok(result);
        }
        /* this method returns an IActionResult, and the result being returned is a string */
        [HttpPost]
        [Route("postAvailableSlots")]
        public IActionResult postAvailableSlots(AppointmentModel model)
        {
            string result = businesslayer.postAvailableSlots(model);
            return Ok(result);
        }
        /* this method returns an IActionResult, and the result being returned is a list */
        [HttpGet]
        [Route("getAppointment")]
        public IActionResult getAppointment(string email)
        {
            List<ProductModel> result = businesslayer.getAppointment(email);
            return Ok(result);
        }
        /* this method returns an IActionResult, and the result being returned is a Model */
        [HttpGet]
        [Route("getAppointmentSlotsById/{id}")]
        public IActionResult getAppointmentSlotsById(int id)
        {
            ProductModel result = businesslayer.getAppointmentSlotsById(id);
            return Ok(result);
        }
        /* this method returns an IActionResult, and the result being returned is a string */
        [HttpPut]
        [Route("user/EditAppointment/{ID}")]
        public IActionResult EditAppointment(int ID, [FromBody] ProductModel model)
        {
            string result = businesslayer.EditAppointment(ID, model);
            return Ok(result);
        }
        /* this method returns an IActionResult, and the result being returned is a string */
        [HttpPost]
        [Route("updateOnDeleteAppointment")]
        public IActionResult updateOnDeleteAppointment(AppointmentModel model)
        {
            string result = businesslayer.updateOnDeleteAppointment(model);
            return Ok(result);
        }
        /* this method returns an IActionResult, and the result being returned is a string */
        [HttpDelete]
        [Route("user/cancelappointment/{ID}")]
        public IActionResult deleteAppointment(int ID)
        {
            string result = businesslayer.deleteAppointment(ID);
            return Ok(result);
        }
        /* this method returns an IActionResult, and the result being returned is a List */
        [HttpGet]
        [Route("getAllAppointments")]
        public IActionResult getAllAppointments()
        {
            string result = businesslayer.deleteAppointment(ID);
            return Ok(result);
        }
    }
}