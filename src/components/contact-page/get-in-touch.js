import React from "react";
import { Nav } from "react-bootstrap";
import { config } from "../../helpers/config";
import "./get-in-touch.scss"
import { FiHeadphones, FiMail, FiMapPin } from "react-icons/fi";

const GetInTouch = () => {
  return (
    <div className="get-in-touch">
      <h2>Get In Touch</h2>
      <Nav className="flex-column">
        <Nav.Link href={`tel:${config.contact.phone1}`}>
          <FiHeadphones/> {config.contact.phone1}
        </Nav.Link>
        <Nav.Link href={`tel:${config.contact.phone2}`}>
         <FiHeadphones/> {config.contact.phone2}
        </Nav.Link>
        <Nav.Link href={`mailto:${config.contact.email}`}>
        <FiMail/> {config.contact.email}
        </Nav.Link>
        <Nav.Link href={config.contact.mapURL} target="_blank">
        <FiMapPin/> {config.contact.address}
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default GetInTouch;
