import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    const email = localStorage.getItem("email");
    return(
        email ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes