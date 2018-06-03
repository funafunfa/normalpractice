import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import { Nav, NavItem  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import AdminUserInterface from "./components/admin/adminUserInterface"
import TestInterface from "./components/test/testInterface"
import CreateCourse from "./components/course/createCourse"
import CourseInterface from "./components/course/courseInterface"
import Login from "./components/login/login"
import 'react-select/dist/react-select.css';
const NavBarReact = () => (<Navbar color="light" light expand="md">
    <NavbarBrand href="/">reactstrap</NavbarBrand>
    <Nav className="ml-auto" navbar>
        <NavItem>
            <NavLink href="/components/">Components</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
        </NavItem>
        <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
                Options
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem>
                    Option 1
                </DropdownItem>
                <DropdownItem>
                    Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                    Reset
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    </Nav>
</Navbar>);
const paddings = { paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,};
const BasicExample = () => (


    <Router>
        <div >
            {/*<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"/>*/}
            <Nav>
                <NavItem>
                    <NavLink><Link to={"/"}>Main</Link></NavLink>
                </NavItem>
                <NavItem>
                    <NavLink><Link to={"/test"}>Test</Link></NavLink>

                </NavItem>
                <NavItem>
                    <NavLink><Link to={"/course"}>Course</Link></NavLink>

                </NavItem>
                <NavItem>
                    <NavLink><Link to={"/admin"}>Admin</Link></NavLink>

                </NavItem>
                <NavItem>
                    <NavLink><Link to={"/login"}>login</Link></NavLink>

                </NavItem>
            </Nav>






            <hr />
            <div style ={paddings}>
            <Route exact path="/" component={Home} />
            <Route path="/admin" component={AdminUserInterface} />
            <Route path="/course" component={CourseInterface} />
            <Route path="/test" component={TestInterface} />
            <Route path="/login" component={Login} />
            </div>
        </div>
    </Router>
);

const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
);

const About = () => (
    <div>
        <h2>About</h2>
    </div>
);

const Topics = ({ match }) => (
    <div>
        <h2>Topics</h2>
        <ul>
            <li>
                <Link to={`${match.url}/rendering`}>Rendering with React</Link>
            </li>
            <li>
                <Link to={`${match.url}/components`}>Components</Link>
            </li>
            <li>
                <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
            </li>
        </ul>

        <Route path={`${match.url}/:topicId`} component={Topic} />
        <Route
            exact
            path={match.url}
            render={() => <h3>Please select a topic.</h3>}
        />
    </div>
);

const Topic = ({ match }) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
);



export default BasicExample;