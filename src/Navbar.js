import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";

async function Logout() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("email");
  window.location = "/";
}

function ResponsiveNavbar({ handleLoading, loading, page }) {
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
          <div
            onClick={(e) => {
              e.preventDefault();
              if (page !== "tracks") {
                handleLoading("true");
              }
              // navigate("/");
            }}
            className='btn-sm'
            style={{ color: "white", fontSize: "calc(0.450rem + 0.5vw)" }}
          >
            <Link
              to='/'
              style={{
                textDecoration: "none",
                color: loading ? "GrayText" : "white",
                pointerEvents: loading ? "none" : "",
              }}
            >
              Tracks
            </Link>
          </div>
          <div
            onClick={(e) => {
              e.preventDefault();
              if (page !== "artists") {
                handleLoading("true");
              }
              // navigate("/artists");
            }}
            className='btn-sm'
            style={{ color: "white", fontSize: "calc(0.450rem + 0.5vw)" }}
          >
            <Link
              style={{
                textDecoration: "none",
                color: loading ? "GrayText" : "white",
                pointerEvents: loading ? "none" : "",
              }}
              to='/artists'
            >
              Artists
            </Link>
          </div>
          <div
            className='btn-sm'
            onClick={Logout}
            style={{
              color: "white",
              fontSize: "calc(0.450rem + 0.5vw)",
              cursor: "pointer",
            }}
          >
            Sign Out
          </div>
        </Nav>
      </Navbar.Collapse>
      {/* </Container> */}
    </Navbar>
  );
}

export default ResponsiveNavbar;
