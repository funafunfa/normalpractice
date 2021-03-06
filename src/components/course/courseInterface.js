import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';




import axios from 'axios'
import ReactCountdownClock from 'react-countdown-clock';
import { RadioGroup, RadioButton, ReversedRadioButton } from 'react-radio-buttons';
import Select from 'react-select';

import CreateCourse from "./createCourse";
// import ChangeCourse from "./changeCourse";
import AllCourses from "./allCourses";

import 'react-select/dist/react-select.css';

const BasicExample = ({ match }) => (
    <Router>
        <div >
            <Nav vertical>
                <NavItem>
                    <NavLink><Link to={`${match.url}/`}>All Courses</Link></NavLink>
                </NavItem>
                {/*<NavItem>*/}
                    {/*<NavLink><Link to={`${match.url}/changeTest`}>changeTest</Link></NavLink>*/}
                {/*</NavItem>*/}
                <NavItem>
                    <NavLink><Link to={`${match.url}/createCourse`}>createCourse</Link></NavLink>
                </NavItem>
            </Nav>


            <hr />
            <Route  exact path={`${match.url}/`} component={AllCourses} />
            {/*<Route path={`${match.url}/changeTest`} component={ChangeCourse} />*/}
            <Route path={`${match.url}/createCourse`} component={CreateCourse} />
            {/*<Route path="/topics" component={Topics} />*/}

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