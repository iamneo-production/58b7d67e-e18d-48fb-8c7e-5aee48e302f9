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
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceCenterController : ControllerBase
    {
        /*this class helps to get the appointment details*/

        BusinessLayer businesslayer = new BusinessLayer();

        /* this method returns an IActionResult, and the result being returned is a List */
            [HttpGet]
            [Route("admin/getservicecenter")]
            public IActionResult viewServiceCenter()
            {
                List<ServiceCenterModel> result = businesslayer.viewServiceCenter();
                return Ok(result);
            }

    }
}