import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext, context } from '../../context/UserContext'

export const PrivateRoute = () : React.JSX.Element=> {
    const {userAuth} = useContext(UserContext) as context
    if (!localStorage.getItem("token")) return <Navigate to="/" />

    return (
        <Outlet/>
    )
}

// Protege las rutas y permite el acceso a los usuarios autenticados