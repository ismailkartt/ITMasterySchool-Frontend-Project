import { useFormik } from "formik";
import React from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import * as Yup from "yup";
import PasswordInput from "../common/password-input";

const LoginForm = () => {

    const initialValues = {

    }
    const validationSchema = Yup.object({})

    const onSubmit = (values) => {

    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="border-0 border-top border-5 border-primary shadow">
            <Card.Body>
              <div className="mb-3 mt-3 text-muted">
                <em>Please enter your username and password</em>
              </div>

              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <PasswordInput/>
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
