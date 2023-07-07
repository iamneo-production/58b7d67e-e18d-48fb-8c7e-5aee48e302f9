using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace dotnetapp.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class ServiceCenterController : ControllerBase
    {
        /*this class helps to get the appointment details*/

        BusinessLayer businesslayer = new BusinessLayer();

            /* this method returns an IActionResult, and the result being returned is a string 
                * and By returning Ok(result), the result will be sent as the response*/
            [HttpPost]
            [Route("availableSlots")]
            public IActionResult availableSlots(AppointmentModel m)
            {
                ServiceCenterModel result = businesslayer.viewServiceCenterByID(serivceCenterId);
                return Ok(result);
            }

            /* this method returns an IActionResult, and the result being returned is a List */
            [HttpGet]
            [Route("admin/getservicecenter")]
            public IActionResult viewServiceCenter()
            {
                List<ServiceCenterModel> result = businesslayer.viewServiceCenter();
                return Ok(result);
            }
            /* this method returns an IActionResult, and the result being returned is a Model */
            [HttpGet]
            [Route("viewServiceCenterByID/{serivceCenterId}")]
            public IActionResult viewServiceCenterByID(string serivceCenterId)
            {
                ServiceCenterModel result = businesslayer.viewServiceCenterByID(serivceCenterId);
                return Ok(result);
            }

            /* this method returns an IActionResult, and the result being returned is a string */
            [HttpPut]
            [Route("updateGetSlots/{serviceCenterId}")]
            public IActionResult updateGetSlots(string serviceCenterId, AppointmentModel model)
            {
                string result = businesslayer.updateGetSlots(serviceCenterId, model);
                return Ok(result);
            }
            /* this method returns an IActionResult, and the result being returned is a string */
            [HttpDelete]
            [Route("admin/deleteServiceCenter/{serivceCenterId}")]

            public IActionResult deleteServiceCenter(string serivceCenterId)
            {
                string result = businesslayer.deleteServiceCenter(serivceCenterId);
                return Ok(result);
            }

            /* this method returns an IActionResult, and the result being returned is a string */
            [HttpDelete]
            [Route("deleteAvailableSlots/{serviceCenterId}")]
            public IActionResult deleteAvailableSlots(string serviceCenterId)
            {
                string result = businesslayer.deleteAvailableSlots(serviceCenterId);
                return Ok(result);
            }
            /* this method returns an IActionResult, and the result being returned is a string */
            [HttpPut]
            [Route("admin/editServiceCenter/{serviceCenterId}")]
            public IActionResult editServiceCenter(string serviceCenterId, [FromBody] JsonElement jsonData)
            {
                string result = businesslayer.editServiceCenter(serviceCenterId, jsonData);
                return Ok(result);
            }
            /* this method returns an IActionResult, and the result being returned is a string */
            [HttpPost]
            [Route("admin/addServiceCenter")]
            public IActionResult addServiceCenter([FromBody] JsonElement jsonData)
            {
                string result = businesslayer.deleteServiceCenter(serivceCenterId);
                return Ok(result);
            }
            /*TimeSpanConverter class that inherits from JsonConverter<TimeSpan>. 
             * This class overrides the Read method from the JsonConverter base class to provide custom deserialization logic
             * for converting a JSON string representation into a TimeSpan object. */
            public class TimeSpanConverter : JsonConverter<TimeSpan>
            {
                string result = businesslayer.deleteAvailableSlots(serviceCenterId);
                return Ok(result);
            }


            /* this method returns an IActionResult, and the result being returned is a string */
            [HttpPut]
            [Route("admin/editServiceCenter/{serviceCenterId}")]
            public IActionResult editServiceCenter(string serviceCenterId, [FromBody] JsonElement jsonData)
            {
                string result = businesslayer.editServiceCenter(serviceCenterId, jsonData);
                return Ok(result);
            }
        

    }
}