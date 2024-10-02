import React from 'react'
import { EventInterface } from '../../interfaces/EventInterface'
import './events.css'
import moment from 'moment'
import { Link } from 'react-router-dom'
interface Props {
	events: EventInterface[]
}
const Events = ({ events }: Props) => {
	moment.locale('es')
	//const dateE = events.map(event => {return moment(event.date, 'YYYY-MM-DDTHH:mm:ss.Z').format('DD [De] MMMM[, ]hh:mm A')})
	return (
		<div className='main-container'>
			<div className="title-container">
				<strong>Events</strong>
				<span>Check out upcoming techno events...</span>
			</div>
			<div className="container-events">
				{
					events.map(event => {
						return (
							<div className="event-item" key={event._id}>
								<div className="item-poster">
									<img src={event.poster} alt={event.name} />
								</div>
								<div className="item-info">
									<div className="item-date">
										<span>{moment(event.date, 'YYYY-MM-DDTHH:mm:ss.Z').format('DD [De] MMMM[, ]hh:mm A')}</span>
									</div>
									<div className="item-name">
										<Link to={`/event/${event._id}`}>{event.name}</Link>
									</div>
									<div className="item-location">
										<span>{event.location}</span>
									</div>
								</div>
							</div>
						)
					})
				}
			</div>
		</div>
	)
}

export default Events 