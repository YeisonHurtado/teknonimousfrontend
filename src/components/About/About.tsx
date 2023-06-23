import React from 'react'
import { Aside } from '../Aside/Aside'
import { EventInterface } from '../../interfaces/EventInterface'

interface Props {
  events: EventInterface[]
}

const About = ({events}: Props) => {
  return (
    <>
      <div>
          Aquí encontraras la información necesaria de como empieza este proyecto.
      </div>
      <Aside events={events}/>
    </>
  )
}

export default About