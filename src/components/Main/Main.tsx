import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Article } from '../Article/Article'
import { Aside } from '../Aside/Aside'
import Events from '../EventsView/Events'
import About from '../About/About'
import EventForm from '../Event/EventForm'
import { EventInterface } from '../../interfaces/EventInterface'
import * as eventService from '../../services/EventService'
import { Login } from '../User/Login'
import { Signup } from '../User/Signup'
import { PrivateRoute } from '../Protected/PrivateRoute'
import { PublicRoute } from '../Protected/PublicRoute'
import { Profile } from '../Profile/Profile'
import Details from '../EventsView/Details'

const Main = () => {
  // Guardara los eventos que hayan en la base de datos. Se eleva este useState al CONTENEDOR PRINCIPAL (MAIN)
  // para que pueda ser llamado por los componentes que generen CRUD
  const [events, setEvents] = useState<EventInterface[]>([])
  // Carga los eventos en la variable events y puede ser llamada desde cualquier componente que lo requiera
  const loadEvents = async () => {
    const res = await eventService.getUpcomingEvents()
    const sortEvents = res.data.map(evnt => {
      return {
        ...evnt,
        createdAt: evnt.createdAt ? new Date(evnt.createdAt) : new Date(),
        updatedAt: evnt.updatedAt ? new Date(evnt.updatedAt) : new Date()
      }
    }).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    setEvents(sortEvents)
  }

  useEffect(() => {
    return () => { loadEvents() }
  }, [])


  return (
    <Routes>
      <Route path='/' element={<Events events={events} />} />
      <Route path='/event/:id?' element={<Details />} />
      <Route path='/events' element={<Events events={events} />} />
      <Route path='/aboutme' element={<About />} />
      <Route path='/profile' element={<PrivateRoute />}>
        <Route path='/profile' element={<Profile />} />
      </Route>
      <Route path='/signup' element={<Signup />} />
      {/* Recibe una Props que tiene la función loadEvents */}

      <Route path='/post-event' element={<PrivateRoute />} >
        <Route path='/post-event' element={<EventForm loadEvents={loadEvents} />} />
      </Route>
      <Route path='/edit-event/:id' element={<PrivateRoute />} >
        <Route path='/edit-event/:id' element={<EventForm loadEvents={loadEvents} />} />
      </Route>
      <Route path='/login' element={<PublicRoute />} >
        <Route path='/login' element={<Login />} />
      </Route>
    </Routes>
    // {/* Recibe una Props que contiene los eventos que son cargados por la función loadEvents */}
    // {/* <Aside events={events} /> */}
  )
}
export default Main