using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Models
{

    //this class stores the Model booked for the service
    public class ProductModel
    {
        //these are the attributes that are used in the model with our required datatypes
        public int ID { get; set; }
        public string customerName { get; set; }
        public string productName { get; set; }
        public string productModelNo { get; set; }
        public DateTime dateofPurchase { get; set; }
        public string contactNumber { get; set; }
        public string problemDescription { get; set; }
        public string bookedSlots { get; set; }
        public DateTime dateOfAppointment { get; set; }
        public string email { get; set; }
        public string serviceCenterId { get; set; }
        public string serviceCenterName { get; set; }
        public DateTime dateOfAppointmentBooking { get; set; }
        public string serviceCost { get; set; }
    }
}
