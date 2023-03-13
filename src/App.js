import React from 'react'
import './App.css'
import MainPage from './components/MainPage'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import Header from './components/Header'
import CharacterModal from './components/CharacterModal'

const queryClient = new QueryClient()

// Overall, this component establishes an environment for different sub-components (Header, MainPage, CharacterModal)
// to live inside, and provides a query client for performing data requests through react-query.
function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <CharacterModal />
        <Header />
        <MainPage />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  )
}

export default App
