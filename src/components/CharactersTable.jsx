import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Box, styled, TablePagination, TableSortLabel } from '@mui/material'
import U from '../utils/utils.js'
import { useDispatch } from 'react-redux'
import { openCharacterModal } from '../features/modal/modalSlice'
import { visuallyHidden } from '@mui/utils'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'dimgray',
    color: 'gold',
    fontSize: 20,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const CharactersTable = ({
  disneyCharacters,
  page,
  pageSize,
  handlePageChanged,
  handlePageSizeChanged,
}) => {
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState()
  const dispatch = useDispatch()

  // The handleRequestSort function is responsible for sorting a column in either ascending or
  // descending order, based on the current order and orderBy values.
  // This function takes in two params:
  // event: the click event
  // property: the new column that user want to sort by
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property)
  }

  const totalPages = disneyCharacters?.totalPages || 0

  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                key="name"
                align="center"
                sortDirection={orderBy === 'name' ? order : false}
              >
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={createSortHandler('name')}
                >
                  Name
                  {orderBy === 'name' ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc'
                        ? 'sorted descending'
                        : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell align="center">
                Number of TV Shows
              </StyledTableCell>
              <StyledTableCell align="center">
                Number of Video Games
              </StyledTableCell>
              <StyledTableCell align="center">Allies</StyledTableCell>
              <StyledTableCell align="center">Enemies</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {U.stableSort(
              disneyCharacters.data,
              U.getComparator(order, orderBy)
            )
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <StyledTableRow
                    key={row.name + row._id}
                    data-testid={row.name + row._id}
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                      dispatch(
                        openCharacterModal({
                          id: row._id,
                          name: row.name,
                          imageUrl: row.imageUrl,
                          tvShows: row.tvShows,
                          videoGames: row.videoGames,
                        })
                      )
                    }
                  >
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.tvShows.length}</TableCell>
                    <TableCell align="center">
                      {row.videoGames.length}
                    </TableCell>
                    <TableCell align="center">
                      {row.allies.length > 0
                        ? row.allies.map((ally) => (
                            <TableRow
                              key={ally}
                              sx={{
                                '&:last-child td, &:last-child th': {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {ally}
                              </TableCell>
                            </TableRow>
                          ))
                        : '-'}
                    </TableCell>
                    <TableCell align="center">
                      {row.enemies.length > 0
                        ? row.enemies.map((enemy) => (
                            <TableRow
                              key={enemy}
                              sx={{
                                '&:last-child td, &:last-child th': {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {enemy}
                              </TableCell>
                            </TableRow>
                          ))
                        : '-'}
                    </TableCell>
                  </StyledTableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 50, 100, 200, 500]}
        count={pageSize * totalPages}
        page={page - 1}
        rowsPerPage={pageSize}
        onPageChange={(e, page) => handlePageChanged(page + 1)}
        onRowsPerPageChange={(e) => {
          handlePageChanged(1)
          handlePageSizeChanged(e.target.value)
        }}
      />
    </Paper>
  )
}

export default CharactersTable
