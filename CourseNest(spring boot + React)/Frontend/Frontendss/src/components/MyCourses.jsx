import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function MyCourses() {
  const instructorid = sessionStorage.getItem("id");
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/courses?id=" + instructorid)
      .then((resp) => {
        console.log(resp.data);
        setCourses(resp.data.data);
        console.log(courses);
      });
  // }, [products, sellerid]);
  }, []);

  const deleteCourse = (courseid) => {
    swal({
      title: "Delete course",
      text: "Are you sure to delete this course ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete("http://localhost:8080/api/courses/" + courseid)
          .then((resp) => {
            swal({
              title: "Success",
              text: "course deleted successfully",
              icon: "success",
              button: "ok",
            });
            axios
              .get("http://localhost:8080/api/courses?id=" + instructorid)
              .then((resp) => {
                console.log(resp.data);
                setCourses(resp.data.data);
                console.log(courses);
              });
          });
      } else {
        swal("course is not deleted!");
      }
    });
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <div className="container">
      <div className="card shadow bg-dark text-white">
        <div className="card-body">
          <h4>My Courses</h4>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Category</StyledTableCell>
                  <StyledTableCell align="center">Sub Category</StyledTableCell>
                  {/* <StyledTableCell align="center">Brand Name</StyledTableCell> */}
                  
                  <StyledTableCell align="center">Price</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses.map((x) => (
                  <StyledTableRow key={x.courseid}>
                    <StyledTableCell align="center">
                      <img
                        width="100"
                        src={"http://localhost:8080/" + x.photo}
                        className="img-thumnail mr-3"
                      />
                      {x.coursename}
                    </StyledTableCell>
                    <StyledTableCell align="center">{x.coursecat}</StyledTableCell>
                    <StyledTableCell align="center">{x.subcat}</StyledTableCell>
                    {/* <StyledTableCell align="center">{x.brand}</StyledTableCell> */}
                    
                    <StyledTableCell align="center">
                      &#8377; {x.price}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Link
                        to={"/edit/" + x.courseid}
                        className="btn btn-dark btn-sm mr-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteCourse(x.courseid)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default MyCourses;
