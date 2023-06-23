import { createContext, useEffect } from "react";
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

interface Props {
  children: any
}

export type context = {
  userAuth: string | null,
  setUserAuth: (userAuth: string | null) => void
}

export const UserContext = createContext<context | null>(null)

const User = ({ children }: Props) => {
  const [userAuth, setUserAuth] = useState<string | null>(null)
  const navigate = useNavigate()
  
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUserAuth(localStorage.getItem("token")?.toString() || null)
    } else {
      setUserAuth(null)
    }
  }, [localStorage])
  

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      {children}
    </UserContext.Provider>
  )
}

export default User