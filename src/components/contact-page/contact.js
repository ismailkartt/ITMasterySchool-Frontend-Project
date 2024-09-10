import React from 'react'
import { Card, CardBody, Col, Container, Row } from 'react-bootstrap'
import Map from './map'
import ContactForm from './contact-form'
import GetInTouch from './get-in-touch'
import "./contact.scss";

const Contact = () => {
  return (
    <div className='contact'>
        <Container>
            <Card>
                <CardBody>
                    <Row>
                        <Col lg={7}>
                            <ContactForm/>
                        </Col>
                        <Col lg={5}>
                            <GetInTouch/>
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