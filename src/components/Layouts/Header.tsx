import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../Navbar/Navbar'
import EventAdd from '../Event/EventForm'
import { UserContext, context } from '../../context/UserContext'
import jwtDecode from 'jwt-decode'

const Header = () => {
  const { userAuth } = useContext(UserContext) as context
  const { setUserAuth } = useContext(UserContext) as context
  
  // Decodificar un jwt ---> const decode : any = jwtDecode(JSON.parse(localStorage.getItem("token")?.toString() || ""))

  const logout = () => {
    localStorage.removeItem("token")
    setUserAuth(null)
  }

  return (
    <header>
      <div className="title">Teknonimus</div>
      <div className="user_links">
        {userAuth && <Link className='head-link' to="/profile">Profile</Link>}
        {userAuth && <Link className='head-link' to="/post-event">Post your event</Link>}
        {userAuth && <span className='head-link' onClick={logout}>Log Out</span>}
        {!userAuth && <Link className='head-link' to="/login">Login</Link>}
      </div>
      <Navbar />
    </header>
  )
}
export default Header
