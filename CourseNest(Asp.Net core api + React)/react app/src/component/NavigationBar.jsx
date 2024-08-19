import { Link, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import styles from './nav.module.css';

export function Navigation() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // removeToken();
    navigate('/');
  };

  return (
    <Navbar expand="lg" className={`navbar bg-dark text-light fixed`} data-bs-theme="dark">
      <Container>
        <Navbar.Brand>
          <Link className="text-decoration-none text-light" to="/home">
            Course<span className={styles.brandGradient}>Nest</span>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link className={styles.navLink} to="/home">Home</Link>
            </Nav.Link>
            <Nav.Link>
              <Link className={styles.navLink} to="/about">About</Link>
            </Nav.Link>
            <Nav.Link>
              <Link className={styles.navLink} to="/contact">Contact Us</Link>
            </Nav.Link>
            <Nav.Link>
              <Link className={styles.navLink} to="/feedback">Feedback</Link>
            </Nav.Link>
            <Nav.Link>
              <Link className={styles.navLink} to="/course">Courses</Link>
            </Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link className="d-flex align-items-center">
              <Button type="button" onClick={handleLogout} variant="primary">
             <Link to="/login">Login</Link>
              </Button>
              <Nav.Link >
             <Link to="/cart">
             <i className="bi bi-cart text-white ms-3"></i>
              <button className="btn btn-outline-secondary ms-3" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"></path>
                </svg>
                <span className="visually-hidden">Cart</span>
              </button>
             </Link>
              </Nav.Link>
             
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
