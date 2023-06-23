import React, { useContext, useEffect, useState } from 'react'
import jwt from 'jwt-decode'
import './profile.css'
import { UserContext, context } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { UserInterface } from '../../interfaces/UserInterface'
import moment from 'moment'
import * as userService from '../../services/UserService'
import { Link } from 'react-router-dom'
import { EventInterface } from '../../interfaces/EventInterface'

export const Profile = () => {
    const navigate = useNavigate()
    const { userAuth } = useContext(UserContext) as context
    const [selected, setSelected] = useState(true)
    const token = localStorage.getItem("token")
    const decode: any = jwt(localStorage.getItem("token")?.toString() || "")
    const [userProfile, setUserProfile] = useState<UserInterface>()
    const [events, setEvents] = useState<EventInterface[]>([])

    const loadProfile = async (userID: string) => {
        const res = await userService.getUser(userID, token)
        setUserProfile(res.data)
    }


    const loadTableEvents = async (idUser: string, time: boolean) => {
        //Pasado false, Futuro true
        if (time) {
            const res: UserInterface | any = await userService.getUserUpcomingEvents(idUser)
            setEvents(res.data.events)
        } else {
            const res: UserInterface | any = await userService.getUserPastEvents(idUser)
            setEvents(res.data.events)
        }
    }

    const timeEvents = async (choice: boolean) => {
        setSelected(choice)
        loadTableEvents(decode.id, choice)
    }

    const fullname = `${decode.names} ${decode.surnames}`

    useEffect(() => {
        loadProfile(decode.id)
        loadTableEvents(decode.id, selected)
    }, [])



    return (
        <div className='profile-container'>
            <div className="basic-profile">
                <div className="profile-photo">
                    <img src="" alt={`${fullname}`} />
                </div>
                <div className="info-profile">
                    <div className={`tag-events ${!selected ? 'selected' : ''}`} id='past-events' onClick={() => timeEvents(false)}>Past events</div>
                    <div className={`tag-events ${selected ? 'selected' : ''}`} id='upcoming-events' onClick={() => timeEvents(true)}>Upcoming events</div>
                </div>
            </div>
            <div id="user-events">
                <table className='table'>
                    <thead className='thead-dark'>
                        <th>Nombre</th>
                        <th>Fecha</th>
                        <th>Editar</th>
                    </thead>
                    {
                        events.length === 0
                            ?
                            (
                                <div className='advice-events'>
                                    NO HAY EVENTOS
                                </div>
                            )
                            :
                            (
                                <tbody>
                                    {events.map(event => {
                                        return (
                                            <tr>
                                                <td>{event.name}</td>
                                                <td>
                                                    {
                                                        moment(event.date, 'YYYY-MM-DDTHH:mm:ss.Z').format('DD [De] MMMM[, ]hh:mm A')

                                                    }
                                                </td>
                                                <td>
                                                    <Link className="user-to-edit" to={`/edit-event/${event._id}`}>Editar</Link>
                                                </td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            )}
                </table>
            </div>
        </div>
    )
}
