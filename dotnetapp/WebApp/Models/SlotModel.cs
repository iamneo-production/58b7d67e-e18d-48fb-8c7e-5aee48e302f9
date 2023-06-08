namespace WebApp.Models
{
    public class SlotModel
    {
        public string serviceCenterId { get; set; }
        public DateTime appointmentDate { get; set; }
        public List<string> Slots { get; set; }
    }
}
