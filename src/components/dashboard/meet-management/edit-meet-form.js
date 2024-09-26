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
import { createMeet, updateMeet } from "../../../api/meet-service";
import { getAllStudent } from "../../../api/student-service";
import { MultiSelect } from "primereact/multiselect";
import { formatTime } from "../../../helpers/functions/date-time";

const EditMeetForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const {currentRecord} = useSelector((state) => state.misc);


  const initialValues = {
    ...currentRecord,
    studentIds: []
  };

  const validationSchema = Yup.object({
    description: Yup.string().min(2,"Min 2 chars").max(16,"Max 2 chars").required("Required"),
    startTime: Yup.string().required("Required"),
    stopTime: Yup.string().required("Required"),
    date: Yup.date().required("Required"),
    studentIds: Yup.array().min(1,"Required").required("Required"),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    const payload = {
      ...values,
      startTime: formatTime(values.startTime),
      stopTime: formatTime(values.stopTime),
    }
    try {
      await updateMeet(payload);
      formik.resetForm();
      dispatch(setListRefreshToken(Math.random()));
      dispatch(setOperation(null));
      swalAlert("Meet was updated successfully", "success");
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
    enableReinitialize: true
  });

  const loadStudents = async () => {
    try {
      const data = await getAllStudent();
      const arr = data.map((item) => ({id: item.id, name: `${item.name} ${item.surname}`}))
      setStudents(arr);
    } catch (err) {
      console.log(err);
    }
  };

  const loadCurrentStudents = () => { 
    const currentStudents = currentRecord.students.map((item) => item.id);
    formik.setFieldValue("studentIds",currentStudents);
   }

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    loadCurrentStudents();
  }, [currentRecord]);


  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Edit Student</Card.Title>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
              <Col>
              <MultiSelect
                  value={formik.values.studentIds}
                  onChange={(e) =>
                    formik.setFieldValue("studentIds", e.value)
                  }
                  options={students}
                  display="chip"
                  placeholder="Select students"
                  className="w-full"
                  optionValue="id"
                  optionLabel="name"
                  style={{
                    width: "100%",
                  }}
                  panelStyle={{
                    maxWidth: "100%",
                  }}
                />
              </Col>
              <Col>
                <FloatingLabel
                  controlId="date"
                  label="Date"
                  className="mb-3"
                >
                  <Form.Control
                    type="date"
                    placeholder=""
                    {...formik.getFieldProps("date")}
                    isValid={isValid(formik, "date")}
                    isInvalid={isInValid(formik, "date")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.date && formik.errors.date}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="startTime"
                  label="Start Time"
                  className="mb-3"
                >
                  <Form.Control
                    type="time"
                    placeholder=""
                    {...formik.getFieldProps("startTime")}
                    isValid={isValid(formik, "startTime")}
                    isInvalid={isInValid(formik, "startTime")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.startTime && formik.errors.startTime}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="stopTime"
                  label="Stop Time"
                  className="mb-3"
                >
                  <Form.Control
                    type="time"
                    placeholder=""
                    {...formik.getFieldProps("stopTime")}
                    isValid={isValid(formik, "stopTime")}
                    isInvalid={isInValid(formik, "stopTime")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.stopTime && formik.errors.stopTime}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="description"
                  label="Description"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("description")}
                    isValid={isValid(formik, "description")}
                    isInvalid={isInValid(formik, "description")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.description && formik.errors.description}
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
                  {loading && <ButtonLoader />}Update
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditMeetForm;
