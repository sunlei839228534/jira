import React, { ReactNode, useEffect, useState } from 'react'
import * as auth from "../auth-provider"
import { FullPageErrorFallback, FullPageLoading } from '../components/lib'
import { User } from '../screen/project-list/search-panel'
import { http } from '../utils/http'
import { useAsync } from '../utils/use-async'

const AuthContext = React.createContext<{
  user: User | null,
  register: (form:AuthForm) => Promise<void>,
  login: (form:AuthForm) => Promise<void>,
  logout: () => Promise<void>
} | undefined>(undefined)

interface AuthForm {
  username: string,
  password: string
}

export const bootStrapUser = async () => {
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

  const login = (form: AuthForm) => {
    return auth.login(form).then(setUser)
  }

  const register = (form: AuthForm) => {
    return auth.register(form).then(setUser)
  }
  const logout = () =>  auth.logout().then(() => setUser(null)) 

  useEffect(() => {
    run(bootStrapUser())
  },[])

  if(isIdle || isLoading) {
     return <FullPageLoading />
  }

  if(isError) {
    return <FullPageErrorFallback  error={error} />
  }

  return  <AuthContext.Provider children={children} value={{user,login,register,logout}}></AuthContext.Provider>
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if(!context) {
    throw new Error('必须在authprovider中使用')
  }
  return context
}