/**
 * The `Adminsidebar` function is a React component that renders a sidebar menu for an admin page,
 * including options for adding a center, viewing center profiles, generating reports, managing
 * customers, viewing reviews, and logging out.
 */
import { NavLink } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
    } from 'cdbreact';

function Adminsidebar() {

    /**
     * The `Logout` function removes the "email", "username", and "adminPage" items from the browser's
     * local storage.
     */
    const Logout =()=>{
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("adminPage");
  }
    /* The `return` statement in the code is returning JSX (JavaScript XML) code. JSX is a syntax
    extension for JavaScript that allows you to write HTML-like code within JavaScript. */
    return (
        <div style={{ display: 'flex', height: '100%', overflow: 'scroll initial',position:'fixed' }}>
        <CDBSidebar textColor="#fff" backgroundColor="#333" height='100%' toggled={true}>
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
        <h4> Menu </h4> &nbsp;
     
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
        <CDBSidebarMenu>
        
    <NavLink id='adminAddCenter'   to="/admin/AddCenter" >
    <CDBSidebarMenuItem icon="home" iconType="solid">Add Center</CDBSidebarMenuItem>
    </NavLink>
    <NavLink  id='adminCenterProfile'  to="/admin/Centerprofile">
    <CDBSidebarMenuItem icon="th-large" iconType="solid">Center Profile</CDBSidebarMenuItem>
    </NavLink>
    <NavLink id='myBookingButton'  to="/admin/Service">
    <CDBSidebarMenuItem icon="sticky-note" iconType="solid">Reports</CDBSidebarMenuItem>
    </NavLink>
    <NavLink id='adminProfileView'  to="/admin/Customers">
    <CDBSidebarMenuItem icon="chart-line" iconType="solid">Customers</CDBSidebarMenuItem>
    </NavLink>
    <NavLink id='adminProfileView'  to="/admin/Review">
    <CDBSidebarMenuItem icon="comments" iconType="solid">Reviews</CDBSidebarMenuItem>
    </NavLink>
    <NavLink id='logout' to="/" onClick={Logout}>
    
    <CDBSidebarMenuItem><LogoutIcon/>&nbsp;&nbsp;Logout</CDBSidebarMenuItem>
    </NavLink>
    </CDBSidebarMenu>
      </CDBSidebarContent>                    
        </CDBSidebar>
        </div>       
      );
    };
    
export default Adminsidebar