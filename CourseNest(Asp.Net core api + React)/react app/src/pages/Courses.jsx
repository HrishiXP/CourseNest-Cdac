import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CardR from "../component/CardR";
import { fetchData } from "../service/CourseService";

export function Course() {
  const [courses, setCourse] = useState([]);

  const getCourseData = async () => {
    try {
      const res = await fetchData();
      console.log(res.data);
      setCourse(res.data.$values); // Adjusting to access the courses correctly
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    getCourseData();
  }, []);

  return (
    <>
      <Container className="mt-4 h-100vh">
        <Row>
          {courses.map((course, index) => (
            <Col key={index} sm={12} md={6} lg={4} className="mb-4">
              <CardR
                title={course.courseName} 
                desc={`Instructor: ${course.instructorName}\nFee: $${course.courseFee}\nCategory: ${course.category}`} 
                btn="Enroll"
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
