using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Models
{
    //This class contains the email and password of the user
    public class LoginModel
    {
        //these are the attributes that are used in the model with our required datatypes
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
