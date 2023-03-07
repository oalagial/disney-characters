import { render, screen } from '@testing-library/react'
import SearchBar from '../components/SearchBar'
import renderer from 'react-test-renderer'

describe('SearchBar', () => {
  test('renders correctly', () => {
    render(<SearchBar />)
    const inputName = screen.getByLabelText(/Search by name/i)
    const inputTvShow = screen.getByLabelText(/Search by TV Show/i)
    const submitButtonElement = screen.getByRole('button')

    expect(inputName).toBeInTheDocument()
    expect(inputTvShow).toBeInTheDocument()
    expect(submitButtonElement).toBeInTheDocument()
  })

  it('Matches DOM Snapshot', () => {
    const domTree = renderer.create(<SearchBar />).toJSON()
    expect(domTree).toMatchSnapshot()
  })
})
