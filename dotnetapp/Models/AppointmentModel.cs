using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Models
{

    //this class stores the appointments booked by the users
    public class AppointmentModel
    {
        
            //these are the attributes that are used in the model with our required datatypes
            public string serviceCenterId { get; set; }
            public List<string> availableSlots { get; set; }
            public DateTime Appointmentdate { get; set; }
        
    }
}