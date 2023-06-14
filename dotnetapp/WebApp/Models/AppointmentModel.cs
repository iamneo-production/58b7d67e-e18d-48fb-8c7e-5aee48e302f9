using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{

public class AppointmentModel
    {
        public string serviceCenterId { get; set; }

        public List<string> availableSlots { get; set; }

        public DateTime Appointmentdate { get; set; }


    }
}