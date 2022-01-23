import { createContext, useContext } from 'react'

export const ErrorContext = createContext()

export const useErrorContext = () => useContext(ErrorContext)
