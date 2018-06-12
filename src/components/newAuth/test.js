import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
import AdminUserInterface from "../admin/adminUserInterface"
import TestInterface from "../test/testInterface"
import CreateCourse from "../course/createCourse"
import ChangeTest from "../test/changeTest"
import CourseInterface from "../course/courseInterface"
import UserInterface from "../user/userInterface"
// import Login from "./login/login"
// import fakeAuth from "./fakeAuth"
import 'react-select/dist/react-select.css';
const paddings = { paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,};

class Test extends Component{
    constructor(props){
        super(props)
        console.log(props.match.url);
    }
    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get('http://localhost:3000/api/book')
            .then(res => {
                this.setState({ books: res.data });
                console.log(this.state.books);
            })
            .catch((error) => {
                if(error.response.status === 401) {
                    this.props.history.push("/login");
                }
            });
    }
    logout = () => {
        localStorage.removeItem('jwtToken');
        this.props.history.push("/");
        window.location.reload();

    }

    render(){
        return(<Router>
            <div >
                {/*<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"/>*/}
                <Nav>
                    <NavItem>
                        <NavLink><Link to={this.props.match.url + "/main"}>Main</Link></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink><Link to={this.props.match.url + "/user"}>User</Link></NavLink>
                    </NavItem>
                    {/*<NavItem>*/}
                        {/*<NavLink><Link to={this.props.match.url + "/course"}>Course</Link></NavLink>*/}

                    {/*</NavItem>*/}
                    {/*<NavItem>*/}
                        {/*<NavLink><Link to={this.props.match.url + "/admin"}>Admin</Link></NavLink>*/}

                    {/*</NavItem>*/}
                </Nav>






                <hr />
                <div style ={paddings}>
                    <Route exact path={this.props.match.url + ""} component={Home} />
                    <Route path={this.props.match.url + "/admin"} component={AdminUserInterface} />
                    <Route path={this.props.match.url + "/course"} component={CourseInterface} />
                    <Route path={this.props.match.url + "/user"} component={UserInterface} />

                </div>
                <div>{localStorage.getItem('jwtToken') &&
                <button className="btn btn-primary" onClick={this.logout}>Logout</button>
                }</div>
            </div>

        </Router>);
    }


    // render(){
    //     console.log(localStorage.getItem('jwtToken'));
    //     return(
    //         <div>{localStorage.getItem('jwtToken') &&
    //         <button className="btn btn-primary" onClick={this.logout}>Logout</button>
    //         }</div>
    //     );
    // }
}

const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
);
export default UserInterface;