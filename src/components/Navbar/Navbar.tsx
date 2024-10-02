import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { EventInterface } from '../../interfaces/EventInterface';
import * as eventService from '../../services/EventService'
import { Search } from '../Search/Search';

export const Navbar = () => {
  const [eventsFound, setEventsFound] = useState<EventInterface[]>([])
  const [showEvents, setShowEvents] = useState(false)

  const loadSearchEvents = async (search: string) => {
    const res = await eventService.getEventsLike(search)
    setEventsFound(res.data)
  }

  const handleSearch = (value: string) => {
    loadSearchEvents(value)
    if (value && value.length > 0) {
      setShowEvents(true)
    } else {
      setShowEvents(false)
    }
  }
  return (
    <nav>
      <div className="input-wrapper">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search"
          onChange={(e) => { handleSearch(e.target.value) }}
        />
        <svg xmlns="http://www.w3.org/2000/svg" className="input-icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
        </svg>
      </div>
      <ul className="links">
        <li><Link to="/events">Events</Link></li>
        <li><Link to="/aboutme">About me</Link></li>
      </ul>
      <Search events={eventsFound} showEvents={showEvents} setShowEvents={setShowEvents} />
    </nav>
  )
}
