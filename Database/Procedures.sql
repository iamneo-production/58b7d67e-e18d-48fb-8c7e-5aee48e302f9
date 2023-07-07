
--Admin
---------
--Add Admin procedure
------------------------
CREATE PROCEDURE AddAdmin
 @email varchar(100),
 @password varchar(100),
 @username varchar(100),
  @mobileNumber varchar(100),
  @userRole varchar(100)
AS 
  BEGIN
    INSERT INTO AdminTable ( Email,Password, UserName,MobileNumber, UserRole) 
	VALUES 
	(@email,@password, @Username, @mobileNumber, @userRole )
END;
go

--AdminLogin procedure
---------------------------
create proc CameraServiceAdminLogin(@email varchar(100),@password varchar(100))
as
begin
if exists(select Email from AdminTable where Email = @email)
select Email, Password from AdminTable where Email = @email and Password = @password
end;
go

--Get Admin Details by Email
------------------------------
create proc getAdminByEmail(@email varchar(100))
as
begin
select * from AdminTable where Email = @email
end;
go

------------------------------------------------------------------------------
--User
-----------
--Add user
----------
CREATE PROCEDURE AddUser
    @email varchar(100),
    @password varchar(100),
    @username varchar(100),
    @mobileNumber varchar(100),
    @userRole varchar(100)
AS 
BEGIN
    IF EXISTS(SELECT Email FROM UserTable WHERE Email = @email)
    BEGIN
    END
    ELSE
    BEGIN
        INSERT INTO UserTable (Email, Password, UserName, MobileNumber, UserRole) 
        VALUES (@email, @password, @username, @mobileNumber, @userRole);
    END;
END;


--User Login 
--------------
create proc CameraServiceUserLogin(@email varchar(100),@password varchar(100))
as
begin
if exists(select Email from UserTable where  Email =@email)
select Email, Password from UserTable where Email = @email and Password = @password
end;
go

--get user details by email
-------------------------
create proc getUserByEmail(@email varchar(100))
as
begin
select *  from UserTable where Email =@email
end;
go

--get all user details
-----------------------
create procedure getAllUsers
as
begin
select UserId, Email, Password, UserName, MobileNumber, UserRole from UserTable
end;
go

--get user by UserId
-------------------
create procedure getUsersById(@UserId int)
as
begin
select * from UserTable where UserId=@UserId
end;
go

--edit user by userId
-------------------
create procedure editUser(@UserId int, @email varchar(100), @password varchar(100), @username varchar(100), @mobileNumber varchar(100), @userRole varchar(100))
as
begin
update  UserTable set Email = @email, Password=@password, UserName=@username, MobileNumber=@mobileNumber, UserRole=@userRole where UserId = @UserId
end;
go

--delete user by UserId
-----------------------
create procedure deleteById(@UserId int)
as
begin
delete from UserTable where UserId=@UserId
end;
go

--delete all users 
----------------------
create procedure deleteUsers
as
begin
delete from UserTable 
where UserId > 0
end;
go

------------------------------------------------------------------------------

--Service Centers
---------------------
--Add service centers
--------------------
CREATE PROCEDURE AdminAddServiceCenter(
    @serviceCenterId varchar(300), 
    @serviceCenterName varchar(300), 
    @serviceCenterPhone varchar(50), 
    @serviceCenterAddress varchar(500),
    @serviceCenterImageUrl varchar(2048),
    @serviceCenterMailId varchar(320),
    @serviceCost varchar(30),
    @serviceCenterStartTime time,
    @serviceCenterEndTime time,
    @serviceCenterDescription varchar(max)
)
AS
BEGIN
    IF EXISTS (SELECT Email FROM AdminTable WHERE Email = 'admin@gmail.com') AND NOT EXISTS (SELECT serviceCenterId FROM AddCenters  WHERE 
	serviceCenterId = @serviceCenterId)
    BEGIN
        INSERT INTO AddCenters (serviceCenterId, serviceCenterName, serviceCenterPhone, serviceCenterAddress, serviceCenterImageUrl, 
		serviceCenterMailId, serviceCost, serviceCenterStartTime, serviceCenterEndTime, serviceCenterDescription)
        VALUES (@serviceCenterId, @serviceCenterName, @serviceCenterPhone, @serviceCenterAddress, @serviceCenterImageUrl,
		@serviceCenterMailId, @serviceCost,@serviceCenterStartTime,@serviceCenterEndTime, @serviceCenterDescription)
    END
END;
go

--get all service centers
------------------------
create proc getAllServiceCenterDetails
as
begin
select serviceCenterId, serviceCenterName, serviceCenterPhone, serviceCenterAddress, serviceCenterImageUrl, serviceCenterMailId
serviceCost, serviceCenterStartTime, serviceCenterEndTime, serviceCenterDescription from AddCenters
end ;
go

--get service center details by service center id
-------------------------------------------------
create procedure getServiceCenterById(@serviceCenterId varchar(300))
as
begin
if exists (select * from AddCenters where serviceCenterId=@serviceCenterId)
select * from AddCenters where serviceCenterId=@serviceCenterId
end;
go

--update service center details
------------------------------
create procedure updateAddCenters(
@serviceCenterId varchar(300), 
@serviceCenterName varchar(300), 
@serviceCenterPhone varchar(50), 
@serviceCenterAddress varchar(500),
@serviceCenterImageUrl varchar(2048),
@serviceCenterMailId varchar(320),
@serviceCost varchar(10),
@serviceCenterStartTime time,
@serviceCenterEndTime time,
@serviceCenterDescription varchar(max))
as
begin
if exists (select * from AddCenters where serviceCenterId=@serviceCenterId)
update AddCenters set serviceCenterName=@serviceCenterName, serviceCenterPhone=@serviceCenterPhone, 
serviceCenterAddress=@serviceCenterAddress, 
serviceCenterImageUrl=@serviceCenterImageUrl, 
serviceCenterMailId=@serviceCenterMailId,
serviceCost = @serviceCost, serviceCenterStartTime= @serviceCenterStartTime, serviceCenterEndTime=@serviceCenterEndTime,
serviceCenterDescription=@serviceCenterDescription where serviceCenterId=@serviceCenterId
end;
go

--delete service centers by service center id
-------------------------------------------
create procedure deleteServiceCenterId(@serviceCenterId varchar(300))
as
begin
if exists(select * from AddCenters where serviceCenterId = @serviceCenterId)
delete from AddCenters where serviceCenterId = @serviceCenterId
end;
go

------------------------------------------------------------------------------

--Appointments
--------------
--Adding Appointment
------------------
create procedure addAppointment(
@customerName varchar(30),
@productName varchar(300),
@productModelNo varchar(300),
@dateofPurchase date,
@contactNumber varchar(30),
@problemDescription varchar(max),
@bookedSlots varchar(50),
@dateOfAppointment date, 
@userEmail varchar(100),
@serviceCenterId varchar(300),
@serviceCenterName varchar(300),
@serviceCost varchar(10))
as
begin
if not exists( 
select bookedSlots, dateOfAppointment, serviceCenterId 
from Appointments where bookedSlots=@bookedSlots 
and dateOfAppointment=@dateOfAppointment and serviceCenterId = @serviceCenterId)
insert into Appointments
(customerName, productName, productModelNo, dateofPurchase, 
contactNumber, problemDescription, bookedSlots, dateOfAppointment, 
email, serviceCenterId, dateOfAppointmentBooking, serviceCenterName, serviceCost)
values
(@customerName, @productName, @productModelNo, @dateofPurchase, @contactNumber,
@problemDescription, @bookedSlots, @dateOfAppointment, @userEmail, 
@serviceCenterId, SYSDATETIME(), @serviceCenterName, @serviceCost)
end;
go

--get appointments by user Email
--------------------------------
create procedure getAppointmentDetails(@userEmail varchar(320))
as
begin
if exists ( select * from Appointments where email = @userEmail)
select * from Appointments where email = @userEmail
end;
go

--cancel appoitnment by user email
---------------------------------
create procedure cancelAppointment(@ID int)
as
begin
delete from Appointments where ID = @ID
end;
go

--get appointment by Appointment Id
---------------------------------
create procedure getAppointmentDetailsByID(@ID int)
as
begin
select * from Appointments where ID = @ID
end;
go

--update appointment by Appointment Id
-----------------------------------
create proc updateAppointment(@ID int, 
@productName varchar(300), 
@productModelNo varchar(300), 
@dateOfPurchase date, 
@contactNumber varchar(50), 
@problemDescription varchar(max),
@dateOfAppointment date,
@bookedSlots varchar(300))
as
begin
update Appointments set 
productName=@productName,
productModelNo=@productModelNo,
dateOfPurchase=@dateOfPurchase,
contactNumber=@contactNumber,
problemDescription=@problemDescription,
dateOfAppointment=@dateOfAppointment,
bookedSlots=@bookedSlots where ID=@ID
end;
go

--get all appointment details
----------------------------
create procedure getAllAppointments
as
begin
select * from Appointments
end;
go
------------------------------------------------------------------------------

--Available Slots
------------------
--Slots entry in AvailableSlots table
-----------------------------------
create procedure InsertAvailableSlots(@serviceCenterId varchar(300), @availableSlots varchar(max))
as
begin
if not exists ( select * from AvailableSlots where serviceCenterId=@serviceCenterId and availableSlots = @availableSlots)
insert into AvailableSlots (serviceCenterId, availableSlots) values ( @serviceCenterId, @availableSlots)
end;
go

--update Available Slots
-----------------------
create procedure editAvailableSlots(@serviceCenterId varchar(300), @availableSlots varchar(max))
as
begin
update  AvailableSlots set availableSlots = @availableSlots where serviceCenterId  = @serviceCenterId
end;
go

--delete Available Slots
--------------------------
create procedure deleteAvailableSlots(@serviceCenterId varchar(300))
as
begin
delete from AvailableSlots where serviceCenterId = @serviceCenterId
end;
go

--show all available slots based on service center Id and Appointment date
--------------------------------------------------------------------------
create procedure showAvailableSlots(@serviceCenterId varchar(300), @Appointmentdate date)
as
begin
if exists (select * from AvailableSlots where serviceCenterId=@serviceCenterId and Appointmentdate=@Appointmentdate)
select availableSlots from AvailableSlots where serviceCenterId=@serviceCenterId and Appointmentdate=@Appointmentdate
else
select availableSlots from AvailableSlots where serviceCenterId=@serviceCenterId
end;
go

--On deleting or editing the appointment
--------------------------------------
CREATE PROCEDURE onDeleteAppointment
  @serviceCenterId VARCHAR(300),
  @availableSlot VARCHAR(30),
  @Appointmentdate DATE
AS
BEGIN
  UPDATE AvailableSlots
  SET availableSlots = CONCAT(ISNULL(availableSlots, ''), ', ', @availableSlot)
  WHERE serviceCenterId = @serviceCenterId
    AND Appointmentdate = @Appointmentdate;
  UPDATE a
  SET a.availableSlots = t.joinedSlots
  FROM AvailableSlots a
  CROSS APPLY (
    SELECT STRING_AGG(SlotValue, ',') WITHIN GROUP (ORDER BY CONVERT(TIME, LEFT(SlotValue, 5))) AS joinedSlots
    FROM (
      SELECT value AS SlotValue
      FROM STRING_SPLIT(a.availableSlots, ',')
    ) s
  ) t;
END;
go

--inserting or updating slots
-----------------------------

CREATE PROCEDURE setAvailableSlots
  @serviceCenterId VARCHAR(300),
  @Appointmentdate DATE,
  @availableSlots VARCHAR(MAX)
AS
BEGIN
  IF NOT EXISTS (SELECT * FROM AvailableSlots WHERE serviceCenterId = @serviceCenterId AND Appointmentdate = @Appointmentdate)
  BEGIN
    INSERT INTO AvailableSlots (serviceCenterId, Appointmentdate, availableSlots)
    VALUES (@serviceCenterId, @Appointmentdate, @availableSlots);
  END
  ELSE
  BEGIN
    UPDATE AvailableSlots
    SET availableSlots = @availableSlots
    WHERE serviceCenterId = @serviceCenterId AND Appointmentdate = @Appointmentdate;
  END
END;
go
------------------------------------------------------------------------------
--reviews
--------------
--Adding Reviews
-----------------
create proc addingReviews(
@userEmail varchar(30), @userName varchar(20), 
@serviceCenterId varchar(30), @Rating int, @review varchar(max))
as begin 
insert into ServiceReviews (userEmail, userName, serviceCenterId, Rating, review) 
values 
( @userEmail, @userName, @serviceCenterId, @Rating, @review)
end;
go

--calculating average review
---------------------------
CREATE PROCEDURE GetAverageRating @serviceCenterId varchar(30)
AS
BEGIN
    SELECT AVG(Rating) AS AverageRating
    FROM ServiceReviews
    WHERE serviceCenterId = @serviceCenterId
END;
go

--get all reviews
-----------------
create proc GetAllReviews
as
begin
select * from ServiceReviews
end;
go
