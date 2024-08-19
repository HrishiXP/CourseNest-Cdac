import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./InstructorProfile.css"; // Import the custom CSS file

function InstructorProfile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch({ type: "LogOut" });
    sessionStorage.clear();
    history.push("/");
  };

  const [user, setUser] = useState({
    id: sessionStorage.getItem("id"),
    name: "",
    qualification: "",
    userid: "",
    pwd: "",
    phone: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:8080/api/instructors/${user.id}`).then((resp) => {
      setUser(resp.data.data);
    });
  }, [user.id]);

  return (
    <div className="instructor-profile-container">
      <div className="card instructor-profile-card shadow">
        <h4 className="p-2 border-bottom border-warning instructor-profile-header">Instructor Profile Page</h4>
        <div className="p-3 instructor-profile-content">
          <h4 className="mb-4">Welcome, {user.name}</h4>
          <div className="row">
            <div className="col-md-6 instructor-profile-info">
              <p className="lead mb-3">Qualification: {user.qualification}</p>
              <p className="lead mb-3">User ID: {user.userid}</p>
              <p className="lead mb-3">Contact No: {user.phone}</p>
            </div>
            <div className="col-md-6">
              {/* Additional information or features can be added here */}
            </div>
          </div>
          <button className="btn instructor-profile-logout-btn" onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default InstructorProfile;
