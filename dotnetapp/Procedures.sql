
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
