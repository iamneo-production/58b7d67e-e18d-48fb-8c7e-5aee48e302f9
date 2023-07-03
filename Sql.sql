
create proc CameraServiceAdminLogin(@email varchar(100),@password varchar(100))
as
begin
if exists(select email from AdminTable where email = @email)
select email, password from AdminTable where email = @email and password = @password
else
Print 'Invalid'
end; 
go