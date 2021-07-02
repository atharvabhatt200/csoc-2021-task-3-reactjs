import { useAuth } from '../context/auth'
import { noAuthReq } from '../middlewares/no_auth_required'
import { useEffect } from 'react'

export const AuthReq = (token) => {
    const {loginPage} = useAuth()
    if(token==undefined) {
        useEffect(() => {
            loginPage();
        })
    }
    else useEffect(() => {
        noAuthReq();
    })
}


