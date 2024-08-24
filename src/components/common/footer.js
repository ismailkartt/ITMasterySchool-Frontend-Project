import React from "react";
import { Col, Container, Image, Nav, Row } from "react-bootstrap";
import { config } from "../../helpers/config";
import "./footer.scss"

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row className="g-5">
          <Col lg={3} className="text-center text-lg-start">
            <Image
              src="/images/logo/logo-white.png"
              className="img-fluid"
              alt={config.project.name}
            />
            <p className="mt-3">{config.project.description}</p>
          </Col>
          <Col md={4} lg={3} className="text-center text-md-center">
            <h3>Quick Links</h3>
            <Nav className="flex-column">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/home2">Courses</Nav.Link>
              <Nav.Link href="/home3">Events</Nav.Link>
              <Nav.Link href="/home4">About</Nav.Link> 
              <Nav.Link href="/home5">Contact</Nav.Link> 
            </Nav>
          </Col>
          <Col md={4} lg={3} className="text-center">
            <h3>Social Links</h3>
            <Nav className="flex-column">
              <Nav.Link href={config.contact.socialMedia.facebook}>Facebook</Nav.Link>
              <Nav.Link href={config.contact.socialMedia.instagram}>Instagram</Nav.Link>
              <Nav.Link href={config.contact.socialMedia.twitter}>Twitter</Nav.Link>
              <Nav.Link href={config.contact.socialMedia.youtube}>Youtube</Nav.Link> 
              <Nav.Link href={config.contact.socialMedia.linkedin}>Linkedin</Nav.Link> 
            </Nav>
          </Col>
          <Col md={4} lg={3} className="text-center">
            <h3>Contact</h3>
            <Nav className="flex-column">
              <Nav.Link href={`tel:${config.contact.phone1}`}>{config.contact.phone1}</Nav.Link>
              <Nav.Link href={`tel:${config.contact.phone2}`}>{config.contact.phone2}</Nav.Link>
              <Nav.Link href={`mailto:${config.contact.email}`}>{config.contact.email}</Nav.Link>
              <Nav.Link href={config.contact.mapEmbedURL} target="_blank">{config.contact.address}</Nav.Link> 
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
