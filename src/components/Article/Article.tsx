import React from 'react'
import { Aside } from '../Aside/Aside'
import { EventInterface } from '../../interfaces/EventInterface'
interface Props {
    events: EventInterface[]
}
export const Article = ({events}:Props) => {
  return (
    <>
        <article>
            <div className="article_info">
                <div className="article_title">
                    <strong>WHAT IS TECHNO?</strong>
                </div>
                <div className="article_content">
                    <span>
                        If you want an exact definition go to wikipedia or search in google. 
                        But hey, from Detroit to Europe, and back to the US, it went through 
                        various areas of the underworld to bring us what it is now, a sound 
                        that is characterized by a repetitive bass, basically a loop that 
                        keeps you waiting for it to change. and that's where techno gives you 
                        that reward, very ephemeral, but enough to keep you dancing non-stop 
                        for several hours. DO NOT CONFUSE IT WITH EDM, although techno is 
                        electronic music we should not compare it with the music of David Ghetta, 
                        Mauro Picotto, Avicci, Calvin Harris or Martin Garrix, that is not techno.
                    </span>
                </div>
            </div>
        </article>
        <Aside events={events}/>
    </>
  )
}
