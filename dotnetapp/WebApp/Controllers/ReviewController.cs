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
        public string AddReview(ReviewModel model)
        {
            return businesslayer.AddReview(model);
        }
        [HttpGet]
        [Route("getReviews/{id}")]
        public ReviewModel getReviews(string id)
        {
            return businesslayer.getReviews(id);
        }

   
    }
}