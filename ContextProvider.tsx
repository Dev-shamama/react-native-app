import React, { ReactNode } from 'react'
import { AuthProvider } from './context/context'

const ContextProvider = ({children}: {children: ReactNode}) => {
  return (
    <AuthProvider>
        {children}
    </AuthProvider>

  )
}

export default ContextProvider;