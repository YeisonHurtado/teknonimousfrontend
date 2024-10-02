import React, { useEffect, useState } from 'react'
import './account.css'
import jwt from 'jwt-decode'
import { Link, useParams } from 'react-router-dom'
import { UserDecodeInterface } from '../../interfaces/UserInterface'
import { activateAccount } from '../../services/UserService'

interface Params extends Record<string, string | string> {
  token: string
}




export const Account = () => {
  const params = useParams<Params>()
  const decoded: UserDecodeInterface = jwt(params.token as string)
  const [message, setMessageAuth] = useState("")

  const activate = async (token: string) => {
    const res: any = await activateAccount(token)
    if (res) {
      setMessageAuth(res.data.mensaje)
      console.log(res)
    }
  }
  useEffect(() => {
    return () => { activate(params.token as string) }

  }, [])


  return (
    <div className='content_confirmation'>
      <header className='confirmation'>
        <strong>TEKNONIMOUS</strong>
      </header>
      <div className="info_confirmation">
        <span>
          {message}
        </span>
        <p>
          <Link to="/login">Go to login now</Link>
        </p>
      </div>
    </div>
  )
}
