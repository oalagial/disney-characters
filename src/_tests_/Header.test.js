import React from 'react'
import renderer from 'react-test-renderer'
import Header from '../components/Header'

describe('Header', () => {
  it('Matches DOM Snapshot', () => {
    const domTree = renderer.create(<Header />).toJSON()
    expect(domTree).toMatchSnapshot()
  })
})
