import React, { useContext, useEffect, useState } from 'react'
import * as eventService from '../../services/EventService'
import { EventInterface } from '../../interfaces/EventInterface'
import { UserInterface } from '../../interfaces/UserInterface'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import * as userData from '../../data/UserData'
import { UserContext, context } from '../../context/UserContext'
import './events.css'

interface Props {
    event: EventInterface
    user: UserInterface
}

interface ParamsEvent extends Record<string, string | string> {
    id: string
}


const Details = () => {
    // Use navigate 
    const navigate = useNavigate()
    // User context
    const { userAuth } = useContext(UserContext) as context

    // Initial states
    const initialEvent: EventInterface = {
        _id: "",
        name: "",
        lineup: [],
        date: "",
        location: "",

        poster: ""
    }

    const initialEvents: EventInterface[] = []

    // Parametros 
    const params = useParams<ParamsEvent>()
    // Id Event
    const [idEvent, setIdEvent] = useState("")
    // Link de edit
    const [allowEditLink, setAllowEditLink] = useState(false)
    //Evento
    const [event, setEvent] = useState<EventInterface>(initialEvent)

    const eventSelected = async (id: string) => {
        const res: any = await eventService.getEvent(id)
        if (res.data) {
            setEvent(res.data)
            allowEdit()
        }
    }

    const allowEdit = async () => {
        if (userAuth) {
            const userDecode = userData.decodeUser(userAuth)
            const user: UserInterface = await userData.getOnlyUser(userDecode.id, userAuth)
            const userEvents: Array<EventInterface> = user.events as EventInterface[]
            const found = userEvents.find((e: EventInterface) => e._id === event._id)
            if (found) {
                setAllowEditLink(true)
            } else {
                setAllowEditLink(false)
                console.log("No puedes editar este evento")
            }
        }
    }

    useEffect(() => {
        if (!params.id) {
            return navigate('/events')
        }
        eventSelected(params.id)
    }, [params.id, event._id])



    //const event : EventInterface | any = user.events?.find(e => e._id === params.idEvent)

    return (
        <div className="event-main-container">
            <div className="event-header">
                <div className="event-poster">
                    <div className="blur-image"></div>
                    <img src={event.poster} alt="Poster" />
                </div>
                <div className="event-title">
                    <strong>
                        {event.name}
                        {
                            allowEditLink
                            &&
                            <div className="edit-event">
                                <Link to={`/edit-event/${event._id}`} key={event._id}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64px" height="64px">
                                        <path d="M 46.193359 6.8632812 C 44.526071 6.8841256 42.877087 7.5121253 41.476562 8.9921875 A 1.0001 1.0001 0 0 0 41.464844 9.0039062 C 35.797767 15.186541 15.433594 38.771484 15.433594 38.771484 A 1.0001 1.0001 0 0 0 15.212891 39.214844 L 13.724609 46.119141 C 13.444407 46.044741 13.282976 45.914448 12.982422 45.851562 A 1.0001 1.0001 0 1 0 12.572266 47.808594 C 12.877322 47.872424 13.024969 47.994747 13.302734 48.070312 L 11.798828 55.044922 A 1.0001 1.0001 0 0 0 13.179688 56.169922 L 20.552734 52.914062 A 1.0001 1.0001 0 0 0 21.105469 51.705078 C 21.105469 51.705078 20.707279 50.481577 19.503906 49.210938 C 18.693808 48.355556 17.312325 47.523161 15.621094 46.806641 L 17.113281 39.886719 C 17.372171 39.586964 37.386514 16.413649 42.927734 10.367188 L 42.931641 10.365234 C 47.763656 5.2669134 55.892683 14.151904 52.833984 17.423828 A 1.0001 1.0001 0 0 0 52.8125 17.447266 C 52.8125 17.447266 33.986172 38.918963 27.871094 46.265625 C 27.080453 44.910156 26.064838 43.707954 25.044922 42.832031 C 24.180836 42.089939 23.883263 41.946012 23.404297 41.630859 L 45.919922 16.087891 A 1.0001 1.0001 0 1 0 44.419922 14.765625 L 21.185547 41.125 A 1.0001 1.0001 0 0 0 21.425781 42.646484 C 21.425781 42.646484 22.510357 43.291691 23.742188 44.349609 C 24.974017 45.407528 26.291404 46.87853 26.763672 48.294922 A 1.0001 1.0001 0 0 0 28.486328 48.611328 C 33.662451 42.298911 54.261719 18.826896 54.294922 18.789062 C 58.175865 14.637575 52.62664 7.3970045 46.908203 6.890625 C 46.669935 6.8695259 46.431543 6.8603035 46.193359 6.8632812 z M 15.203125 48.751953 C 16.463038 49.330995 17.469117 49.97165 18.052734 50.587891 C 18.58138 51.146087 18.53841 51.243766 18.695312 51.548828 L 14.167969 53.546875 L 15.203125 48.751953 z" />
                                    </svg>
                                </Link>
                            </div>
                            /* <div className="event-admin">
                                <span>{user.names + " " + user.surnames}</span>
                            </div> */
                        }
                    </strong>
                </div>
            </div>
            <div className="event-location">
                <strong>{event.location}</strong>
            </div>
            <div className="event-content">
                <div className="event-lineup">
                    <strong>Line up</strong>
                    <ul>
                        {
                            event.lineup.map((artist: any) => {
                                return <li key={artist.name_dj}>{artist.name_dj}</li>
                            })
                        }
                    </ul>
                </div>
                <div className="event-images">
                    <div className="event-img">
                        <img src={event.poster} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details