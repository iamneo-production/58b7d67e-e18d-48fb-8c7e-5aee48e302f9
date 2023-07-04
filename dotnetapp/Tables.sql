--ServiceCenterTable
-----------------------

create table AddCenters
(
serviceCenterId varchar(300) primary key not null,
serviceCenterName varchar(300) not null, 
serviceCenterPhone varchar(50) not null,
serviceCenterAddress varchar(500) not null,
serviceCenterImageUrl varchar(2048) not null,
serviceCenterMailId varchar(320) unique,
serviceCost varchar(30) not null,
serviceCenterStartTime time not null,
serviceCenterEndTime time not null,
serviceCenterDescription varchar(max) not null
);

--Appointment Table
-----------------------
CREATE TABLE Appointments (
  ID int identity(1,1) primary key,
  customerName varchar(30),
  productName varchar(300),
  productModelNo varchar(300),
  dateofPurchase date,
  contactNumber varchar(30),
  problemDescription varchar(max),
  bookedSlots varchar(50),
  dateOfAppointment date,
  email varchar(100),
  serviceCenterId varchar(300),
  serviceCenterName varchar(300),
  dateOfAppointmentBooking datetime,
  serviceCost varchar(10),
  FOREIGN KEY (serviceCenterId) REFERENCES AddCenters(serviceCenterId)
);