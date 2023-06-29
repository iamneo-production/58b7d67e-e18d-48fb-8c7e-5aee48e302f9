using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceCenterController : ControllerBase
    {
        BusinessLayer businesslayer = new BusinessLayer();
        
        [HttpPost]
        [Route("availableSlots")]
        public IActionResult availableSlots(AppointmentModel m)
        {
            string result = businesslayer.availableSlots(m);
            return Ok(result);
        }


        [HttpGet]
        [Route("admin/getservicecenter")]
        public IActionResult viewServiceCenter()
        {
            List<ServiceCenterModel> result = businesslayer.viewServiceCenter();
        return Ok(result);
        }


        [HttpGet]
        [Route("viewServiceCenterByID/{serivceCenterId}")]
        public IActionResult viewServiceCenterByID(string serivceCenterId)
        {
            ServiceCenterModel result = businesslayer.viewServiceCenterByID(serivceCenterId);
            return Ok(result);
        }

        [HttpPut]
        [Route("updateGetSlots/{serviceCenterId}")]
        public IActionResult updateGetSlots(string serviceCenterId, AppointmentModel model)
        {
            string result = businesslayer.updateGetSlots(serviceCenterId, model);
            return Ok(result);
        }


        [HttpDelete]
        [Route("admin/deleteServiceCenter/{serivceCenterId}")]

        public IActionResult deleteServiceCenter(string serivceCenterId)
        {
            string result = businesslayer.deleteServiceCenter(serivceCenterId);
            return Ok(result);
        }


        [HttpDelete]
        [Route("deleteAvailableSlots/{serviceCenterId}")]
        public IActionResult deleteAvailableSlots(string serviceCenterId)
        {
            string result = businesslayer.deleteAvailableSlots(serviceCenterId);
            return Ok(result);
        }


        [HttpPost]
        [Route("admin/addServiceCenter")]
        public IActionResult addServiceCenter([FromBody] JsonElement jsonData)
        {
            string result = businesslayer.addServiceCenter(jsonData);
            return Ok(result);
        }

        [HttpPut]
        [Route("admin/editServiceCenter/{serviceCenterId}")]
        public IActionResult editServiceCenter(string serviceCenterId, [FromBody] JsonElement jsonData)
        {
            string result = businesslayer.editServiceCenter(serviceCenterId, jsonData);
            return Ok(result);
        }
        public class TimeSpanConverter : JsonConverter<TimeSpan>
        {
            public override TimeSpan Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
            {
                string value = reader.GetString();
                return TimeSpan.Parse(value);
            }

            public override void Write(Utf8JsonWriter writer, TimeSpan value, JsonSerializerOptions options)
            {
                writer.WriteStringValue(value.ToString());
            }
        }
    }
}
