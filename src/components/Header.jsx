import React, { useContext } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { tokenAuthContext } from '../Context/TokenAuth'

function Header(insdiDashBoard) {

  const { isAuthorised, setAuthorised } = useContext(tokenAuthContext)

  const navigate = useNavigate()
  const logout = () => {
    sessionStorage.clear()
    setAuthorised(false)
    navigate('/')
  }
  return (
    < >
      <Navbar style={{ zIndex: '1' }} className='card shadow top-0 position-fixed w-100'>
        <Container>
          <Navbar.Brand>
            <Link style={{ textDecoration: 'none', color: '#b8b8ff' }} className='fw-bolder' to={'/'}>Project Fair</Link>
          </Navbar.Brand>
          {insdiDashBoard &&
            <div className="ms-auto">
              <button onClick={logout} className='btn btn-link'>LogOut <i className="fa-solid fa-arrow-right-from-bracket"></i></button>
            </div>}
        </Container>
      </Navbar>
    </>
  )
}

export default Header