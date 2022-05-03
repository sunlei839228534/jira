import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as auth from "../auth-provider"
import { FullPageErrorFallback, FullPageLoading } from '../components/lib'
import { User } from '../screen/project-list/search-panel'
import { http } from '../utils/http'
import { useAsync } from '../utils/use-async'
import  * as authStore from '../store/auth.slice'

export interface AuthForm {
  username: string,
  password: string
}

export const bootstrapUser = async () => {
  let user = null
  let token = auth.getToken()
  if(token) {
    const data  = await http('me',{token})
    user = data.user
  }
  return user
}

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const {run, isLoading,isError,error,isIdle,isSuccess,data:user,setData:setUser } = useAsync<User | null>()

 const dispatch : (...args: unknown[]) => Promise<User> = useDispatch()
  useEffect(() => {
    run(dispatch(authStore.bootstrap()))
  },[])

  if(isIdle || isLoading) {
     return <FullPageLoading />
  }

  if(isError) {
    return <FullPageErrorFallback  error={error} />
  }

  return <div>
    {children}
  </div>
}

export const useAuth = () => {
  const dispatch : (...args:unknown[]) => Promise<User> = useDispatch()

  const user = useSelector(authStore.selectUser)
  const login = useCallback((form:AuthForm) => dispatch(authStore.login(form)), [dispatch]) 
  const register = useCallback((form:AuthForm) => dispatch(authStore.register(form)), [dispatch])
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch])

  return {
    user,
    login,
    register,
    logout
  }
}