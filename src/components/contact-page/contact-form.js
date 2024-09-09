import React from "react";
import { Col, Form, InputGroup, Row } from "react-bootstrap";

const ContactForm = () => {
  return (
    <Form>
      <h2>Send me message</h2>
      <Row>
        <Col md={6}>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1"></InputGroup.Text>
            <Form.Control
              placeholder="Your name"
              aria-label="Your name"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </Col>
        <Col md={6}>
        <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1"></InputGroup.Text>
            <Form.Control
              type="email"
              placeholder="Your email"
              aria-label="Your email"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </Col>
      </Row>
      
    </Form>
  );
};

export default ContactForm;
