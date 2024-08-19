import React, {useEffect, useState }from "react";
import {Alert, Button, Container, Table }from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import {fetchData, removeCourseById }from "../service/CourseService";
import styles from "./courselist.module.css";
import {AddCourse }from "./AddCourse";
export function CourseList() {
    const [courses, setCourses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState(0);
    const closeModal = () => {
        setShowModal(false);
    };
    // Process and flatten data to handle $ref and $id
    const processCoursesData = (data) => {
        let coursesData = [];
        if (Array.isArray(data)) {
            coursesData = data;
        }else if (data?.$values) {
            // Handle the case where data is an object with a $values array
            coursesData = data.$values;
        }
        // Flatten references if necessary
        coursesData = coursesData.map(item => {
            if (item.$ref) {
                return item; // This item is a reference, handle as needed
            }
            return item;
        });
        return coursesData;
    };
    const getCourses = async () => {
        try {
            const response = await fetchData();
            console.log("Raw API Response:", response);
            const data = response.data;
            const coursesData = processCoursesData(data);
            console.log("Processed Courses Data:", coursesData);
            if (coursesData.length > 0) {
                setCourses(coursesData);
            }else {
                console.error("No courses found or unexpected data structure:", data);
                setCourses([]); // Fallback to an empty array
            }
        }catch (error) {
            console.error("Error fetching course data:", error);
            setCourses([]); // Fallback to an empty array on error
        }
    };
    const handleYesClick = async () => {
        try {
            const response = await removeCourseById(selectedCourseId);
            console.log("Delete Response:", response);
            if (response.status === 200) {
                setShowModal(false);
                getCourses(); // Refresh the course list after deletion
                alert("Course removed successfully");
            }
        }catch (error) {
            console.error("Error deleting course:", error);
            alert("Failed to remove course");
        }
    };
    useEffect(() => {
        console.log("Initial course data fetch");
        getCourses();
    }, []);
    useEffect(() => {
        console.log("Courses state updated:", courses);
    }, [courses]);
    return (
        <>
            <Container>
                <AddCourse /> {/* Component for adding new courses */}
            </Container>
            <Container className={${styles.list}mt-4 h-100vh}>
                {courses.length > 0 ? (
                    <Table className="bg-light">
                        <thead className="text-light">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Instructor Name</th>
                                <th>Course Fees</th>
                                <th>Category ID</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course) => (
                                <tr key={course.id}>
                                    <td>{course.id}</td>
                                    <td>{course.courseName}</td>
                                    <td>{course.instructorName}</td>
                                    <td>{course.courseFee}</td>
                                    <td>{course.categoryId}</td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            style={{marginRight: "10px" }}
                                            onClick={() => {
                                                setShowModal(true);
                                                setSelectedCourseId(course.id);
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <Alert variant="danger">No Courses Exist</Alert>
                )}
                <Modal show={showModal}onHide={closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to remove course ID {selectedCourseId}?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleYesClick}>
                            Yes
                        </Button>
                        <Button variant="danger" onClick={closeModal}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
}