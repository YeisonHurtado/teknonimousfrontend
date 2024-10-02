import axios from 'axios'
import { EventInterface } from '../interfaces/EventInterface'

const API = "http://localhost:8080"

export const getEvents = async () => {
    return await axios.get<EventInterface[]>(`${API}/events`)
}
export const getEvent = async (id: string) => {
    return await axios.get<EventInterface>(`${API}/event/${id}`)
}

export const getUpcomingEvents = async () => {
    return await axios.get<EventInterface[]>(`${API}/events/upcoming`)
}

export const getPastEvents = async () => {
    return await axios.get<EventInterface[]>(`${API}/events/past`)
}


export const getEventsLike = async (search: string) => {
    if (search) return await axios.get<EventInterface[]>(`${API}/events/search/${search}`)
    return await axios.get<EventInterface[]>(`${API}/events/search/`)
}


export const createEvent = async (event: EventInterface, token: string | null) => {
    return await axios.post(`${API}/create/event`, event, {
        headers: {
            "Content-Type": 'multipart/form-data',
            "x-access-token": token
        }
    })
}

export const updateEvent = async (id: string, event: EventInterface, token: string | null) => {
    return await axios.put(`${API}/update/event/${id}`, event, {
        headers: {
            "Content-Type": 'multipart/form-data',
            "x-access-token": token
        }
    })
}