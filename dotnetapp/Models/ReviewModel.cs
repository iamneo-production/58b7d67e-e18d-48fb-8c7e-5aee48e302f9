using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Models
{

    //This class stores the Review of the service provided
    public class ReviewModel
    {
        //these are the attributes that are used in the model with our required datatypes
        public string  userEmail { get; set; }
        public string userName { get; set; }
        public string serviceCenterId { get; set; }
        public int Rating { get; set; }
        public string review { get; set; }

    }
}