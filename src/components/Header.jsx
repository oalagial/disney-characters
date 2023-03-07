import React from 'react'
import styled from 'styled-components'
import logo from '../assets/disney-icon-big.png'

const Header = () => {
  const HeaderContainer = styled.div`
    width: 100%;
    height: 100px;
    background-color: #0f3b84;
    display: flex;
    justify-content: center;
    align-items: center;
  `

  const HeaderTitle = styled.div`
    margin-top: 18px;
    font-size: 56px;
    color: gold;
    margin-left: 16px;
    marginright: 16px;
    font-family: 'Mouse Memoirs', sans-serif;
  `

  return (
    <HeaderContainer>
      <img src={logo} alt="Logo" />
      <HeaderTitle role="heading">Disney Characters</HeaderTitle>
    </HeaderContainer>
  )
}

export default Header
