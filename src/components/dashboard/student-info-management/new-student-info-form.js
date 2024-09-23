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
import { createStudent, getAllStudent } from "../../../api/student-service";
import { getAllLessonProgramsByTeacher } from "../../../api/lesson-program-service";
import { getAllEducationTerm } from "../../../api/education-term-service";

const NewStudentInfoForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [students, setStudents] = useState([]);
  const [educationTerms, setEducationTerms] = useState([]);
  const { currentRecord } = useSelector((state) => state.misc);

  const initialValues = {
    absentee: "",
    educationTermId: "",
    finalExam: "",
    infoNote: "",
    lessonId: "",
    midtermExam: "",
    studentId: "",
  };

  const validationSchema = Yup.object({
    absentee: Yup.number().required("Required"),
    educationTermId: Yup.number().required("Required"),
    finalExam: Yup.number()
      .min(0, "Minimum 0")
      .max(100, "Max 100")
      .required("Required"),
    infoNote: Yup.string().min(10, "At least 10 characters").required("Required"),
    lessonId: Yup.number().required("Required"),
    midtermExam: Yup.number()
      .min(0, "Minimum 0")
      .max(100, "Max 100")
      .required("Required"),
    studentId: Yup.number().required("Required"),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await createStudent(values);
      formik.resetForm();
      dispatch(setListRefreshToken(Math.random()));
      dispatch(setOperation(null));
      swalAlert("Student info was created successfully", "success");
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

  const loadLessons = async () => {
    try {
      const data = await getAllLessonProgramsByTeacher();
      const arr = [];

      data.forEach((day) => {
        day.lessonName.forEach((lesson) => {
          arr.push({ id: lesson.lessonId, label: lesson.lessonName });
        });
      });
      setLessons(arr);
    } catch (err) {
      console.log(err);
    }
  };

  const loadStudents = async () => {
    try {
      const data = await getAllStudent();
      setStudents(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadEducationTerms = async () => {
    try {
      const data = await getAllEducationTerm();
      setEducationTerms(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadLessons();
    loadStudents();
    loadEducationTerms();
  }, []);

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>New Student</Card.Title>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3">
              <Col>
                <FloatingLabel controlId="lesson" label="Lesson">
                  <Form.Select
                    aria-label="Select Lesson"
                    {...formik.getFieldProps("lessonId")}
                    isValid={isValid(formik, "lessonId")}
                    isInvalid={isInValid(formik, "lessonId")}
                  >
                    <option>Select Lesson</option>
                    {lessons.map((lesson) => (
                      <option key={lesson.id} value={lesson.id}>
                        {lesson.label}
                      </option>
                    ))}
                    
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.lessonId && formik.errors.lessonId}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="student" label="Student">
                  <Form.Select
                    aria-label="Select Student"
                    {...formik.getFieldProps("studentId")}
                    isValid={isValid(formik, "studentId")}
                    isInvalid={isInValid(formik, "studentId")}
                  >
                    <option>Select student</option>
                    {students.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.name} {student.surname}
                      </option>
                    ))}
                    
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.studentId && formik.errors.studentId}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel controlId="term" label="Education Term">
                  <Form.Select
                    aria-label="Select term"
                    {...formik.getFieldProps("educationTermId")}
                    isValid={isValid(formik, "educationTermId")}
                    isInvalid={isInValid(formik, "educationTermId")}
                  >
                    <option>Select term</option>
                    {educationTerms.map((term) => (
                      <option key={term.id} value={term.id}>
                        {term.term} {term.startDate}
                      </option>
                    ))}
                    
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.educationTermId && formik.errors.educationTermId}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="absentee"
                  label="Absentee"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    placeholder=""
                    {...formik.getFieldProps("absentee")}
                    isValid={isValid(formik, "absentee")}
                    isInvalid={isInValid(formik, "absentee")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.absentee && formik.errors.absentee}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="midtermExam"
                  label="Midterm Exam"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    placeholder=""
                    {...formik.getFieldProps("midtermExam")}
                    isValid={isValid(formik, "midtermExam")}
                    isInvalid={isInValid(formik, "midtermExam")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.midtermExam && formik.errors.midtermExam}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="finalExam"
                  label="Final Exam"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    placeholder=""
                    {...formik.getFieldProps("finalExam")}
                    isValid={isValid(formik, "finalExam")}
                    isInvalid={isInValid(formik, "finalExam")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.finalExam && formik.errors.finalExam}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="infoNote"
                  label="Info Note"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("infoNote")}
                    isValid={isValid(formik, "infoNote")}
                    isInvalid={isInValid(formik, "infoNote")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.infoNote && formik.errors.infoNote}
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

export default NewStudentInfoForm;
