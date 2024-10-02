import React, { useContext, useEffect, useState } from 'react'
import './index.css'
import { UserContext, context } from '../../context/UserContext'
import { UserDecodeInterface, UserInterface } from '../../interfaces/UserInterface'
import * as userService from '../../services/UserService'
import * as userData from '../../data/UserData'

interface ErrorFormUser {
    names?: string,
    surnames?: string,
    birth?: string,
    email?: string,
    username?: string,
    password?: string,
    passwordConfirmation?: string
}

export const Signup = () => {
    const roles = {
        "admin": "Administrator",
        "moderator": "Moderator",
        "user": "Usuario regular"
    }

    const initial_state = {
        names: "",
        surnames: "",
        birth: "",
        email: "",
        username: "",
        password: "",
        passwordConfirmation: "",
        roles: []
    }

    const token = localStorage.getItem("token")
    const [userDecode, setUserDecode] = useState<UserDecodeInterface | null>()
    const [newUser, setNewUser] = useState<UserInterface>(initial_state)
    const [newRoles, setNewRoles] = useState<string[]>(["user"])
    const [error, setError] = useState<ErrorFormUser>()

    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let res: any = null
        if (!token) {
            res = await userService.guestSignup(newUser).
                catch(function (err) {
                    const { path, message } = err.response.data
                    const propErr = `{ "${path}" : "${message}" }`
                    setError(JSON.parse(propErr))
                })
        } else {
            res = await userService.signup(newUser, token).
                catch(function (err) {
                    const { path, message } = err.response.data
                    const propErr = `{ "${path}" : "${message}" }`
                    setError(JSON.parse(propErr))
                })
        }

        if (res) {
            successSignup()

        }
    }

    const successSignup = () => {
        setNewUser(initial_state)
        setSuccess(true)
        setTimeout(() => {
            setSuccess(false)
        }, 3000)
    }

    const handleInputChange = (name: string, value: string) => {
        setNewUser({ ...newUser, [name]: value })
    }

    const handleCheckBox = (name: string, value: string, checked: boolean) => {
        let rolesTemp = newRoles
        if (value !== "user") {

            if (checked) {
                if (!rolesTemp.find((el: string) => el === value)) {

                    rolesTemp = [...rolesTemp, value]
                }
            } else {
                rolesTemp = rolesTemp.filter(el => el !== value)
            }
        }

        setNewRoles(rolesTemp)
        setNewUser({ ...newUser, roles: rolesTemp })
    }

    useEffect(() => {
        if (token) {
            setUserDecode(userData.decodeUser(token as string))
        } else {
            setUserDecode(null)
        }
    }, [])

    return (
        <div className="containter-signup">
            {
                <div className={`success ${success ? 'active' : ''}`}>
                    <span>Registro existoso. Revisa el correo para confirmar la cuenta.</span>
                </div>
            }
            <div className="header-signup">
                <div id="title">
                    {
                        token
                            ?
                            "Create user"
                            :
                            "Create an account"
                    }
                </div>
                {
                    token
                    &&
                    <div id="info-user">
                        <div className="user_name">
                            <span>Usuario:{"\u00A0"}</span>
                            <strong>
                                {`${userDecode?.names} ${userDecode?.surnames}`}
                            </strong>
                        </div>
                        <div className="user_rol">
                            <span>Rol:{"\u00A0"}</span>
                            <strong>
                                {userDecode?.roles.find(r => r.name === "admin") ? roles.admin : userDecode?.roles.find(r => r.name === "moderator") ? roles.moderator : roles.user}
                            </strong>
                        </div>
                    </div>
                }
            </div>
            {
                userDecode?.roles.find(r => r.name === "admin") || !token
                    ?
                    <div className="form-signup">
                        <form action="" id="signup" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <div className="validation-input">
                                    <input type="text" name="names" id="" className='form-control' placeholder='Name' onChange={e => handleInputChange(e.target.name, e.target.value)} value={newUser.names} />
                                    {error?.names && <span className='validationError'>{error.names}</span>}
                                </div>
                                <div className="validation-input">
                                    <input type="text" name="surnames" id="" className='form-control' placeholder='Surname' onChange={e => handleInputChange(e.target.name, e.target.value)} value={newUser.surnames} />
                                    {error?.surnames && <span className='validationError'>{error.surnames}</span>}
                                </div>
                            </div>
                            <div className="form-group date-group">
                                <label htmlFor="birth">Birthdate</label>
                                <input type="date" name="birth" id="birth" className='form-control' onChange={e => handleInputChange(e.target.name, e.target.value)} value={newUser.birth.toLocaleString()} />
                                {error?.birth && <span className='validationError'>{error.birth}</span>}
                            </div>
                            <div className="form-group">
                                <div className="validation-input">
                                    <input type="text" name="email" id="" className='form-control' placeholder='Email' onChange={e => handleInputChange(e.target.name, e.target.value)} value={newUser.email} />
                                    {error?.email && <span className='validationError'>{error.email}</span>}
                                </div>
                                <div className="validation-input">
                                    <input type="text" name="username" autoComplete='new-username' id="" className='form-control' placeholder='Username' onChange={e => handleInputChange(e.target.name, e.target.value)} value={newUser.username} />
                                    {error?.username && <span className='validationError'>{error.username}</span>}
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="validation-input">
                                    <input type="password" name="password" id="" autoComplete='new-password' className='form-control' placeholder='Password' onChange={e => handleInputChange(e.target.name, e.target.value)} value={newUser.password} />
                                    {error?.password && <span className='validationError'>{error.password}</span>}
                                </div>
                                <div className="validation-input">
                                    <input type="password" name="passwordConfirmation" id="" className='form-control' placeholder='Confirm password' onChange={e => handleInputChange(e.target.name, e.target.value)} value={newUser.passwordConfirmation} />
                                    {error?.passwordConfirmation && <span className='validationError'>{error.passwordConfirmation}</span>}
                                </div>
                            </div>
                            {
                                token
                                &&
                                <div className="form-group" id="input_rol">
                                    <label htmlFor="admin">
                                        Admin
                                        <input type="checkbox" name="admin" id="admin" value="admin" onChange={e => handleCheckBox(e.target.name, e.target.value, e.target.checked)} />
                                    </label>
                                    <label htmlFor="moderator">
                                        Moderator
                                        <input type="checkbox" name="moderator" id="moderator" value="moderator" onChange={e => handleCheckBox(e.target.name, e.target.value, e.target.checked)} />
                                    </label>
                                    <label htmlFor="user">
                                        User
                                        <input type="checkbox" name="user" id="user" value="user" checked onChange={e => handleCheckBox(e.target.name, e.target.value, e.target.checked)} />
                                    </label>
                                </div>
                            }
                            <div className="form-group">
                                <button type="submit" className="btn btn-success">
                                    Registrar usuario
                                </button>
                            </div>
                        </form>
                    </div>
                    :
                    <div className="protected_view"></div>
            }
        </div>
    )
}