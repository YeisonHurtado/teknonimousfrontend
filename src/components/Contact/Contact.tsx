import React from 'react'
import { EventInterface } from '../../interfaces/EventInterface'
import { Aside } from '../Aside/Aside'
interface Props {
  events: EventInterface[]
}
const Contact = ({events}: Props) => {
  return (
    <>
      <div>
          Esta será la página de contacto.
          Por favor, se paciente.
      </div>
      <Aside events={events}/>
    </>
  )
}

export default Contact