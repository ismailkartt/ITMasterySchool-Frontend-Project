import React from 'react'
import EventCard from './event-card'
import { Col, Container, Row } from 'react-bootstrap'
import events from "../../helpers/data/events.json";

const Events = () => {
  return (
    <Container>
            <Row className='row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-5'>
                {events.map((event)=>(
                    <Col key={event.id}>
                        <EventCard {...event} />
                    </Col>
                ))}
            </Row>
            </Container>  
  )
}

export default Events