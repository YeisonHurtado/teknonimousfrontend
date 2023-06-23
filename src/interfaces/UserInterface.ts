import { EventInterface } from "./EventInterface";

export interface UserInterface {
    _id?: string,
    names: string,
    surnames: string,
    birth: string | Date,
    email: string,
    username: string,
    password: string,
    passwordConfirmation: string,
    roles?: Array<string>,
    events?: EventInterface[]
} 

export interface userLoginInterface {
    userOrEmail: string,
    password: string
}