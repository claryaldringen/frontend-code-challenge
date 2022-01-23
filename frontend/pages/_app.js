import '../styles/globals.scss'

import { ApolloProvider } from '@apollo/client'
import { useReducer } from 'react'

import client from '../apollo/client'
import { ErrorNotification } from '../components/ErrorNotification/ErrorNotification'
import { ErrorContext } from '../contexts'
import { errorReducer } from '../reducers'

const App = ({ Component, pageProps }) => {
  const [state, dispatch] = useReducer(errorReducer, {})

  return (
    <ApolloProvider client={client}>
      <ErrorContext.Provider value={{ state, dispatch }}>
        <Component {...pageProps} />
        <ErrorNotification />
      </ErrorContext.Provider>
    </ApolloProvider>
  )
}

export default App
