
--Appointments
--------------------
--get all appointment details
----------------------------
create procedure getAllAppointments
as
begin
select * from Appointments
end;
go

==================================================================================

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
select * from AddCenters
end ;
go

==================================================================================
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
==========================================================
--Reviews
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