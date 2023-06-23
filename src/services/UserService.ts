import axios from 'axios'
import {userLoginInterface, UserInterface} from '../interfaces/UserInterface'

const API = "http://localhost:8080"

export const login =async (userLogin: userLoginInterface) => {
    return await axios.post<any>(`${API}/login`, userLogin)
}

export const getUser =async (userID: string, token: string | null) => {
    return await axios.get<UserInterface>(`${API}/user/${userID}`, {
        headers: {
            "x-access-token": token
        }
    })
}

export const getUserUpcomingEvents= async(idUser: String)=>{
    return await axios.get<UserInterface[]>(`${API}/events/upcoming/${idUser}`)
}

export const getUserPastEvents = async(idUser: String)=>{
    return await axios.get<UserInterface[]>(`${API}/events/past/${idUser}`)
}