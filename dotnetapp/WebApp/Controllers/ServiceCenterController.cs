using CameraAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace CameraAPI.Controllers
{
    [Route("api/admin")]
    [ApiController]
    public class ServiceCenterController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public ServiceCenterController(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("connection");
        }

        [HttpPost]
        [Route("addServiceCenter")]
        public string AddServiceCenter(ServiceCenterModel model)
        {
            string msg = string.Empty;
            try
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("AdminAddServiceCenter", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@serviceCenterId", model.serviceCenterId);
                        cmd.Parameters.AddWithValue("@serviceCenterName", model.serviceCenterName);
                        cmd.Parameters.AddWithValue("@serviceCenterPhone", model.serviceCenterPhone);
                        cmd.Parameters.AddWithValue("@serviceCenterAddress", model.serviceCenterAddress);
                        cmd.Parameters.AddWithValue("@serviceCenterImageUrl", model.serviceCenterImageUrl);
                        cmd.Parameters.AddWithValue("@serviceCenterMailId", model.serviceCenterMailId);
                        cmd.Parameters.AddWithValue("@serviceCost", model.serviceCost);
                        cmd.Parameters.AddWithValue("@serviceCenterStartTime", model.serviceCenterStartTime);
                        cmd.Parameters.AddWithValue("@serviceCenterEndTime", model.serviceCenterEndTime);
                        cmd.Parameters.AddWithValue("@serviceCenterDescription", model.serviceCenterDescription);

                        conn.Open();
                        int data = cmd.ExecuteNonQuery();
                        if (data >= 1)
                        {
                            msg = "Service Center added";
                        }
                        else
                        {
                            msg = "Failed to Add Service Center";
                        }
                    }
                }
            }
            catch (Exception e)
            {
                msg = "Fields cannot be empty!";
            }

            return msg;
        }

        [HttpGet]
        [Route("getservicecenter")]
        public List<ServiceCenterModel> ViewServiceCenter()
        {
            List<ServiceCenterModel> getAllServiceCenterDetails = new List<ServiceCenterModel>();

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("getAllServiceCenterDetails", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    conn.Open();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            ServiceCenterModel model = new ServiceCenterModel();
                            model.serviceCenterId = dr["serviceCenterId"].ToString();
                            model.serviceCenterName = dr["serviceCenterName"].ToString();
                            model.serviceCenterPhone = dr["serviceCenterPhone"].ToString();
                            model.serviceCenterAddress = dr["serviceCenterAddress"].ToString();
                            model.serviceCenterImageUrl = dr["serviceCenterImageUrl"].ToString();
                            model.serviceCenterMailId = dr["serviceCenterMailId"].ToString();
                            model.serviceCost = int.Parse(dr["serviceCost"].ToString());
                            model.serviceCenterStartTime = TimeSpan.Parse(dr["serviceCenterStartTime"].ToString());
                            model.serviceCenterEndTime = TimeSpan.Parse(dr["serviceCenterEndTime"].ToString());
                            model.serviceCenterDescription = dr["serviceCenterDescription"].ToString();
                            getAllServiceCenterDetails.Add(model);
                        }
                    }
                }
            }

            return getAllServiceCenterDetails;
        }

        [HttpGet]
        [Route("viewServiceCenterByID/{serviceCenterId}")]
        public ServiceCenterModel ViewServiceCenterByID(string serviceCenterId)
        {
            ServiceCenterModel model = new ServiceCenterModel();

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("getServiceCenterById", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@serviceCenterId", serviceCenterId);
                    conn.Open();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            model.serviceCenterId = dr["serviceCenterId"].ToString();
                            model.serviceCenterName = dr["serviceCenterName"].ToString();
                            model.serviceCenterPhone = dr["serviceCenterPhone"].ToString();
                            model.serviceCenterAddress = dr["serviceCenterAddress"].ToString();
                            model.serviceCenterImageUrl = dr["serviceCenterImageUrl"].ToString();
                            model.serviceCenterMailId = dr["serviceCenterMailId"].ToString();
                            model.serviceCost = int.Parse(dr["serviceCost"].ToString());
                            model.serviceCenterStartTime = TimeSpan.Parse(dr["serviceCenterStartTime"].ToString());
                            model.serviceCenterEndTime = TimeSpan.Parse(dr["serviceCenterEndTime"].ToString());
                            model.serviceCenterDescription = dr["serviceCenterDescription"].ToString();
                        }
                    }
                }
            }

            return model;
        }

        [HttpDelete]
        [Route("deleteServiceCenter/{serviceCenterId}")]
        public string DeleteServiceCenter(string serviceCenterId)
        {
            string msg = string.Empty;

            try
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("deleteServiceCenterId", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@serviceCenterId", serviceCenterId);
                        conn.Open();
                        int data = cmd.ExecuteNonQuery();
                        conn.Close();

                        if (data >= 1)
                        {
                            msg = "Service center deleted";
                        }
                        else
                        {
                            msg = "Can't Delete Service Center Appointments booked for that service center";
                        }
                    }
                }
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return msg;
        }

        [HttpPut]
        [Route("editServiceCenter/{serviceCenterId}")]
        public string EditServiceCenter(string serviceCenterId, [FromBody] ServiceCenterModel model)
        {
            string msg = string.Empty;

            try
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("updateAddCenters", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@serviceCenterId", serviceCenterId);
                        cmd.Parameters.AddWithValue("@serviceCenterName", model.serviceCenterName);
                        cmd.Parameters.AddWithValue("@serviceCenterPhone", model.serviceCenterPhone);
                        cmd.Parameters.AddWithValue("@serviceCenterAddress", model.serviceCenterAddress);
                        cmd.Parameters.AddWithValue("@serviceCenterImageUrl", model.serviceCenterImageUrl);
                        cmd.Parameters.AddWithValue("@serviceCenterMailId", model.serviceCenterMailId);
                        cmd.Parameters.AddWithValue("@serviceCost", model.serviceCost);
                        cmd.Parameters.AddWithValue("@serviceCenterStartTime", model.serviceCenterStartTime);
                        cmd.Parameters.AddWithValue("@serviceCenterEndTime", model.serviceCenterEndTime);
                        cmd.Parameters.AddWithValue("@serviceCenterDescription", model.serviceCenterDescription);
                        conn.Open();
                        int data = cmd.ExecuteNonQuery();
                        conn.Close();

                        if (data >= 1)
                        {
                            msg = "Service center updated";
                        }
                        else
                        {
                            msg = "Failed";
                        }
                    }
                }
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return msg;
        }

        [HttpDelete]
        [Route("deleteAvailableSlots/{serviceCenterId}")]
        public string DeleteAvailableSlots(string serviceCenterId)
        {
            string msg = string.Empty;

            try
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("deleteAvailableSlots", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@serviceCenterId", serviceCenterId);
                        conn.Open();
                        int data = cmd.ExecuteNonQuery();
                        conn.Close();

                        if (data >= 1)
                        {
                            msg = "Service center deleted";
                        }
                        else
                        {
                            msg = "Failed to Delete";
                        }
                    }
                }
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return msg;
        }

        [HttpPost]
        [Route("availableSlots")]
        public string AvailableSlots(AppointmentModel m)
        {
            string msg = string.Empty;

            try
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("InsertAvailableSlots", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@serviceCenterId", m.serviceCenterId);

                        List<string> availableSlots = m.availableSlots;
                        string slotsString = string.Join(",", availableSlots);
                        cmd.Parameters.AddWithValue("@availableSlots", slotsString);

                        conn.Open();
                        int data = cmd.ExecuteNonQuery();
                        conn.Close();

                        msg = "Success";
                    }
                }
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return msg;
        }

        [HttpGet]
        [Route("getSlots/{serviceCenterId}")]
        public List<AppointmentModel> GetSlots(string serviceCenterId)
        {
            List<AppointmentModel> list = new List<AppointmentModel>();

            try
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("getAvailableSlots", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@serviceCenterId", serviceCenterId);
                        conn.Open();

                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                AppointmentModel m = new AppointmentModel();
                                List<string> availableSlots = dr["availableSlots"].ToString().Split(',').ToList();
                                m.availableSlots = availableSlots;
                                list.Add(m);
                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {

            }

            return list;
        }

        [HttpPut]
        [Route("updateGetSlots/{serviceCenterId}")]
        public string UpdateGetSlots(string serviceCenterId, AppointmentModel model)
        {
            string msg = string.Empty;

            try
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("editAvailableSlots", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@serviceCenterId", serviceCenterId);
                        List<string> availableSlots = model.availableSlots;
                        string slotsString = string.Join(",", availableSlots);
                        cmd.Parameters.AddWithValue("@availableSlots", slotsString);
                        conn.Open();
                        int data = cmd.ExecuteNonQuery();
                        conn.Close();

                        if (data >= 1)
                        {
                            msg = "Service center updated";
                        }
                        else
                        {
                            msg = "Failed";
                        }
                    }
                }
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return msg;
        }
    }
}