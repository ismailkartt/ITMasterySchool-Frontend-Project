import React, { useState } from "react";
import {Form, InputGroup } from "react-bootstrap";
import { BsEarFill } from "react-icons/bs";

const PasswordInput = () => {
    const [type, setType] = useState("password");

    const handleType = () => { 
        const newType = type === "password" ? "text" : "password";
        setType(newType);
     }

  return (
    <InputGroup className="mb-3">  
      <Form.Control
        placeholder="Enter password"
        aria-label="Enter password"
        aria-describedby="basic-addon1"
      />
      <InputGroup.Text id="basic-addon1" onClick={handleType}>
      <BsEarFill/>
      </InputGroup.Text>
    </InputGroup>
  );
};

export default PasswordInput;
