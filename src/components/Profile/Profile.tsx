import React, { useContext, useEffect, useState } from 'react'
import jwt from 'jwt-decode'
import './profile.css'
import { UserContext, context } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { UserInterface, UserDecodeInterface } from '../../interfaces/UserInterface'
import moment from 'moment'
import * as userService from '../../services/UserService'
import { Link } from 'react-router-dom'
import { EventInterface } from '../../interfaces/EventInterface'
import { ChangeProfile } from '../ChangeProfile/ChangeProfile'

export const Profile = () => {
    const navigate = useNavigate()
    const { userAuth } = useContext(UserContext) as context
    const [selected, setSelected] = useState(true)
    const token = localStorage.getItem("token")
    const decode: UserDecodeInterface = jwt(localStorage.getItem("token")?.toString() || "")
    const [userProfile, setUserProfile] = useState<UserInterface>()
    const [events, setEvents] = useState<EventInterface[]>([])
    const [stateVisible, setStateVisible] = useState<boolean>(false)

    // Abrir modal de cambio de foto de perfil.
    const controlModal = () => {
        if (stateVisible) {
            setStateVisible(false)
            loadProfile(decode.id)
        } else {
            setStateVisible(true)
        }

    }

    const loadProfile = async (userID: string) => {
        try {
            const res = await userService.getUser(userID, token);
            setUserProfile(res.data);
        } catch (error) {
            console.error("Error al cargar el perfil:", error);
        }
    };

    const loadTableEvents = async (idUser: string, time: boolean) => {
        try {
            if (time) {
                const res: UserInterface | any = await userService.getUserUpcomingEvents(idUser);
                setEvents(res.data.events);
            } else {
                const res: UserInterface | any = await userService.getUserPastEvents(idUser);
                setEvents(res.data.events);
            }
        } catch (error) {
            console.error("Error al cargar los eventos:", error);
        }
    };

    const timeEvents = async (choice: boolean) => {
        setSelected(choice)
        loadTableEvents(decode.id, choice)
    }

    const fullname = `${decode.names} ${decode.surnames}`

    useEffect(() => {
        return () => {
            loadProfile(decode.id)
            loadTableEvents(decode.id, selected)
        }
    }, [decode.id])



    return (
        <div className='profile-container'>
            <div className="basic-profile">
                <div className="profile-photo" onClick={controlModal}>
                    {
                        userProfile?.profile && (
                            <img src={userProfile.profile} />
                        )
                    }

                </div>
                <div className="name-profile">
                    {fullname}
                </div>
                {
                    decode.roles.map(rol => {
                        if (rol.name == "admin") {
                            return (<Link to="/signup" className=''>Register user</Link>)
                        }
                    })
                }
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
                                    NO EVENTS
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
            <ChangeProfile id={decode.id} user={userProfile} visible={stateVisible} src={userProfile?.profile || ""} controlModal={controlModal} />
        </div>
    )
}
