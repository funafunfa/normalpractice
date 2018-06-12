import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
//Admin
import AdminUsers from "../admin/adminUsers";
import User from "../admin/adminCreateUser";
//User
import UserInfo from "../user/userInfo";
import AllCourses from "../course/allCourses";
import TakeACourse from "../course/takeACourse";
import MyStats from "../user/myStats";

class Test extends Component{
    constructor(props){
        super(props);

    }

    render(){
        const role = this.props.location.state.role;
        const match = this.props.match;
        if(role === "student"){
            return(<div>
                <div>Yeah student</div>
                <Router>
                    <div>
                        <Nav vertical={true}>
                            <NavItem>
                                <NavLink><Link to={`${match.url}/`}>userInfo</Link></NavLink>

                            </NavItem>
                            <NavItem>
                                <NavLink><Link to={`${match.url}/courses`}>Courses</Link></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink><Link to={`${match.url}/stats`}>stats</Link></NavLink>
                            </NavItem>

                        </Nav>

                        <hr />


                        <Route exact path={`${match.url}/`} render={()=><UserInfo location = {this.props.location}/>} />
                        <Route path={`${match.url}/courses`} render={()=><AllCourses match = {this.props.match} history = {this.props.history} location = {this.props.location}/>} />
                        <Route path={`${match.url}/stats`} render={()=><MyStats match = {this.props.match} history = {this.props.history} location = {this.props.location}/>} />
                        <Route path={`${match.url}/takeCourse`} component={TakeACourse} />
                        {/*<Route path={`${match.url}/takeCourse`} render={()=><TakeACourse match = {this.props.match} history = {this.props.history} location = {this.props.location}/>} />*/}

                        {/*<Route path="/topics" component={Topics} />*/}

                    </div>
                </Router>
            </div>);
        }else if (role === "admin"){
            return(<div><div>Yeah admin</div>
                <Router>
                    <div>
                        <Nav vertical={true}>
                            <NavItem>
                                <NavLink><Link to={`${match.url}/`}>allUsers</Link></NavLink>

                            </NavItem>
                            <NavItem>
                                <NavLink><Link to={`${match.url}/createUser`}>createUser</Link></NavLink>

                            </NavItem>

                        </Nav>

                        <hr />


                        <Route exact path={`${match.url}/`} component={AdminUsers} />
                        <Route path={`${match.url}/createUser`} component={User} />

                        {/*<Route path="/topics" component={Topics} />*/}

                    </div>
                </Router>
            </div>);

        }else if (role === "teacher"){
            return(<div>Yeah teacher</div>);

        }
    }

}

const BasicExample = ({match}) => (
    <Router>
        <div>
            <Nav vertical={true}>
                <NavItem>
                    <NavLink><Link to={`${match.url}/`}>allUsers</Link></NavLink>

                </NavItem>
                <NavItem>
                    <NavLink><Link to={`${match.url}/createUser`}>createUser</Link></NavLink>

                </NavItem>

            </Nav>

            <hr />


            <Route exact path={`${match.url}/`} component={AdminUsers} />
            <Route path={`${match.url}/createUser`} component={User} />

            {/*<Route path="/topics" component={Topics} />*/}

        </div>
    </Router>
);
export default Test;