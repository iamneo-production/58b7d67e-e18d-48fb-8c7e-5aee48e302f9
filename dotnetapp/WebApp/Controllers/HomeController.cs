using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CameraAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : ControllerBase
    {
        // GET: api/home
        [HttpGet]
        [Route("")]
        public ActionResult<string> Index()
        {
            return "Home Page";
        }
    }
}
