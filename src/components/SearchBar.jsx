import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'

const SearchBarContainer = styled.div`
  color: darkslategray;
  background-color: aliceblue;
  padding: 8px;
  border-radius: 4px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
`

const SearchBar = ({ handleSearchButtonClicked }) => {
  const [filterTvShow, setFilterTvShow] = useState('')
  const [filterName, setFilterName] = useState('')

  return (
    <SearchBarContainer>
      <div style={{ width: '40%', display: 'flex' }}>
        <TextField
          label="Search by Name"
          data-testid="name-input"
          variant="outlined"
          onChange={(e) => {
            setFilterName(e.target.value)
          }}
          sx={{ flexGrow: 1, marginLeft: '10px' }}
        />
        <TextField
          label="Search by TV Show"
          data-testid="tvShow-input"
          variant="outlined"
          onChange={(e) => {
            setFilterTvShow(e.target.value)
          }}
          sx={{ flexGrow: 1, marginLeft: '10px' }}
        />
      </div>
      <Button
        variant="contained"
        onClick={() =>
          handleSearchButtonClicked({ name: filterName, tvShows: filterTvShow })
        }
      >
        Search
      </Button>
    </SearchBarContainer>
  )
}

export default SearchBar
