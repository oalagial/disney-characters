import React from 'react'
import { fireEvent, screen, within } from '@testing-library/react'
import { disneyCharacters } from './utils/mockData'
import CharacterModal from '../components/CharacterModal'
import { configureStore } from '@reduxjs/toolkit'
import modalReducer, { openCharacterModal } from '../features/modal/modalSlice'
import { renderWithProviders } from './utils/utils'

describe('Show modal with specific character', () => {
  const store = configureStore({
    reducer: {
      modal: modalReducer,
    },
  })

  const characterToShow = {
    _id: disneyCharacters.data[1]._id,
    name: disneyCharacters.data[1].name,
    imageUrl: disneyCharacters.data[1].imageUrl,
    tvShows: disneyCharacters.data[1].tvShows,
    videoGames: disneyCharacters.data[1].videoGames,
  }

  test('renders correctly name and image', () => {
    store.dispatch(
      openCharacterModal({
        id: characterToShow._id,
        name: characterToShow.name,
        imageUrl: characterToShow.imageUrl,
        tvShows: characterToShow.tvShows,
        videoGames: characterToShow.videoGames,
      })
    )
    const { getByText, getByRole } = renderWithProviders(<CharacterModal />, {
      store,
    })

    expect(screen.getByText(characterToShow.name)).toBeInTheDocument()
    expect(screen.getByAltText('character_image')).toBeInTheDocument()
    expect(screen.getByAltText('character_image')).toHaveAttribute(
      'src',
      characterToShow.imageUrl
    )
  })

  test('renders correctly videoGames list', () => {
    store.dispatch(
      openCharacterModal({
        id: characterToShow._id,
        name: characterToShow.name,
        imageUrl: characterToShow.imageUrl,
        tvShows: characterToShow.tvShows,
        videoGames: characterToShow.videoGames,
      })
    )
    const { getByRole } = renderWithProviders(<CharacterModal />, {
      store,
    })

    const accordionVideoGames = screen.getByTestId('accordionVideoGames')
    expect(accordionVideoGames).toBeInTheDocument()

    fireEvent.click(within(accordionVideoGames).getByRole('button'))

    const { queryAllByRole } = within(accordionVideoGames)
    const videoGames = queryAllByRole('listitem')
    expect(videoGames.length).toBe(characterToShow.videoGames.length)
    videoGames.forEach((videoGame, index) =>
      expect(videoGame.textContent).toBe(characterToShow.videoGames[index])
    )
  })

  test('renders correctly tvShows list', () => {
    store.dispatch(
      openCharacterModal({
        id: characterToShow._id,
        name: characterToShow.name,
        imageUrl: characterToShow.imageUrl,
        tvShows: characterToShow.tvShows,
        videoGames: characterToShow.videoGames,
      })
    )
    const { getByRole } = renderWithProviders(<CharacterModal />, {
      store,
    })

    const accordionTvShows = screen.getByTestId('accordionTvShows')
    expect(accordionTvShows).toBeInTheDocument()

    fireEvent.click(within(accordionTvShows).getByRole('button'))

    const { queryAllByRole } = within(accordionTvShows)
    const tvShows = queryAllByRole('listitem')
    expect(tvShows.length).toBe(characterToShow.tvShows.length)
    tvShows.forEach((tvShow, index) =>
      expect(tvShow.textContent).toBe(characterToShow.tvShows[index])
    )
  })
})
