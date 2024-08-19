import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RoleNavbar from "./RoleNavbar";
import Dropdown from "rsuite/Dropdown";
import "rsuite/dist/rsuite.min.css";
import MenuIcon from "@rsuite/icons/Menu";

const { Fragment } = require("react");

function NavBar() {
  const state = useSelector((state) => state);
  console.log("LoggedIn ", state.loggedin);
  console.log("Cart ", state.cart);
  return (
    <Fragment>
      <div className="clearfix"></div>
      <nav
        className="navbar navbar-expand-lg bg-white position-sticky mb-0"
        style={{ top: 0, zIndex: "1000" }}
      >
        <a href="/">
          <img
            src={"CourseNestLogo.png"}
            style={{ width: "48px", marginRight: "10px" }}
            className="float-left"
            alt="Logo"
          />
        </a>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                <i className="fa fa-fw fa-home" style={{ margin: "5px" }}></i>Home
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/about">
                About
              </a>
            </li>
            
            <li className="nav-item active">
              <Dropdown
                title="Category"
                icon={<MenuIcon />}
                appearance="subtle"
              >
                <Dropdown.Menu title="IT">
                  <Dropdown.Item>
                    <Link className="dropdown-item" to="/cat/IT/DevOps/">
                      DevOps
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link className="dropdown-item" to="/cat/IT/Development/">
                      Development
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link className="dropdown-item" to="/cat/IT/Testing/">
                     Testing
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
                <Dropdown.Menu title="Cloud">
                  <Dropdown.Item>
                    <Link className="dropdown-item" to="/cat/cloud/Aws">
                      AWS
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link className="dropdown-item" to="/cat/cloud/Azure">
                      Azure
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
                <Dropdown.Menu title="Programming">
                  <Dropdown.Item>
                    <Link className="dropdown-item" to="/cat/Programming/Java">
                      Java
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link className="dropdown-item" to="/cat/Programming/CPP">
                   CPP
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>

          <RoleNavbar isLoggedIn={state.loggedin.IsLoggedIn} />
        </div>
      </nav>
    </Fragment>
  );
}

export default NavBar;
