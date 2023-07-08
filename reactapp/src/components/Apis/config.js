/* The code is defining a constant variable `API_URLS` which contains a list of URLs for various API
endpoints. These URLs are used to make HTTP requests to the corresponding API endpoints in a
JavaScript application. The URLs are categorized based on different sections such as NavBar, User
Side, Admin Side, etc. Each URL represents a specific API endpoint that can be accessed by the
application. */
export const API_URLS = {
  //NavBar
  imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzJzr8CkFvCRERy3Z8JUEyxJPObXTuEyn9NWVOuapZEw&usqp=CAU&ec=48665701',
  getUserByEmailId: 'https://8080-cddafbcbabccadefcdadfcefbaddfabafceaa.project.examly.io/getUserByEmailId',
  getUserByUserId: 'https://8080-cddafbcbabccadefcdadfcefbaddfabafceaa.project.examly.io/api/User/getUser',
  editUserById: 'https://8080-cddafbcbabccadefcdadfcefbaddfabafceaa.project.examly.io/api/User/editUsersById',

  //User and Admin login API's
  userLogin: 'https://8080-cddafbcbabccadefcdadfcefbaddfabafceaa.project.examly.io/user/login',
  adminLogin: 'https://8080-cddafbcbabccadefcdadfcefbaddfabafceaa.project.examly.io/admin/login',
  //User signup API's
  userSignUp: 'https://8080-cddafbcbabccadefcdadfcefbaddfabafceaa.project.examly.io/user/signup',
  adminSignUp: 'https://8080-cddafbcbabccadefcdadfcefbaddfabafceaa.project.examly.io/admin/signup',

  //User Side
  //HomePage API's
  getAdminByEmailId: 'https://8080-cddafbcbabccadefcdadfcefbaddfabafceaa.project.examly.io/getAdminByEmailId',
  getServiceCenterData: 'https://8080-cddafbcbabccadefcdadfcefbaddfabafceaa.project.examly.io/admin/getservicecenter',
  //Dashbaord API's
  getSlotDetailsByDate: 'https://8080-cddafbcbabccadefcdadfcefbaddfabafceaa.project.examly.io/api/Appointment/getSlotDetailsByDate',
  reverseGeocoding: 'https://nominatim.openstreetmap.org/reverse?format=jsonv2',
  getReviews: 'https://8080-cddafbcbabccadefcdadfcefbaddfabafceaa.project.examly.io/api/Reviews/getReviews',
  saveAppointment: 'https://8080-cddafbcbabccadefcdadfcefbaddfabafceaa.project.examly.io/api/Appointment/user/appointment',
  postAvailableSlots: 'https://8080-cddafbcbabccadefcdadfcefbaddfabafceaa.project.examly.io/api/Appointment/postAvailableSlots',
  //Cart API's
  getAppointmentByMailId: 'https://8080-cddafbcbabccadefcdadfcefbaddfabafceaa.project.examly.io/api/Appointment/getAppointment',
  getAppointmentSlotsById: 'https://8080-cddafbcbabccadefcdadfcefbaddfabafceaa.project.examly.io/api/Appointment/getAppointmentSlotsById',
  editAppointment: 'https://8080-cddafbcbabccadefcdadfcefbaddfabafceaa.project.examly.io/api/Appointment/user/EditAppointment',
  updateOnDeleteAppointment: 'https://8080-cddafbcbabccadefcdadfcefbaddfabafceaa.project.examly.io/api/Appointment/updateOnDeleteAppointment',
  cancelAppointment: 'https://8080-cddafbcbabccadefcdadfcefbaddfabafceaa.project.examly.io/api/Appointment/user/cancelappointment',
  //Review API's
  addReview: 'https://8080-cddafbcbabccadefcdadfcefbaddfabafceaa.project.examly.io/api/Reviews/AddReview',

  //Admin Side

  //AddCenter
  availableSlots: 'https://8080-cddafbcbabccadefcdadfcefbaddfabafceaa.project.examly.io/availableSlots',
  addServiceCenter: 'https://8080-cddafbcbabccadefcdadfcefbaddfabafceaa.project.examly.io/admin/addServiceCenter',

  //Centerprofile
  viewServiceCenterByID: 'https://8080-cddafbcbabccadefcdadfcefbaddfabafceaa.project.examly.io/viewServiceCenterByID',
  deleteServiceCenter:  'https://8080-cddafbcbabccadefcdadfcefbaddfabafceaa.project.examly.io/admin/deleteServiceCenter',
  deleteAvailableSlots: 'https://8080-cddafbcbabccadefcdadfcefbaddfabafceaa.project.examly.io/deleteAvailableSlots',
  updateGetSlots: 'https://8080-cddafbcbabccadefcdadfcefbaddfabafceaa.project.examly.io/updateGetSlots',
  editServiceCenter: 'https://8080-cddafbcbabccadefcdadfcefbaddfabafceaa.project.examly.io/admin/editServiceCenter',

  //Customers
  getAllUsers: 'https://8080-cddafbcbabccadefcdadfcefbaddfabafceaa.project.examly.io/api/User/getAllUsers',
  deleteUsers: 'https://8080-cddafbcbabccadefcdadfcefbaddfabafceaa.project.examly.io/api/User/deleteUsers',
  addUser: 'https://8080-cddafbcbabccadefcdadfcefbaddfabafceaa.project.examly.io/api/User/addUser',

  //Review
  getAllReviews: 'https://8080-cddafbcbabccadefcdadfcefbaddfabafceaa.project.examly.io/api/Reviews/getAllReviews',

  //Service
  getAllAppointments:'https://8080-cddafbcbabccadefcdadfcefbaddfabafceaa.project.examly.io/api/Appointment/getAllAppointments',
  }
