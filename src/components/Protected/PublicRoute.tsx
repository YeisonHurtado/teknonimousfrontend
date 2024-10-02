import React, { useContext } from 'react'
import { UserContext, context } from '../../context/UserContext'
import { Navigate, Outlet } from 'react-router-dom'

export const PublicRoute = () => {
    const { userAuth } = useContext(UserContext) as context

    if (userAuth) {
        return <Navigate to='/profile' />
    }

    return (
        <Outlet />
    )
}
