import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isCharacterModalOpen: false,
  shownCharacter: null,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openCharacterModal: (state, action) => {
      state.isCharacterModalOpen = true
      state.shownCharacter = {
        id: action.payload.id,
        name: action.payload.name,
        imageUrl: action.payload.imageUrl,
        tvShows: action.payload.tvShows,
        videoGames: action.payload.videoGames,
      }
    },
    closeCharacterModal: (state, action) => {
      state.isCharacterModalOpen = false
      state.shownCharacter = null
    },
  },
})

export const { openCharacterModal, closeCharacterModal } = modalSlice.actions

export default modalSlice.reducer
