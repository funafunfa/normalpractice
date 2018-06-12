import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import userInfo from "../user/userInfo"
import courses from "../course/allCourses"
import takeCourse from "../course/takeACourse"
import stats from "../user/myStats"

import createCourse from "../course/createCourse"
import changeCourse from "../course/changeCourse"
import myCourseStats from "../course/myCourseResults"

class fuckMeJerry extends Component{
    constructor(props){
        super(props);
        this.props.history.push({
            pathname: '/user/main',
            // state: { detail: username, name:result.data.name, id:result.data.id, role:result.data.role }
        })
    }

    render(){
        return(<div>YeaUserCmon</div>);
    }
}
class fuckMeJerry2 extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return(<div>DAMN</div>);
    }
}
class ezRouter extends Component {
    constructor(props){
        super(props);
        this.onClick= this.onClick.bind(this);

    }
    onClick(e){
        if(e.target.name === "Main"){
            this.props.history.push({
                pathname: "/" + localStorage.getItem("role") + "/main",
                // state: { detail: username, name:result.data.name, id:result.data.id, role:result.data.role }
            })
            window.location.reload();

        }else if(e.target.name === "Courses"){
            this.props.history.push({
                pathname: "/" + localStorage.getItem("role") + "/courses",
                // state: { detail: username, name:result.data.name, id:result.data.id, role:result.data.role }
            })
            window.location.reload();

        }else if(e.target.name === "Statistics"){
            this.props.history.push({
                pathname: "/" + localStorage.getItem("role") + "/stats",
                // state: { detail: username, name:result.data.name, id:result.data.id, role:result.data.role }
            })
            window.location.reload();

        }else if(e.target.name === "Change Course"){
            this.props.history.push({
                pathname: "/" + localStorage.getItem("role") + "/changeCourse",
                // state: { detail: username, name:result.data.name, id:result.data.id, role:result.data.role }
            })
            window.location.reload();

        }else if(e.target.name === "Courses Stats"){
            this.props.history.push({
                pathname: "/" + localStorage.getItem("role") + "/courseStats",
                // state: { detail: username, name:result.data.name, id:result.data.id, role:result.data.role }
            })
            window.location.reload();

        }
    }
    render(){
        return(
            <div style={{paddingLeft:10}}>
                <Nav>
                    <NavItem>
                        <NavLink><a name={"Main"} onClick={this.onClick}>Main</a></NavLink>

                    </NavItem>
                    <NavItem>
                        <NavLink><a name={"Courses"} onClick={this.onClick}>Courses</a></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink><a name={"Create Course"} onClick={this.onClick}>Create Course</a></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink><a name={"Change Course"} onClick={this.onClick}>Change Change</a></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink><a name={"Courses Stats"} onClick={this.onClick}>Courses Stats</a></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink><a name={"Statistics"} onClick={this.onClick}>Statistics</a></NavLink>
                    </NavItem>

                </Nav>
                <hr></hr>
                <Router>
                <div>
                    {/*<Route path='/main' component={TestRoute} />*/}
                    <Route path={this.props.match.url + '/main'} component={userInfo}/>
                    <Route path={this.props.match.url + '/courses'} component={courses}/>
                    <Route path={this.props.match.url + '/takeCourse'} component={takeCourse}/>
                    <Route path={this.props.match.url + '/stats'} component={stats}/>
                    <Route path={this.props.match.url + '/createCourse'} component={createCourse}/>
                    <Route path={this.props.match.url + '/changeCourse'} component={changeCourse}/>
                    <Route path={this.props.match.url + '/courseStats'} component={myCourseStats}/>

                </div>
            </Router></div>);
    };



}

export default ezRouter;
