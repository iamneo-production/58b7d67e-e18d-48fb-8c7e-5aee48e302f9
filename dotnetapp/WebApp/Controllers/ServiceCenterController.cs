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
        public string availableSlots(AppointmentModel m)
        {
            return businesslayer.availableSlots(m);
        }
        [HttpGet]
        [Route("admin/getservicecenter")]
        public List<ServiceCenterModel> viewServiceCenter()
        {
            return businesslayer.viewServiceCenter();
        }
        [HttpGet]
        [Route("viewServiceCenterByID/{serivceCenterId}")]
        public ServiceCenterModel viewServiceCenterByID(string serivceCenterId)
        {
            return businesslayer.viewServiceCenterByID(serivceCenterId);
        }
        [HttpPut]
        [Route("updateGetSlots/{serviceCenterId}")]
        public string updateGetSlots(string serviceCenterId, AppointmentModel model)
        {
            return businesslayer.updateGetSlots(serviceCenterId, model);
        }
        [HttpDelete]
        [Route("admin/deleteServiceCenter/{serivceCenterId}")]
        public string deleteServiceCenter(string serivceCenterId)
        {
            return businesslayer.deleteServiceCenter(serivceCenterId);
        }
        [HttpDelete]
        [Route("deleteAvailableSlots/{serviceCenterId}")]
        public string deleteAvailableSlots(string serviceCenterId)
        {
            return businesslayer.deleteAvailableSlots(serviceCenterId);
        }
        [HttpPost]
        [Route("admin/addServiceCenter")]
        public string addServiceCenter([FromBody] JsonElement jsonData)
        {
            return businesslayer.addServiceCenter(jsonData);
        }
        [HttpPut]
        [Route("admin/editServiceCenter/{serviceCenterId}")]
        public string editServiceCenter(string serviceCenterId, [FromBody] JsonElement jsonData)
        {
            return businesslayer.editServiceCenter(serviceCenterId, jsonData);
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
