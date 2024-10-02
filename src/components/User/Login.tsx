import React, { useContext, useEffect, useState } from 'react'
import * as userService from '../../services/UserService'
import { userLoginInterface, NotAllowedLogin } from '../../interfaces/UserInterface'
import { UserContext, context } from '../../context/UserContext'
import './index.css'

export const Login = () => {
    const initialState = {
        userOrEmail: "",
        password: ""
    }



    const { userAuth, setUserAuth, setUserExpired } = useContext(UserContext) as context

    const [notAllowed, setNotAllowed] = useState<NotAllowedLogin | any>()

    const [userLogin, setUserLogin] = useState<userLoginInterface>(initialState)

    const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await userService.login(userLogin)
            .catch(function (err) {
                if (err.response) {
                    setNotAllowed(err.response.data)
                }
            })
        if (res?.data.token) {
            localStorage.setItem("token", JSON.stringify(res.data.token))
            setUserExpired(false)
            setUserAuth(localStorage.getItem("token"))
        }
    }

    const handleInputChange = (name: string, value: string) => {
        setUserLogin({ ...userLogin, [name]: value })
    }

    return (
        <div className="card-form login">
            <div className="title-card-form">
                <span>Login</span>
            </div>
            <form action="" method="post" onSubmit={handleSubmitLogin} className="form-01">
                <div className="form-01-control">
                    <input
                        type="text"
                        className="form-01-input"
                        placeholder="Email or user name"
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        name='userOrEmail'
                        value={userLogin.userOrEmail}
                    />
                </div>
                <div className="form-01-control">
                    <input
                        type="password"
                        className="form-01-input"
                        placeholder="Password"
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        name='password'
                        value={userLogin.password}
                    />
                </div>
                <div className="validation_Error">
                    {notAllowed?.name && <span className='validationError'>{notAllowed.message}</span>}
                </div>
                <div className="form-01-control">
                    <button type="submit" className="form-button-primary">
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}
