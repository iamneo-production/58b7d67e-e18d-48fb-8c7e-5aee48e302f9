import { Outlet, Navigate } from 'react-router-dom'

const Auth = () => {
    // let auth = {'token':true}
    const email = localStorage.getItem("email");
    return(
        email ? <Outlet/> : <Navigate to="/"/>
    )
}

export default Auth