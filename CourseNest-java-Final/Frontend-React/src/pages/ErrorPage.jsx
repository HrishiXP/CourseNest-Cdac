import React from "react";
import Footer from "../components/Footer/Footer";
function ErrorPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>About CourseNest</h1>
      
      <p style={styles.intro}>
        Welcome to <strong>CourseNest</strong>, your ultimate solution for managing, organizing, and tracking courses effortlessly. 
        Whether you are an educational institution, corporate training center, or an individual instructor, our platform is designed to 
        simplify the way courses are created, managed, and delivered.
      </p>

      <h2 style={styles.subtitle}>Our Mission</h2>
      <p style={styles.text}>
        At <strong>CourseNest</strong>, our mission is to empower educators and learners by providing an intuitive, user-friendly platform 
        for managing all aspects of course delivery. From creating course content to tracking student progress, we aim to streamline the 
        learning process for everyone involved.
      </p>

      <h2 style={styles.subtitle}>Key Features</h2>
      <ul style={styles.featureList}>
        <li style={styles.featureItem}><strong>Course Creation:</strong> Easily create and organize course materials, quizzes, and assignments.</li>
        <li style={styles.featureItem}><strong>Student Management:</strong> Manage student enrollment, track attendance, and monitor performance.</li>
        <li style={styles.featureItem}><strong>Multi-Platform Access:</strong> Access the platform from desktop, tablet, or mobile devices.</li>
      </ul>

      <h2 style={styles.subtitle}>Meet Our Team</h2>
      <p style={styles.text}>
        Our talented and dedicated team is committed to making <strong>CourseNest</strong> the best course management platform available. 
        Meet the people who bring our vision to life:
      </p>

      <div style={styles.teamContainer}>
        {/* Team Member 1 */}
        <div style={styles.teamMember}>
          <img src="/src/assets/hrs.jpeg" alt="Hrishikesh Sapkal" style={styles.profilePic} />
          <h3 style={styles.teamName}>Hrishikesh Sapkal</h3>
         
        </div>


{/* Team Member 4 */}
<div style={styles.teamMember}>
  <img src="/src/assets/akash.jpeg" alt="Aakash Khalphande" style={styles.profilePic} />
  <h3 style={styles.teamName}>Aakash Khalphande</h3>
 
</div>

        {/* Team Member 2 */}
        <div style={styles.teamMember}>
          <img src="/src/assets/uady.jpeg" alt="Uday Narsale" style={styles.profilePic} />
          <h3 style={styles.teamName}>Uday Narsale</h3>
         
        </div>

        {/* Team Member 3 */}
        <div style={styles.teamMember}>
          <img src="/src/assets/arif.jpeg" alt="Arif Shaikh" style={styles.profilePic} />
          <h3 style={styles.teamName}>Arif Shaikh</h3>
     
          </div>


        {/* Team Member 5 */}
        <div style={styles.teamMember}>
          <img src="/src/assets/somesh.jpeg" alt="Somesh Dhavalbaje" style={styles.profilePic} />
          <h3 style={styles.teamName}>Somesh Dhavalbaje</h3>

        </div>
      </div>

      <h2 style={styles.subtitle}>Get In Touch</h2>
      <p style={styles.text}>
        We’d love to hear from you! If you have any questions, feedback, or would like to schedule a demo, feel free to reach out.
      </p>
    </div>
  );
}

const styles = {
  container: {
    padding: '30px',
    margin: '30px auto',
    backgroundColor: '#fff',
    borderRadius: '12px',
    maxWidth: '1200px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '3em',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#2C3E50',
    background: 'linear-gradient(90deg, #FF5733, #FFBD33)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  intro: {
    fontSize: '1.3em',
    lineHeight: '1.8',
    marginBottom: '20px',
    color: '#555',
  },
  subtitle: {
    fontSize: '2em',
    marginBottom: '15px',
    color: '#2980B9',
  },
  text: {
    fontSize: '1.2em',
    lineHeight: '1.8',
    marginBottom: '20px',
    color: '#666',
  },
  featureList: {
    fontSize: '1.2em',
    lineHeight: '1.8',
    marginBottom: '30px',
    color: '#555',
    paddingLeft: '20px',
  },
  featureItem: {
    marginBottom: '10px',
  },
  teamContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'nowrap',  // Ensures members stay in one row
    overflowX: 'auto',   // Allows horizontal scrolling if needed
    marginBottom: '30px',
  },
  teamMember: {
    width: '220px',
    padding: '15px',
    margin: '10px',
    borderRadius: '10px',
    backgroundColor: '#EAEAEA',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    transition: 'transform 0.2s',
  },
  profilePic: {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    marginBottom: '30px',
  },
  teamName: {
    fontSize: '1em',
    marginBottom: '5px',
    color: '#333',
  },
  teamRole: {
    fontSize: '1.2em',
    marginBottom: '10px',
    color: '#777',
  },
  teamBio: {
    fontSize: '1em',
    color: '#555',
  },
};


export default ErrorPage;
