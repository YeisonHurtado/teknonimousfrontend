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
        navigate(`/edit-event/${event._id}`)
    }

    const redirectToEditAllowedUser = () => {
        const redirect = eventsByUser.find(e => e._id === event._id)
        if (!redirect) {
            alert("No tienes acceso a este evento.")
        } else {
            closeSearch()
        }
    }

    const navigate = useNavigate()
    moment.locale('es')
    const dateE = moment(event.date, 'YYYY-MM-DDTHH:mm:ss.Z').format('DD [De] MMMM[, ]hh:mm A')

    useEffect(() => {
        editEventAllowed()
    }, [userAuth])


    return (
        <div className="info_event" onClick={() => { redirectToEditAllowedUser() }}>
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
                {
                    eventsByUser?.map(item => {
                        if (item._id === event._id) {
                            return (
                                <div className="edit-event">
                                    <Link to={`/edit-event/${event._id}`} key={item._id}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64px" height="64px">
                                            <path d="M 46.193359 6.8632812 C 44.526071 6.8841256 42.877087 7.5121253 41.476562 8.9921875 A 1.0001 1.0001 0 0 0 41.464844 9.0039062 C 35.797767 15.186541 15.433594 38.771484 15.433594 38.771484 A 1.0001 1.0001 0 0 0 15.212891 39.214844 L 13.724609 46.119141 C 13.444407 46.044741 13.282976 45.914448 12.982422 45.851562 A 1.0001 1.0001 0 1 0 12.572266 47.808594 C 12.877322 47.872424 13.024969 47.994747 13.302734 48.070312 L 11.798828 55.044922 A 1.0001 1.0001 0 0 0 13.179688 56.169922 L 20.552734 52.914062 A 1.0001 1.0001 0 0 0 21.105469 51.705078 C 21.105469 51.705078 20.707279 50.481577 19.503906 49.210938 C 18.693808 48.355556 17.312325 47.523161 15.621094 46.806641 L 17.113281 39.886719 C 17.372171 39.586964 37.386514 16.413649 42.927734 10.367188 L 42.931641 10.365234 C 47.763656 5.2669134 55.892683 14.151904 52.833984 17.423828 A 1.0001 1.0001 0 0 0 52.8125 17.447266 C 52.8125 17.447266 33.986172 38.918963 27.871094 46.265625 C 27.080453 44.910156 26.064838 43.707954 25.044922 42.832031 C 24.180836 42.089939 23.883263 41.946012 23.404297 41.630859 L 45.919922 16.087891 A 1.0001 1.0001 0 1 0 44.419922 14.765625 L 21.185547 41.125 A 1.0001 1.0001 0 0 0 21.425781 42.646484 C 21.425781 42.646484 22.510357 43.291691 23.742188 44.349609 C 24.974017 45.407528 26.291404 46.87853 26.763672 48.294922 A 1.0001 1.0001 0 0 0 28.486328 48.611328 C 33.662451 42.298911 54.261719 18.826896 54.294922 18.789062 C 58.175865 14.637575 52.62664 7.3970045 46.908203 6.890625 C 46.669935 6.8695259 46.431543 6.8603035 46.193359 6.8632812 z M 15.203125 48.751953 C 16.463038 49.330995 17.469117 49.97165 18.052734 50.587891 C 18.58138 51.146087 18.53841 51.243766 18.695312 51.548828 L 14.167969 53.546875 L 15.203125 48.751953 z" />
                                        </svg>
                                    </Link>
                                </div>

                            )
                        }
                    })
                }
            </div>
        </div>
    )
}

export default Event
