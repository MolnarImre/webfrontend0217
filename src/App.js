import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Nevjegy from "./sajatosztalyok/Nevjegy";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";


import { Nav, Navbar, NavDropdown} from "react-bootstrap";

import Kereses from "./sajatosztalyok/Kereses";
import Tipusok from "./sajatosztalyok/Tipusok";
import Torles from "./sajatosztalyok/Torles";
import Alkatrszek from "./sajatosztalyok/Alkatreszek";
import Torlestipus from "./sajatosztalyok/Torlestipus";
import Feltoltes from "./sajatosztalyok/Feltoltes";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      
      <div>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        
        Auto Part Shop
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
        
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/Nevjegy"} className="nav-link">
                Kezdőlap
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/Kereses"} className="nav-link">
                Keresés
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/Tipusok"} className="nav-link">
                Típusok
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/Alkatreszek"} className="nav-link">
                Alkatrészek
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/Feltoltes"} className="nav-link">
                Feltöltés
              </Link>
            </li>

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/Torles"} className="nav-link">
                  Admin alkatrész törlés
                </Link>
              </li>
            )}

              {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/Torlestipus"} className="nav-link">
                  Admin típus törlés
                </Link>
              </li>
            )}
          </div> 
        
        </Nav>
        <Nav>
        {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>

        
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/Nevjegy"]} component={Nevjegy} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/Torles" component={Torles} />
            <Route path="/Kereses" component={Kereses} />
            <Route path="/Tipusok" component={Tipusok} />
            <Route path="/Alkatreszek" component={Alkatrszek}/>
            <Route path="/Torlestipus" component={Torlestipus}/>
            <Route path="/Feltoltes" component={Feltoltes}/>

          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
