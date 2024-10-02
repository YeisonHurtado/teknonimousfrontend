import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext, context } from '../../context/UserContext'

export const PrivateRoute = (): React.JSX.Element => {
    const { userAuth, userExpired } = useContext(UserContext) as context
    if (userExpired || !userAuth) {
        return <Navigate to="/login" />
    }

    return (
        <Outlet />
    )
}

// Protege las rutas y permite el acceso a los usuarios autenticados