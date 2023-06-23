import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Article } from '../Article/Article'
import { Aside } from '../Aside/Aside'
import Contact from '../Contact/Contact'
import About from '../About/About'
import EventForm from '../Event/EventForm'
import { EventInterface } from '../../interfaces/EventInterface'
import * as eventService from '../../services/EventService'
import { Login } from '../User/Login'
import { PrivateRoute } from '../Protected/PrivateRoute'
import { PublicRoute } from '../Protected/PublicRoute'
import { Profile } from '../Profile/Profile'

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
    loadEvents()
  }, [])


  return (
    <main>
      <section className="content">
        <Routes>
          <Route path='/' element={<Article events={events}/>} />
          <Route path='/contactus' element={<Contact events={events}/>} />
          <Route path='/aboutus' element={<About events={events} />} />
          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
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
      </section>
      {/* Recibe una Props que contiene los eventos que son cargados por la función loadEvents */}
      {/* <Aside events={events} /> */}
    </main >
  )
}
export default Main