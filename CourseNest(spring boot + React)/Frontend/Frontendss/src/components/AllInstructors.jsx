import axios from "axios";
import { useEffect, useState } from "react";
import swal from 'sweetalert';
import { styled } from '@mui/system';

const CardContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px',
  justifyContent: 'center',
});

const Card = styled('div')({
  background: '#222',
  color: 'white',
  padding: '24px',
  borderRadius: '12px',
  width: '300px',
  textAlign: 'left',
  cursor: 'pointer',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
  },
  '& h5': {
    margin: '0',
    fontWeight: 'bold',
    fontSize: '18px',
  },
  '& p': {
    margin: '8px 0',
    fontSize: '16px',
  },
  '& button': {
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '8px 0',
    width: '100%',
  },
  '& .delete-btn': {
    background: '#FF5733',
    color: 'white',
  },
  '& .show-details-btn': {
    background: '#3498db',
    color: 'white',
  },
});

function AllInstructors() {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/instructors")
      .then(resp => {
        setInstructors(resp.data.data);
      })
  }, []);

  const deleteInstructor = (id) => {
    swal({
      title: "Delete Instructor",
      text: "Are you sure to delete this Instructor?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          axios.delete(`http://localhost:8080/api/instructors/${id}`)
            .then(resp => {
              setSellers(prevInstructors => prevInstructors.filter(instructor => instructor.id !== id));
            })
          swal("Instructor has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Instructor is not deleted!");
        }
      })
  }

  const showDetails = (instructor) => {
    return swal({
      title: "Instructor Details",
      text: `Name: ${instructor.name}\nCity: ${instructor.qualification}\nUser ID: ${instructor.userid}\nPhone: ${instructor.phone}`,
      icon: "info",
      button: "Close",
    });
  }

  return (
    <div className="container-fluid text-white">
      <h4 className="p-2 text-center">Manage Instructors</h4>
      <CardContainer>
        {instructors.map((instructor) => (
          <Card key={instructor.id}>
            <h5>{instructor.name}</h5>
            <p>User ID: {instructor.userid}</p>
            <button className="show-details-btn" onClick={() => showDetails(instructor)}>Show Details</button>
            <button className="delete-btn" onClick={() => deleteInstructor(instructor.id)}>Delete</button>
          </Card>
        ))}
      </CardContainer>
    </div>
  )
}

export default AllInstructors;
