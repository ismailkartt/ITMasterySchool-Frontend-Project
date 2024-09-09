import React from 'react'
import { Card, CardBody, Col, Container, Row } from 'react-bootstrap'
import Map from './map'
import ContactForm from './contact-form'

const Contact = () => {
  return (
    <div className='contact'>
        <Container>
            <Card>
                <CardBody>
                    <Row>
                        <Col md={8}>
                            <ContactForm/>
                        </Col>
                        <Col md={4}>
                            
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Container>
        <Map/>
    </div>
  )
}

export default Contact