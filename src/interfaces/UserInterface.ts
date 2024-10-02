import { EventInterface } from "./EventInterface";
import { RolInterface } from "./RolInterface";

export interface UserInterface {
    _id?: string,
    names: string,
    surnames: string,
    birth: string | Date,
    email: string,
    username: string,
    password: string,
    profile?: string,
    passwordConfirmation: string,
    roles: RolInterface[] | string[],
    events?: EventInterface[]
}

export interface userLoginInterface {
    userOrEmail: string,
    password: string
}

export interface UserDecodeInterface {
    id: string,
    names: string,
    surnames: string,
    email: string,
    username: string,
    roles: RolInterface[],
    userOrEmail: string
}

export interface NotAllowedLogin {
    name?: string,
    path?: string,
    message?: string,
    status?: 403
}