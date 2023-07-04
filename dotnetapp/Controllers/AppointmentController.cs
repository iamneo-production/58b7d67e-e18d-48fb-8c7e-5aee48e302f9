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
        [Route("getSlotDetailsByDate/{serviceCenterId},{Date}")]
        public IActionResult getSlotDetailsByDate(string serviceCenterId, DateTime Date)
        {
            List<AppointmentModel> result = businesslayer.getSlotDetailsByDate(serviceCenterId, Date);
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
    }
}