using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
using dotnetapp.Models;
using System.Text.Json;

namespace dotnetapp.Controllers
{
    /*this class helps to manage all the reviews about the service provided*/
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        BusinessLayer businesslayer = new BusinessLayer();

        /* this method returns an IActionResult, and the result being returned is a Model */
        [HttpGet]
        [Route("getReviews/{id}")]
        public IActionResult getReviews(string id)
        {
            ReviewModel result = businesslayer.getReviews(id);
            return Ok(result);
        }

    }
}
