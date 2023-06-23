import { useContext } from 'react'
import {UserInterface, userLoginInterface} from '../interfaces/UserInterface'
import * as UserService from '../services/UserService'
import jwtDecode from 'jwt-decode'

export const getOnlyUser =async (id: string, token: string) => {
    const res : UserInterface | any = await UserService.getUser(id, token)

    if (!res.data) {
        return false
    }

    return res.data
}

export function decodeUser (token: string): any{
    const decode: any = jwtDecode(token)
    return decode
}