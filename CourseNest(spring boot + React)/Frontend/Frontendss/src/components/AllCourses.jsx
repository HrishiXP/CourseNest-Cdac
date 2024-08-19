import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Product from "./Course";
import ReactPaginate from "react-paginate";
import PageNextIcon from '@rsuite/icons/PageNext';
import PagePreviousIcon from '@rsuite/icons/PagePrevious';
import swal from "sweetalert";
//import BannerVideo from "./VidCarousel";
import Footer from "./Footer";
import { Col, Row, Container, Button } from "react-bootstrap";
import SliderD from "./SliderD";

function AllCourse() {
  const [courses, setCourses] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const { coursecat, subcat } = useParams();
  const state = useSelector((state) => state);
  const [item, setItem] = useState({});
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const history = useHistory();

  const [showDialog, setShowDialog] = useState("modal fade");
  const [display, setDisplay] = useState("none");

  const showModal = (prod) => {
    console.log("Child call parent");
    setShowDialog("modal fade show");
    setDisplay("block");
    setItem(prod);
  };

  const checkItem = (courseid) => {
    return state.cart.findIndex((x) => x.courseid === courseid) < 0;
  };

  const closeDialog = () => {
    setShowDialog("modal fade");
    setDisplay("none");
  };

  const loadDataFromServer = (page = 0, pagesize = 8) => {
    axios
      .get(
        "http://localhost:8080/api/courses/paginated?page=" +
          page +
          "&pagesize=" +
          pagesize
      )
      .then((resp) => {
        console.log(resp.data.data.total);
        setCourses(resp.data.data.clist);
        setTotalPage(Math.ceil(resp.data.data.total / pagesize));
        console.log(courses);
      });
  };

  useEffect(() => {
    console.log(coursecat, subcat);
    if (coursecat !== undefined) {
      axios
        .get(
          "http://localhost:8080/api/courses/cats?cat=" +
            coursecat +
            "&subcat=" +
            subcat
        )
        .then((resp) => {
          console.log(resp.data);
          setCourses(resp.data.data);
          console.log(courses);
        });
    } else {
      loadDataFromServer();
    }
  }, [coursecat, subcat]);

  const addToCart = (item) => {
    if (sessionStorage.getItem("userid") == null) {
      swal({
        title: "Warning",
        text: "Please login first to buy product",
        icon: "warning",
        button: "ok",
      });
      history.push("/slogin");
    } else if (sessionStorage.getItem("role") !== "student") {
      swal({
        title: "Warning",
        text: "Only customers can buy products",
        icon: "warning",
        button: "ok",
      });
    } else {
      if (checkItem(item.courseid) && qty < 4) {
        showModal();
        setDisplay("none");
        setShowDialog("modal fade");
        item.qty = qty;
        dispatch({ type: "AddItem", payload: item });
        swal({
          title: "Success",
          text: "Item added to the cart successfully",
          icon: "success",
          button: "ok",
        });
      } else {
        swal({
          title: "Warning",
          text: "Maximum quantity exceeded or item already in the cart",
          icon: "warning",
          button: "ok",
        });
      }
    }
  };

  const handlePageClick = ({ selected: selectedPage }) => {
    loadDataFromServer(selectedPage);
  };

  return (
    <div className="container-fluid all-product-page">
      <div className="all-product-content">
        <div className="luxury-main-container">
          <div className="luxury-huge-text"><u>CourseNest</u></div>
          <div className="luxury-huge-text">Your Hub for</div>
          <div className="luxury-huge-text">Seamless Learning.</div>
          <div className="luxury-space-block-mini"></div>
          <div className="luxury-normal-text">Organize, Optimize, Achieve</div>
        </div>
        <div className="luxury-space-block"></div>

        {/* <BannerVideo /> */}
        <div className="luxury-space-block"></div>
        <Container className=" rounded py-5">
          <Row className="align-items-center">
            <Col md={6}>
              <div className="text-center text-md-start">
                <h2>Crack the Code to Success with CodeHelp</h2>
                <p className="mt-3">
                  Elevate your programming skills, solve challenges, and unlock
                  the world of coding possibilities.
                </p>
                {/* <Button variant="primary">View Courses</Button> */}
              </div>
            </Col>
            <Col md={6}>
              <img
                src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Programming"
                width="100%"
                style={{ maxWidth: "500px" }}
              />
            </Col>
          </Row>
        </Container>

        <Container className="mt-4 p-4  bg-gradient fs-2  rounded">
          <p>
            <strong>
              To create an intuitive, comprehensive platform that empowers
              educators and students by streamlining course administration,
              enhancing learning experiences, and fostering academic success
              through technology
            </strong>
          </p>
        </Container>


        <div className="container-fluid" style={{ width: "60%" }}>
          <div className="card bg-transparent rounded">
            <div className="card-body">
              <ReactPaginate
                previousLabel={<PagePreviousIcon />}
                nextLabel={<PageNextIcon />}
                containerClassName={"pagination"}
                pageCount={totalPage}
                onPageChange={handlePageClick}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"} />
              <div className="luxury-space-block"></div>
              <div className="row">
                {courses.map((x, index) => (
                  <React.Fragment key={x.courseid}>
                    <CourseCard course={x} showModal={showModal} />
                    {index !== courses.length - 1 && <div className="empty-space"></div>}
                  </React.Fragment>
                ))}
              </div>
              <div className="luxury-space-block"></div>
              <div className="luxury-space-block"></div>
            </div>
          </div>
          {display == "block" ? (
            <div className={showDialog} style={{ zIndex: "1000", display: display }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5>Add to Cart</h5>
                    <button onClick={closeDialog} className="close">&times;</button>
                  </div>
                  <div className="modal-body">
                    <div className="d-flex">
                      <img src={"http://localhost:8080/" + item.photo} style={{ width: "200px" }} alt={item.coursename} />
                      <div className="ml-3">
                        <h4 className="p-2 text-primary">{item.coursename}</h4>
                        {/* <h5 className="px-2">Author: {item.author}</h5> */}
                        <h5 className="px-2">Category: {item.coursecat}</h5>
                        <h5 className="px-2">instructor: {item.instructorName}</h5>
                        <h5 className="px-2">Price: &#8377; {item.price}</h5>
                        <input type="number" min="1" value={qty} onChange={e => setQty(e.target.value)} />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button onClick={e => addToCart(item)} className="btn btn-warning btn-sm">Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>) : ""}
        </div>


     
        <Footer />
      </div>
    </div>
  );
}

const CourseCard = ({ course, showModal }) => {
  return (
    <div className="col-md-3 mb-3">
      <div className="card product-card bg-white text-black">
        <img
          src={"http://localhost:8080/" + course.photo}
          className="card-img-top"
          alt={course.coursename}
        />
        <div className="card-body">
          <h5 className="card-title">{course.coursename}</h5>
          
          <p className="card-text">
            <span>Category:</span> {course.coursecat}
          </p>
          <p className="card-text">
            <span>Instructor:</span> {course.instructorName}
          </p>
          <p className="card-text">
            <span>Price:</span> &#8377; {course.price}
          </p>
          <button
            className="btn btn-warning btn-sm"
            onClick={() => showModal(course)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllCourse;

