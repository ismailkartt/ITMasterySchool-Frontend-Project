import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  setListRefreshToken,
  setOperation,
} from "../../../store/slices/misc-slice";
import { swalAlert } from "../../../helpers/functions/swal";
import { useFormik } from "formik";
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { isInValid, isValid } from "../../../helpers/functions/forms";
import ButtonLoader from "../../common/button-loader";
import { createStudent } from "../../../api/student-service";
import { getAllAdvisorTeachers } from "../../../api/advisor-teacher-service";

const NewStudentForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [advisorTeachers, setAdvisorTeachers] = useState([]);
  const { currentRecord } = useSelector((state) => state.misc);

  const initialValues = {
    birthDay: "",
    birthPlace: "",
    gender: "",
    name: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    ssn: "",
    fatherName: "",
    motherName: "",
    surname: "",
    username: "",
    advisorTeacherId: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    username: Yup.string().required("Required"),
    surname: Yup.string().required("Required"),
    motherName: Yup.string().required("Required"),
    fatherName: Yup.string().required("Required"),
    advisorTeacherId: Yup.number().required("Required"),
    password: Yup.string()
      .required("Required")
      .min(8, "At least 8 characters")
      .matches(/[a-z]+/g, "Onelowercase char")
      .matches(/[A-Z]+/g, "One uppercase char")
      .matches(/[\d+]+/g, "One number char"),
    confirmPassword: Yup.string()
      .required("required")
      .oneOf([Yup.ref("password")], "Password must match"),
    gender: Yup.string()
      .required("Required")
      .oneOf(["FEMALE", "MALE"], "Invalid gender"),
    birthDay: Yup.date().required("Required"),
    birthPlace: Yup.string().required("Required"),
    phoneNumber: Yup.string()
      .required("Required")
      .matches(/^\d{3}-\d{3}-\d{4}$/, "Invalid phone number format"),
    ssn: Yup.string()
      .required("Required")
      .matches(/^\d{3}-\d{2}-\d{4}$/),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const onSubmit = async (values) => {
    try {
      await createStudent(values);
      formik.resetForm();
      dispatch(setListRefreshToken(Math.random()));
      dispatch(setOperation(null));
      swalAlert("Student was created successfully", "success");
    } catch (err) {
      console.log(err);
      const errMsg = err.response.data.message;
      swalAlert(errMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    formik.resetForm();
    dispatch(setOperation(null));
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const loadAdvisorTeachers = async () => {
    try {
      const data = await getAllAdvisorTeachers();
      setAdvisorTeachers(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadAdvisorTeachers();
  }, []);

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>New Student</Card.Title>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
              <Col>
                <FloatingLabel
                  controlId="firstName"
                  label="First name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("name")}
                    isValid={isValid(formik, "name")}
                    isInvalid={isInValid(formik, "name")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.name && formik.errors.name}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="lastName"
                  label="Last name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("surname")}
                    isValid={isValid(formik, "surname")}
                    isInvalid={isInValid(formik, "surname")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.surname && formik.errors.surname}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="floatingSelect" label="Gender">
                  <Form.Select
                    aria-label="Select gender"
                    {...formik.getFieldProps("gender")}
                    isValid={isValid(formik, "gender")}
                    isInvalid={isInValid(formik, "gender")}
                  >
                    <option>Select gender</option>
                    <option value="FEMALE">Female</option>
                    <option value="MALE">Male</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.gender && formik.errors.gender}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="birthdate"
                  label="Birthdate"
                  className="mb-3"
                >
                  <Form.Control
                    type="date"
                    placeholder=""
                    {...formik.getFieldProps("birthDay")}
                    isValid={isValid(formik, "birthDay")}
                    isInvalid={isInValid(formik, "birthDay")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.birthDay && formik.errors.birthDay}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="placeofbirth"
                  label="Placeofbirth"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("birthPlace")}
                    isValid={isValid(formik, "birthPlace")}
                    isInvalid={isInValid(formik, "birthPlace")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.birthPlace && formik.errors.birthPlace}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="phone"
                  label="Phone (XXX-XXX-XXXX)"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Phone (XXX-XXX-XXXX)"
                    {...formik.getFieldProps("phoneNumber")}
                    isValid={isValid(formik, "phoneNumber")}
                    isInvalid={isInValid(formik, "phoneNumber")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.phoneNumber && formik.errors.phoneNumber}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel controlId="email" label="Email" className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder=""
                    {...formik.getFieldProps("email")}
                    isValid={isValid(formik, "email")}
                    isInvalid={isInValid(formik, "email")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.email && formik.errors.email}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="motherName"
                  label="Mother name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("motherName")}
                    isValid={isValid(formik, "motherName")}
                    isInvalid={isInValid(formik, "motherName")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.motherName && formik.errors.motherName}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="fatherName"
                  label="Father name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("fatherName")}
                    isValid={isValid(formik, "fatherName")}
                    isInvalid={isInValid(formik, "fatherName")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.fatherName && formik.errors.fatherName}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="ssn"
                  label="SSN (XXX-XX-XXXX)"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="SSN (XXX-XC-XXXX)"
                    {...formik.getFieldProps("ssn")}
                    isValid={isValid(formik, "ssn")}
                    isInvalid={isInValid(formik, "ssn")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.ssn && formik.errors.ssn}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="advisorTeacher"
                  label="Advisor Teacher"
                  className="mb-3"
                >
                  <Form.Select
                    {...formik.getFieldProps("advisorTeacherId")}
                    isValid={isValid(formik, "advisorTeacherId")}
                    isInvalid={isInValid(formik, "advisorTeacherId")}
                  >
                    <option value="">Select Teacher</option>
                    {advisorTeachers.map((item) => (
                      <option value={item.advisorTeacherId}>
                        {item.teacherName} {item.teacherSurname}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.advisorTeacherId && formik.errors.advisorTeacherId}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="username"
                  label="Username"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("username")}
                    isValid={isValid(formik, "username")}
                    isInvalid={isInValid(formik, "username")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.username && formik.errors.username}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="password"
                  label="Password"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    placeholder=""
                    {...formik.getFieldProps("password")}
                    isValid={isValid(formik, "password")}
                    isInvalid={isInValid(formik, "password")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.password && formik.errors.password}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="confirmPassword"
                  label="Confirm Password"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    placeholder=""
                    {...formik.getFieldProps("confirmPassword")}
                    isValid={isValid(formik, "confirmPassword")}
                    isInvalid={isInValid(formik, "confirmPassword")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col className="text-end">
                <Button variant="warning" type="button" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  variant="secondary"
                  type="submit"
                  disabled={!(formik.dirty && formik.isValid) || loading}
                  className="ms-3"
                >
                  {loading && <ButtonLoader />}Create
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NewStudentForm;
