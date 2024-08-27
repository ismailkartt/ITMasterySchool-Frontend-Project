import React from 'react'
import "./style.scss"
import { Button, Col, Container, Row } from 'react-bootstrap'
import { FaApple, FaGooglePlay } from 'react-icons/fa'

const MobileApp = () => {
  return (
    <Container className='mobile-app'>
        <div >
        <Row className='g-4'>
            <Col md={7}>
                <h1>Are you ready to start your online course</h1>
            </Col>
            <Col md={5} className='justify-content-start'>
                <Button variant='outline-warning'><FaApple/> App Store</Button>
                <Button variant='outline-warning'><FaGooglePlay/> Play Store</Button>
            </Col>
        </Row>
        </div>
    </Container>
  )
}

export default MobileApp