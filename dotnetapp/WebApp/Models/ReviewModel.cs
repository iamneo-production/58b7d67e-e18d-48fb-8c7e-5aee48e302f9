using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{

 public class ReviewModel
    {
        public string  userEmail { get; set; }
        public string userName { get; set; }
        public string serviceCenterId { get; set; }
        public int Rating { get; set; }
        public string review { get; set; }
    }

}
