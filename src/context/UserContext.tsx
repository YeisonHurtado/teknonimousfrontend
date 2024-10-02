import { createContext, useEffect, useCallback } from "react";
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { UserDecodeInterface } from "../interfaces/UserInterface";
import * as UserData from "../data/UserData";
import { getUser } from "../services/UserService";

interface Props {
  children: any
}

export type context = {
  userAuth: string | null,
  setUserAuth: (userAuth: string | null) => void,
  userExpired: boolean | null,
  setUserExpired: (userExpired: boolean | null) => void,
}

export const UserContext = createContext<context | null>(null)

const User = ({ children }: Props) => {
  const [userAuth, setUserAuth] = useState<string | null>(null)
  const [userExpired, setUserExpired] = useState<boolean | null>(false)

  const changeUserExpired = useCallback(async (token: string) => {
    const userTokenDecode = UserData.decodeUser(token);
    let res: any = null;
    if (userTokenDecode) {
      try {
        res = await getUser(userTokenDecode?.id, token as string);
        setUserExpired(false);
      } catch (error: any) {
        if (error.response.data.path === 'TokenExpiredError') {
          setUserExpired(true);
          console.log(error.response.data);
        }
      }
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      changeUserExpired(token)
    }

    if (userExpired) {
      setUserAuth(null)
      localStorage.removeItem("token")
    } else {
      setUserAuth(token)
    }
  }, [changeUserExpired, userExpired])


  return (
    <UserContext.Provider value={{ userAuth, setUserAuth, userExpired, setUserExpired }}>
      {children}
    </UserContext.Provider>
  )
}

export default User