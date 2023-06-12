using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{
     public class ServiceCenterModel
    {
        public string serviceCenterId { get; set; }
        public string serviceCenterName { get; set; }
        public string serviceCenterPhone { get; set; }
        public string serviceCenterAddress { get; set; }
        public string serviceCenterImageUrl { get; set; }
        public string serviceCenterMailId { get; set; }
        public string serviceCost { get; set; }
        public TimeSpan serviceCenterStartTime { get; set; }
        public TimeSpan serviceCenterEndTime { get; set; }
        public string serviceCenterDescription { get; set; }
    }
}
