import React from "react";
import { motion } from "framer-motion";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import CardR from "../component/CardR";
import SliderD from "../component/SliderD";
import { Footer } from "../component/Footer";
import styles from "./home.module.css"
import {AddCourse} from "../component/AddCourse"
export function Home() {
  return (
    <>



      {/* Hero Section */}
      <Container className="mt-4 rounded py-5">
        <Row className="align-items-center">
          <Col md={6}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="text-center text-md-start">
                <h2>Crack the Code to Success with CodeHelp</h2>
                <p className="mt-3">
                  Elevate your programming skills, solve challenges, and unlock
                  the world of coding possibilities.
                </p>
                <Button variant="primary">View Courses</Button>
              </div>
            </motion.div>
          </Col>
          <Col md={6}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="d-flex justify-content-center"
            >
              <img
                src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Programming"
                width="100%"
                style={{ maxWidth: "500px" }}
              />
            </motion.div>
          </Col>
        </Row>
      </Container>

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <Container className="mt-4 p-4 bg-danger bg-gradient text-white fs-5 rounded">
          <p>
            <strong>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla,
              molestias. Deleniti omnis quam nisi asperiores, error quae modi
              aspernatur dolores aperiam tenetur vitae dolor blanditiis vel
              pariatur, eius praesentium eum ea. Accusantium, porro sapiente?
            </strong>
          </p>
        </Container>
      </motion.div>

      {/* Card Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <Container className="mt-4">
          <Row>
            <Col>
              <CardR title="1 M+ Subscribers on Youtube" />
            </Col>
            <Col>
              <CardR title="1 M+ Subscribers on Youtube"/>
            </Col>
            <Col>
              <CardR title="1 M+ Subscribers on Youtube"/>
            </Col>
          </Row>
        </Container>
      </motion.div>

      {/* Slider Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <Container className="mt-4 w-50 h-25">
          <SliderD />
        </Container>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <Container className={`text-center my-5 ${styles.ct}`}>
          <h1>30 + Courses That make you industry ready.</h1>
        </Container>


    <Container>
      <AddCourse/>
    </Container>

      </motion.div>

      {/* Footer Section */}
      <Footer />
    </>
  );
}
