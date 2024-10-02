import { useContext } from 'react'
import { UserDecodeInterface, UserInterface, userLoginInterface } from '../interfaces/UserInterface'
import * as UserService from '../services/UserService'
import jwtDecode from 'jwt-decode'
import { EventInterface } from '../interfaces/EventInterface'

export const getOnlyUser = async (id: string, token: string) => {
    const res: UserInterface | any = await UserService.getUser(id, token)

    if (!res.data) {
        return false
    }

    return res.data
}

export function decodeUser(token: string): UserDecodeInterface {
    const decode: any = jwtDecode(token)
    return decode
}

export const getUserEvents: EventInterface | any = async (id: string, token: string) => {
    const res: UserInterface | any = await UserService.getUser(id, token)
    return res.data.events
}