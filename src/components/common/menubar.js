import React from 'react'
import "./menubar.scss"
import { Container, Image, Nav, Navbar, Offcanvas } from 'react-bootstrap'
import { config } from '../../helpers/config'
import { FiAperture, FiAward, FiCalendar, FiHeadphones, FiHome } from 'react-icons/fi'

const Menubar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary mb-3" sticky='top'>
          <Container>
            <Navbar.Brand href="#" title={config.project.name}><Image src='/images/logo/logo.png' className='img-fluid' alt={config.project.name}/></Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-lg`}
              aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                <Image src='/images/logo/logo.png' className='img-fluid' alt={config.project.name}/>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-center flex-grow-1 pe-3">
                  <Nav.Link href="#action1"><FiHome/> Home</Nav.Link>
                  <Nav.Link href="#action2"><FiAperture/> Courses</Nav.Link>
                  <Nav.Link href="#action3"><FiCalendar/> Events</Nav.Link>
                  <Nav.Link href="#action4"><FiAward/> About</Nav.Link>
                  <Nav.Link href="#action5"><FiHeadphones/> Contact</Nav.Link>
                </Nav>
                <a href={`tel: ${config.contact.phone1}`} className='btn btn-outline-primary'><FiHeadphones/> CALL NOW</a>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
  )
}

export default Menubar