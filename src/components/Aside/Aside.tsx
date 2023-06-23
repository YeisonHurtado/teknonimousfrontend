import React from 'react'
import Event from '../Event/Event'
import {EventInterface} from '../../interfaces/EventInterface'

// Props de events
interface Props {
    events: EventInterface[]
}

// Recibe las props y muestra su contenido cuando el componente se cargue
export const Aside = ({events}: Props) => {
    return (
        <aside>
            <div className="events">
                <strong className="head_event">Upcoming events</strong>
                {events.map((event)=>{
                    return <Event event={event} key={event._id}/>
                })}
            </div>    
        </aside>
    )
}
