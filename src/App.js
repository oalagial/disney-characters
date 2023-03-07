import React from 'react'
import './App.css'
import MainPage from './components/MainPage'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import Header from './components/Header'
import CharacterModal from './components/CharacterModal'

const queryClient = new QueryClient()

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
