import React, { useContext, useEffect, useState } from 'react'
import { EventInterface } from '../../interfaces/EventInterface'
import { UserInterface, userLoginInterface } from '../../interfaces/UserInterface'
import { Link, useNavigate } from 'react-router-dom'
import moment from 'moment'
import * as userData from '../../data/UserData'
import 'moment/locale/es'
import { UserContext, context } from '../../context/UserContext'


interface Props {
    event: EventInterface,
    showEvents?: boolean,
    setShowEvents?: (value: boolean) => void
}


const Event = ({ event, showEvents, setShowEvents }: Props) => {

    const initialState: EventInterface[] = []
    const navigate = useNavigate()
    const { userAuth } = useContext(UserContext) as context
    const [eventsByUser, setEventsByUser] = useState<EventInterface[]>(initialState)

    const editEventAllowed = async () => {
        if (userAuth) {
            const userDecode: any = userData.decodeUser(userAuth || "")
            const user: UserInterface | boolean | any = await userData.getOnlyUser(userDecode.id, userAuth || "")
            setEventsByUser(user.events)
        } else {
            setEventsByUser(initialState)
        }
    }

    const closeSearch = () => {
        if (setShowEvents) {
            setShowEvents(false) // false para cerra el modal
        }
    }

    const redirectToEditAllowedUser = () => {
        closeSearch()
        navigate(`/event/${event._id}`)
    }


    moment.locale('es')
    const dateE = moment(event.date, 'YYYY-MM-DDTHH:mm:ss.Z').format('DD [De] MMMM[, ]hh:mm A')

    return (
        <div className="info_event" onClick={() => redirectToEditAllowedUser()}>
            <img className="poster_event" src={`${event.poster}`} alt={`${event.name}`} />

            <div className="info_event_content">
                <div className="name_event">
                    <strong>{event.name}</strong>
                </div>
                <div className='lineup'>
                    Lineup
                    <ul className="list_artists">
                        {event.lineup?.map(item => {
                            return (
                                <li>{item.name_dj}</li>
                            )
                        })}
                    </ul>

                </div>
                <div className="date_location">
                    <div className="date_event">
                        <span>{dateE}</span>
                    </div>
                    <div className="location_event">
                        <span>{'Lugar: ' + event.location}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Event
