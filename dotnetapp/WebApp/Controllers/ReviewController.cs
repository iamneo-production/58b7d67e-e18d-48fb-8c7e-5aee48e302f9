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
    public class ReviewController : ControllerBase
    {
        BusinessLayer businesslayer = new BusinessLayer();
         [HttpPost]
        [Route("AddReview")]
        public IActionResult AddReview(ReviewModel model)
        {
            string result = businesslayer.AddReview(model);
            return Ok(result);
        }

        [HttpGet]
        [Route("getReviews/{id}")]
        public IActionResult getReviews(string id)
        {
            ReviewModel result = businesslayer.getReviews(id);
            return Ok(result);
        }

        [HttpGet]
        [Route("getAllReviews")]
        public IActionResult getAllReviews()
        {
            List<ReviewModel> result = businesslayer.getAllReviews();
            return Ok(result);
        }

   
    }
}