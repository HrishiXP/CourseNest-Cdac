import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import productvalidation from "./cousevalidation";
import swal from "sweetalert";
import coursevalidation from "./cousevalidation";

function EditCourse() {
  const instructorid = sessionStorage.getItem("id");
  const { courseid } = useParams();
  const [course, setCourse] = useState({
    courseid: courseid,
    coursename: "",
    coursecat: "",
    price: "",
    subcat: "",
    
    instructorId: instructorid,
  });

  const [errors, setErrors] = useState({});
  const [subcategories, setSubcategories] = useState([]); // State to hold subcategories
  const history = useHistory();

  const categories = {
    IT: ["DevOps", "Developmet", "Testing"],
    "Cloud": ["AWS", "Azure"],
    "Programming": ["Java", "CPP"],
  };

  const handleInput = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCourse({ ...course, coursecat: selectedCategory, subcat: "" });
    setSubcategories(categories[selectedCategory] || []);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = coursevalidation(course);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      axios
        .put("http://localhost:8080/api/courses/" + courseid, course)
        .then((resp) => {
          swal({
            title: "Success",
            text: "Course updated successfully!",
            icon: "success",
            button: "OK",
          });
          history.push("/mycourses");
        })
        .catch((error) => {
          console.log("Error", error);
          swal({
            title: "Error",
            text: "Error while updating Course",
            icon: "error",
            button: "OK",
          });
        });
    }
  };

  useEffect(() => {
    // Fetch product data for editing
    axios.get("http://localhost:8080/api/courses/" + instructorid)
      .then((resp) => {
        console.log(resp.data.data);
        setCourse(resp.data.data);
        setSubcategories(categories[resp.data.data.coursecat] || []);
      });
  }, [courseid]);

  return (
    <div className="container">
      <div className="card shadow bg-dark text-white">
        <div className="card-body bg-dark">
          <div className="row">
            <div className="col-sm-6 mx-auto">
              <h4 className="text-center p-2">Edit Course Form</h4>
              <form onSubmit={handleSubmit}>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">Course Name</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      name="coursename"
                      value={course.coursename}
                      onChange={handleInput}
                      className="form-control"
                    />
                    {errors.coursename && (
                      <small className="text-danger float-right">{errors.coursename}</small>
                    )}
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">Category</label>
                  <div className="col-sm-8">
                    <select
                      name="courseid"
                      value={course.courseid}
                      onChange={handleCategoryChange}
                      className="form-control"
                    >
                      <option value="">Select Category</option>
                      {Object.keys(categories).map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {errors.coursecat && (
                      <small className="text-danger float-right">{errors.coursecat}</small>
                    )}
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">Sub Category</label>
                  <div className="col-sm-8">
                    <select
                      name="subcat"
                      value={course.subcat}
                      onChange={handleInput}
                      className="form-control"
                    >
                      <option value="">Select Sub Category</option>
                      {subcategories.map((subcat) => (
                        <option key={subcat} value={subcat}>
                          {subcat}
                        </option>
                      ))}
                    </select>
                    {errors.subcat && (
                      <small className="text-danger float-right">{errors.subcat}</small>
                    )}
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">Price</label>
                  <div className="col-sm-8">
                    <input
                      type="number"
                      name="price"
                      value={course.price}
                      onChange={handleInput}
                      className="form-control"
                    />
                    {errors.price && (
                      <small className="text-danger float-right">{errors.price}</small>
                    )}
                  </div>
                </div>
               
                <button type="submit" className="btn btn-warning float-right">
                  Update Course
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCourse;



