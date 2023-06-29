import { NavLink } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
    } from 'cdbreact';
    function Usersidebar() {

    const Logout =()=>{
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("userPage");
    } 
    return (
    <div style={{ display: 'flex', height: '100%', overflow: 'scroll initial',position:'fixed' }}>
    <CDBSidebar textColor="#fff" backgroundColor="#333" toggled={true}>
    <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
    <h4  className="text-decoration-none" style={{ color: 'inherit' }} > Menu</h4> &nbsp;
 
    </CDBSidebarHeader>
    <CDBSidebarContent className="sidebar-content">
    <CDBSidebarMenu>
    
<NavLink id='homeButton'   to="/user/Homepage" >
<CDBSidebarMenuItem icon="home" iconType="solid">Homepage</CDBSidebarMenuItem>
</NavLink>
<NavLink  id='dashBoardButton'   to="/user/Dashboard" >
<CDBSidebarMenuItem icon="th-large" iconType="solid">Dashboard</CDBSidebarMenuItem>
</NavLink>
<NavLink id='myBookingButton'  to="/user/Cart" >
<CDBSidebarMenuItem icon="shopping-cart" iconType="solid">My Cart</CDBSidebarMenuItem>
</NavLink>

<NavLink id='logoutButton' to ="/" onClick={Logout}>

<CDBSidebarMenuItem><LogoutIcon/>&nbsp;&nbsp;Logout</CDBSidebarMenuItem>
</NavLink>
</CDBSidebarMenu> 
  </CDBSidebarContent>                   
    </CDBSidebar>
    </div>
  );
};

export default Usersidebar;