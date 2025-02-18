import './App.css';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';  // Importing Dropdown from React Bootstrap
import Home from './pages/Home/Home';
import Menu from './pages/Menu/Menu';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Footer from './components/Footer/Footer';
import Profile from './pages/Profile/Profile'

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Check if JWT is in localStorage

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from localStorage
    localStorage.removeItem('customerId');
    navigate('/login'); // Redirect to login page after logout
  };

  const handleProfile = () => {
    navigate('/profile');
  };
  return (
    <div id="app">
      <Navbar expand="lg" className="fixed-top bg-body-tertiary shadow">
        <Container>
          <Navbar.Brand>
            <Link to="/" className="navbar-brand text-success d-flex align-items-center">
              <FontAwesomeIcon icon={faUtensils} size="xl" />
              <span className="ms-3 lh-1 fw-semibold">
                Wausaukee
                <br />
                Club
              </span>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="text-center" id="basiv-navbar-nav">
            <Nav className="me-auto justify-content-center w-100">
              <Link to="/" className="nav-link text-uppercase text-success text-center fw-semibold">
                Home
              </Link>
              <Link to="/menu" className="nav-link text-uppercase text-success text-center fw-semibold">
                Menu
              </Link>
              <Link to="/contact" className="nav-link text-uppercase text-success text-center fw-semibold">
                Reservations
              </Link>
              <Link to="/about" className="nav-link text-uppercase text-success text-center fw-semibold">
                About
              </Link>
            </Nav>

            {/* User Icon Dropdown */}
            <Dropdown align="end">
              <Dropdown.Toggle variant="link" className="user-icon-btn p-0">
                <img
                  src="https://img.icons8.com/?size=100&id=9ZgJRZwEc5Yj&format=png&color=198754"
                  alt="User Icon"
                  className="user-icon"
                />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {token ? (
                  <>
                    <Dropdown.Item onClick={handleProfile}>Profile</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
                  </>
                ) : (
                  <Link to="/login" className="dropdown-item">
                    Login
                  </Link> // Show Login if token does not exist
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
