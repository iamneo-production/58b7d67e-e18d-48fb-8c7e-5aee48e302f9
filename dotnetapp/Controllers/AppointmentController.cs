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

        /* this method returns an IActionResult, and the result being returned is a List */
        [HttpGet]
        [Route("getAllAppointments")]
        public IActionResult getAllAppointments()
        {
            List<ProductModel> result = businesslayer.getAllAppointments();
            return Ok(result);
        }
    }
}
