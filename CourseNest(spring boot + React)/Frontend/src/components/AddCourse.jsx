import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import productvalidation from "./cousevalidation";
import swal from "sweetalert";
import coursevalidation from "./cousevalidation";

function AddCourse() {
  const instructorid = sessionStorage.getItem("id");
  const [course, setCourse] = useState({
    coursename: "",
    coursecat: "",
    price: "",
    subcat: "",
    instructorId: instructorid,
  });
  const [errors, setErrors] = useState({});
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [subcategories, setSubcategories] = useState([]); // State to hold subcategories
  const history = useHistory();

  const categories = {
    IT: ["DevOps", "Devolpment", "Testing"],
    "Cloud": ["AWS", "Azure"],
    "Programming": ["Java", "CPP"],
  };

  const handleInput = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleFileInput = (e) => {
    setSelectedPhoto(e.target.files[0]);
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCourse({ ...course, coursecat: selectedCategory, subcat: "" });
    setSubcategories(categories[selectedCategory] || []);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(coursevalidation(course));
    setSubmitted(true);
  };

  useEffect(() => {
    console.log(errors);
    if (Object.keys(errors).length === 0 && submitted) {
      const formData = new FormData();
      formData.append("pic", selectedPhoto);
      formData.append("coursename", course.coursename);
      formData.append("coursecat", course.coursecat);
      formData.append("price", course.price);
      
      formData.append("subcat", course.subcat);
      formData.append("instructorId", instructorid);
      console.log(course);
      axios
        .post("http://localhost:8080/api/courses/", formData)
        .then((resp) => {
          let result = resp.data.data;
          console.log(result);
          // const msg = "saved";
          history.push("/mycourses");
          swal({
            title: "Success",
            text: "Course added successfully!",
            icon: "success",
            button: "ok",
          });
        })
        .catch((error) => {
          console.log("Error", error);
          swal({
            title: "Error",
            text: "Error saving courses",
            icon: "error",
            button: "ok",
          });
        });
    }
  }, [errors]);
// }, [submitted, errors, history, selectedPhoto, course, instructorid]);

  return (
    <div className="container">
      <div className="card shadow bg-dark text-white">
        <div className="card-body bg-dark">
          <div className="row">
            <div className="col-sm-6 mx-auto">
              <h4 className="text-center p-2">Add Course Form</h4>
              <form onSubmit={handleSubmit}>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">
                  Course Name 
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      name="coursename"
                      value={course.coursename}
                      onChange={handleInput}
                      className="form-control"
                    />
                    {errors.coursename && (
                      <small className="text-danger float-right">
                        {errors.coursename}
                      </small>
                    )}
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">
                    Category
                  </label>
                  <div className="col-sm-8">
                    <select
                      name="coursecat"
                      value={course.coursecat}
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
                      <small className="text-danger float-right">
                        {errors.coursecat}
                      </small>
                    )}
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">
                    Sub Category
                  </label>
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
                      <small className="text-danger float-right">
                        {errors.subcat}
                      </small>
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
                      <small className="text-danger float-right">
                        {errors.price}
                      </small>
                    )}
                  </div>
                </div>
                
                

                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">Photo</label>
                  <div className="col-sm-8">
                    <input
                      type="file"
                      required
                      name="photo"
                      onChange={handleFileInput}
                      className="form-control-file"
                    />
                  </div>
                </div>

                <button className="btn btn-warning float-right">
                  Add Course
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;