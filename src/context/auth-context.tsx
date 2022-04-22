import React, { ReactNode, useState } from 'react'
import * as auth from "../auth-provider"

const AuthContext = React.createContext<{
  user: auth.User | null,
  register: (form:AuthForm) => Promise<void>,
  login: (form:AuthForm) => Promise<void>,
  logout: () => Promise<void>
} | undefined>(undefined)

interface AuthForm {
  username: string,
  password: string
}

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user,setUser] = useState<auth.User | null>(null)

  const login = (form: AuthForm) => {
    return auth.login(form).then(setUser)
  }

  const register = (form: AuthForm) => {
    return auth.register(form).then(setUser)
  }
  const logout = () =>  auth.logout().then(() => setUser(null)) 

  return <AuthContext.Provider children={children} value={{user,login,register,logout}}></AuthContext.Provider>
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if(!context) {
    throw new Error('必须在authprovider中使用')
  }
  return context
}