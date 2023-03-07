import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Modal,
  Typography,
} from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeCharacterModal } from '../features/modal/modalSlice'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const CharacterModal = () => {
  const dispatch = useDispatch()
  const shownCharacter = useSelector((state) => state.modal.shownCharacter)
  const isCharacterModalOpen = useSelector(
    (state) => state.modal.isCharacterModalOpen
  )

  if (shownCharacter) {
    return (
      <Modal
        open={isCharacterModalOpen}
        onClose={() => {
          dispatch(closeCharacterModal({}))
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <div>
            <h2>{shownCharacter.name}</h2>
            <img src={shownCharacter.imageUrl} alt="character_image"></img>

            <Box marginBottom={8} marginTop={4}>
              <Accordion data-testid="accordionTvShows">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>TV Shows</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {shownCharacter.tvShows.length > 0 ? (
                    <ol>
                      {shownCharacter.tvShows.map((tvShow, index) => (
                        <li key={index + tvShow}>{tvShow}</li>
                      ))}
                    </ol>
                  ) : (
                    '-'
                  )}
                </AccordionDetails>
              </Accordion>
              <Accordion data-testid="accordionVideoGames">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>Video Games</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {shownCharacter.videoGames.length > 0 ? (
                    <ol>
                      {shownCharacter.videoGames.map((videoGame, index) => (
                        <li key={index + videoGame}>{videoGame}</li>
                      ))}
                    </ol>
                  ) : (
                    '-'
                  )}
                </AccordionDetails>
              </Accordion>
            </Box>
            <Button
              variant="contained"
              onClick={() => {
                dispatch(closeCharacterModal({}))
              }}
            >
              Return to list
            </Button>
          </div>
        </Box>
      </Modal>
    )
  }
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 10,
  textAlign: 'center',
}

export default CharacterModal
