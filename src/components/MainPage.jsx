import { useQuery } from 'react-query'
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import Chart from './Chart'
import CharactersTable from './CharactersTable'

export default function MainPage() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(50)

  const [parameters, setParameters] = useState({
    name: '',
    tvShows: '',
  })

  const {
    isLoading,
    error,
    data: disneyCharacters,
    refetch,
  } = useQuery(
    [
      'characters',
      { page, pageSize, name: parameters.name, tvShows: parameters.tvShows },
    ],
    () => {
      let url = `https://api.disneyapi.dev/characters?page=${page}&pageSize=${pageSize}`

      if (parameters.name || parameters.tvShows) {
        url = `https://api.disneyapi.dev/character?name=${parameters.name}&tvShows=${parameters.tvShows}`
      }

      return fetch(url).then((res) => res.json())
    },
    {
      //This flag tells React Query to keep and display previous data while refetching in the background,
      // which reduces perceived latency and prevents UI flickers.
      keepPreviousData: true,
    }
  )

  useEffect(() => {
    refetch()
  }, [parameters])

  const handleSearchButtonClicked = (parameters) => {
    setParameters(parameters)
  }

  const handlePageChanged = (page) => {
    setPage(page)
  }

  const handlePageSizeChanged = (pageSize) => {
    setPageSize(pageSize)
  }

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <Box sx={{ margin: 4 }}>
      <SearchBar handleSearchButtonClicked={handleSearchButtonClicked} />
      <Chart disneyCharacters={disneyCharacters.data} />
      <CharactersTable
        disneyCharacters={disneyCharacters}
        page={page}
        pageSize={pageSize}
        handlePageChanged={handlePageChanged}
        handlePageSizeChanged={handlePageSizeChanged}
      />
    </Box>
  )
}
