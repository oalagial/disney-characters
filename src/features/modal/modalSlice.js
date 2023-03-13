import { createSlice } from '@reduxjs/toolkit'

// isCharacterModalOpen: a Boolean value indicating whether a character modal is currently open.
// shownCharacter: an object representing the character being shown in the modal.
//  If no character is currently being shown, this property is set to null.
const initialState = {
  isCharacterModalOpen: false,
  shownCharacter: null,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    /*
    "openCharacterModal", which sets the "isCharacterModalOpen" 
    flag to true and populates the "shownCharacter" object with information
    about the character being opened in the modal. This information is passed to 
    the reducer via the "payload" property of the action parameter.
    */
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
    // "closeCharacterModal", which sets both "isCharacterModalOpen" and "shownCharacter"
    // back to their initial values (false and null, respectively).
    closeCharacterModal: (state, action) => {
      state.isCharacterModalOpen = false
      state.shownCharacter = null
    },
  },
})

export const { openCharacterModal, closeCharacterModal } = modalSlice.actions

export default modalSlice.reducer
