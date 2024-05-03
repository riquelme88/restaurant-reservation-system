import { boolean } from "zod"
import { getToday } from "../utils/getToday"

export const validateLogin = (password: string): boolean => {
    const currentPassword = getToday().split('/').join('')
    return password === currentPassword
}

export const createToken = () => {
    const currentPassword = getToday().split('/').join('')
    const currentToken = `${process.env.DEFAULT_KEY}${currentPassword}`
    return currentToken
}

export const validateToken = (token: string) => {
    const currentToken = createToken()
    return token === currentToken
}