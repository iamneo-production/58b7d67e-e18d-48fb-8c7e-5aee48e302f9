# 58b7d67e-e18d-48fb-8c7e-5aee48e302f9
https://sonarcloud.io/summary/overall?id=examly-test_58b7d67e-e18d-48fb-8c7e-5aee48e302f9

# Project Name : DotNet_React_AE_Camera_Service_2023

# DESIGN DOCUMENT
https://docs.google.com/document/d/15xdl9qkzr5NUlxoHzpjl-smfzJY_eWkk/edit?usp=sharing&ouid=102646418630416371585&rtpof=true&sd=true

## Project Completion Status Report

#### Virtusa Batch 01 Team 05

#### Team Members

1. Manoj Deva - Team Leader, Appointment and Cart UI and APIs
2. Sai Ganga Prasuna Golakoti - Customer Dashboard UI and APIs
3. Rudra Eeswari Kalyani - Services UI and APIs
4. Shaik Khwaja Nizam Mohammad - Navbar UI and APIs
5. Meka Uday Sagar Reddy - Reviews UI and APIs
6. Sreeramula Sankeerthana - AddCenters and AdminHomePage UI and APIs
7. Sri Sai Pravallika Muddana - CustomersHomePage UI and APIs
8. Alekya Rekapalli - Login and Signup UI and APIs
9. Namratha Budithi - Customers UI and APIs
10. Durga Devi Addagalla - CenterProfile UI and APIs

## Instructions and Commands to run the project

### Login Credentials for Admin
user id: admin@gmail.com
password: Admin@123

### React Project

#### cd reactapp
To select the react project folder
#### npm install
To install the packages
#### npm start
To start the frontend in 8081 port

### DotNet Project

#### cd dotnetapp
To select the dotnet project folder
#### dotnet restore
To install the dependencies
#### dotnet run
To run the application in 8080 port
#### dotnet clean
If found any errors then run the clean command and start install and run the project again.
#### dotnet add package package_name --version 6.0
Any package if required you can install by the above command. The package that you are installing should support .Net 6.0 version.

### Database connection

#### To Work with SQLServer:
sqlcmd -U sa 
password: examlyMssql@123

  
1> create database DBName


2> go


1> use DBName


2> go


1> create table TableName(id int identity(1,1),........)


2> go

### Challenges

If there are any challenges in running the test case in the angular/ react part
Delete the node modules and reinstall them by using the command
"npm install / npm i"

If there are any challenges in running the test case in the dotnet part
use these commands:


dotnet clean


dotnet restore


dotnet run