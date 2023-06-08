namespace WebApp.Models
{
    public class ProductModel
    {
        public int ID { get; set; }
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
        public int serviceCost { get; set; }
    }
}