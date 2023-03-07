import React from 'react'
import { render, screen, within } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../app/store'
import renderer from 'react-test-renderer'
import CharactersTable from '../components/CharactersTable'
import { disneyCharacters } from './utils/mockData'

describe('CharactersTable', () => {
  test('renders correctly', async () => {
    const { getByText, getByRole } = render(
      <Provider store={store}>
        <CharactersTable disneyCharacters={disneyCharacters} />
      </Provider>
    )

    const tableElement = screen.getByRole('table')
    expect(tableElement).toBeInTheDocument()

    const columnHeader = screen.getAllByRole('columnheader')
    expect(columnHeader[0].textContent).toBe('Name')
    expect(columnHeader[1].textContent).toBe('Number of TV Shows')
    expect(columnHeader[2].textContent).toBe('Number of Video Games')
    expect(columnHeader[3].textContent).toBe('Allies')
    expect(columnHeader[4].textContent).toBe('Enemies')
  })

  test('renders correctly all cells', async () => {
    const { getByText, getByRole, getAllByRole } = render(
      <Provider store={store}>
        <CharactersTable disneyCharacters={disneyCharacters} />
      </Provider>
    )

    const cells = screen.getAllByRole('cell')
    expect(cells[0].textContent).toBe(disneyCharacters.data[0].name)
    expect(cells[1].textContent).toBe(
      disneyCharacters.data[0].tvShows.length.toString()
    )
    expect(cells[2].textContent).toBe(
      disneyCharacters.data[0].videoGames.length.toString()
    )
  })

  test('Matches DOM Snapshot', () => {
    const domTree = renderer
      .create(
        <Provider store={store}>
          <CharactersTable
            disneyCharacters={disneyCharacters}
            page={1}
            pageSize={50}
          />
        </Provider>
      )
      .toJSON()
    expect(domTree).toMatchSnapshot()
  })
})
