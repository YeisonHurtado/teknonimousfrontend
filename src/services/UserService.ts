import axios from 'axios'
import { userLoginInterface, UserInterface } from '../interfaces/UserInterface'

const API = "http://localhost:8080"

export const signup = async (user: UserInterface, token: string | null) => {
    return await axios.post(`${API}/signup`, user, {
        headers: {
            "x-access-token": token
        }
    })
}

export const guestSignup = async (user: UserInterface) => {
    return await axios.post(`${API}/guest/signup`, user)
}

export const login = async (userLogin: userLoginInterface) => {
    return await axios.post<any>(`${API}/login`, userLogin)
}

export const getUser = async (userID: string, token: string | null) => {
    return await axios.get<UserInterface>(`${API}/user/${userID}`, {
        headers: {
            "x-access-token": token
        }
    })
}

export const getUserUpcomingEvents = async (idUser: String) => {
    return await axios.get<UserInterface[]>(`${API}/events/upcoming/${idUser}`)
}

export const getUserPastEvents = async (idUser: String) => {
    return await axios.get<UserInterface[]>(`${API}/events/past/${idUser}`)
}

export const activateAccount = async (token: string) => {
    return await axios.get<any>(`${API}/activate_account/${token}`)
}

export const changeProfilePhoto = async (user: UserInterface | undefined, idUser: string, token: string | null) => {
    return await axios.put(`${API}/update/user/profile/${idUser}`, user, {
        headers: {
            "Content-Type": 'multipart/form-data',
            "x-access-token": token
        }
    })
}