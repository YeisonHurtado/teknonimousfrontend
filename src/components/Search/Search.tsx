import React, { useEffect } from 'react'
import './search.css'
import { EventInterface } from '../../interfaces/EventInterface'
import Event from '../Event/Event'

interface Props {
    events: EventInterface[],
    showEvents: boolean,
    setShowEvents: (value: boolean) => void
}

export const Search = ({ events, showEvents, setShowEvents }: Props) => {
    useEffect(() => {
        // Cierra la busqueda cuando se presiona la tecla Esc
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                setShowEvents(false)
            }
        })
    }, [])

    return (
        <div id="events_found" className={`${!showEvents && 'closed'}`}>
            <div className="control">
                <span id='close' onClick={() => setShowEvents(false)}>X</span>
            </div>
            <div id="list_events">
                {
                        events.length>0?

                        events.map((event) => {
                            return (
                                <div className="event_found" key={event._id}>
                                    <Event event={event} setShowEvents={setShowEvents} showEvents={showEvents} key={event._id} />
                                </div>
                            )
                        })
                        : <span className='noevents'>No se encontraron eventos.</span>
                }
            </div>
        </div>
    )
}
