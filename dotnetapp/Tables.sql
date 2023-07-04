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

