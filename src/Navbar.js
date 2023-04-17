import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

async function Logout() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("email");
  window.location = "/";
}

function ResponsiveNavbar({ handleLoading }) {
  let navigate = useNavigate();

  return (
    <Navbar
      className='navbar pb-0'
      collapseOnSelect
      expand='md'
      //   bg='dark'
      variant='dark'
      //   fixed='top'
      //   style={{ backgroundColor: "#0E2A47" }}
    >
      {/* <Container className='mx-1 px-1'> */}
      {/* <Navbar.Brand href='/'>React-Bootstrap</Navbar.Brand> */}

      <Navbar.Text style={{ fontSize: "calc(0.550rem + 0.5vw)" }}>
        Signed in as: <a>{sessionStorage.getItem("email")}</a>
      </Navbar.Text>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse
        id='responsive-navbar-nav'
        className='justify-content-end'
      >
        <Nav>
          <Nav.Link
            onClick={() => {
              handleLoading("true");
              navigate("/");
            }}
            href='/'
            className='btn-sm'
            style={{ color: "white", fontSize: "calc(0.450rem + 0.5vw)" }}
          >
            Tracks
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              handleLoading("true");
              navigate("/artists");
            }}
            href='/artists'
            className='btn-sm'
            style={{ color: "white", fontSize: "calc(0.450rem + 0.5vw)" }}
          >
            Artists
          </Nav.Link>
          <Nav.Link
            className='btn-sm'
            onClick={Logout}
            style={{ color: "white", fontSize: "calc(0.450rem + 0.5vw)" }}
          >
            Sign Out
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      {/* </Container> */}
    </Navbar>
  );
}

export default ResponsiveNavbar;
