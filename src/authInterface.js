import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from "./App";
// import registerServiceWorker from './registerServiceWorker';
// import Login from './components/testAuth/Login';
// import Login from "/src/components/testAuth/login"
import Login from "./components/newAuth/login"
import CreateCourse from "./components/course/createCourse"
import ChangeCourse from "./components/course/changeCourse"
import Test from "./components/newAuth/test"
import User from "./components/user/userInfo"
import Take from "./components/course/takeACourse"
import AllCourses from "./components/course/allCourses"
import TakeCourse from "./components/course/takeACourse"
import Register from "./components/newAuth/register"
import DoTest from "./components/test/doTest"
import LookUp from "./components/course/myCourseResults"
import Admin from "./components/admin/adminCreateUser"
import AdminUsers from "./components/admin/adminUsers"
import TestRoute from "./components/test/route"
import ezUser from "./components/test/ezRouterUser"
import ezTeacher from "./components/test/ezRouterTeacher"
import ezAdmin from "./components/test/ezRouterAdmin"
import ezRouter from "./components/test/ezRouter"
// import Register from "/src/components/testAuth/register"
// import Register from './components/testAuth/Register';
class YeaUser extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(<div>YeaUser</div>);
    }
}
class YeaAdmin extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(<div>YeaAdmin</div>);
    }
}
class YeaTeacher extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(<div>YeaTeacher</div>);
    }
}
class authInterface extends Component {
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
        console.log(localStorage.getItem("role"));

    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
render(){
    return(
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">tanya</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {/*<NavItem>*/}
                            {/*<NavLink href="/components/">Components</NavLink>*/}
                        {/*</NavItem>*/}
                        {/*<NavItem>*/}
                            {/*<NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>*/}
                        {/*</NavItem>*/}
                        {/*<UncontrolledDropdown nav inNavbar>*/}
                            {/*<DropdownToggle nav caret>*/}
                                {/*Options*/}
                            {/*</DropdownToggle>*/}
                            {/*<DropdownMenu right>*/}
                                {/*<DropdownItem>*/}
                                    {/*Option 1*/}
                                {/*</DropdownItem>*/}
                                {/*<DropdownItem>*/}
                                    {/*Option 2*/}
                                {/*</DropdownItem>*/}
                                {/*<DropdownItem divider />*/}
                                {/*<DropdownItem>*/}
                                    {/*Reset*/}
                                {/*</DropdownItem>*/}
                            {/*</DropdownMenu>*/}
                        {/*</UncontrolledDropdown>*/}
                        <NavItem>
                            <NavLink href="/logout">Logout</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
            <Router>
        <div>
            {/*<Route path='/main' component={TestRoute} />*/}
            <PrivateRouteUser path='/student' component={ezUser} />
            <PrivateRouteTeacher path='/teacher' component={ezTeacher} />
            <PrivateRouteAdmin path='/admin' component={ezAdmin} />
            {/*<Route path='/' component={ezRouter} />*/}
            {/*<Route path='/student' component={ezUser} />*/}
            {/*<Route path='/teacher' component={ezTeacher} />*/}
            {/*<Route path='/admin' component={ezAdmin} />*/}
            {/*<PrivateRoute path='/admin' component={ez} />*/}
            {/*<Route path='/allCourses' component={AllCourses} />*/}
            {/*<Route path='/createCourse' component={CreateCourse} />*/}
            {/*<Route path='/changeCourse' component={ChangeCourse} />*/}
            {/*<Route path='/takeCourse' component={TakeCourse} />*/}
            {/*<Route path='/doTest' component={DoTest} />*/}
            {/*<Route path='/lookUp' component={LookUp} />*/}
            {/*<Route path='/admin' component={Admin} />*/}
            {/*<Route path='/adminUsers' component={AdminUsers} />*/}
            {/*<Route path='/testRouter' component={TestRoute} />*/}
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/logout' component={logout} />
        </div>
    </Router>
        </div>);
};



}
const logout = () => {
    localStorage.removeItem('jwtToken');
    return <Redirect to='/login' />
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        // fakeAuth.isAuthenticated === true
        localStorage.getItem('jwtToken')
            ? localStorage.getItem('role') ?  <Component {...props} /> : <Redirect to='/login' />
            : <Redirect to='/login' />
    )} />
)
const PrivateRouteAdmin = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        // fakeAuth.isAuthenticated === true
        localStorage.getItem('jwtToken')
            ? localStorage.getItem('role') === "admin" ?  <Component {...props} /> : <Redirect to='/teacher' />
            : <Redirect to='/login' />
    )} />
)

const PrivateRouteTeacher = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        // fakeAuth.isAuthenticated === true
        localStorage.getItem('jwtToken')
            ? (localStorage.getItem('role') === "teacher" || localStorage.getItem('role') === "admin") ?  <Component {...props} /> : <Redirect to='/user' />
            : <Redirect to='/login' />
    )} />
)

const PrivateRouteUser = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        // fakeAuth.isAuthenticated === true
        localStorage.getItem('jwtToken')
            ? (localStorage.getItem('role') === "student" || localStorage.getItem('role') === "teacher" || localStorage.getItem('role') === "admin") ?  <Component {...props} /> : <Redirect to='/login' />
            : <Redirect to='/login' />
    )} />
)


export default authInterface;
// registerServiceWorker();