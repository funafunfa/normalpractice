import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// import './index.css';
// import App from "./App";
// import registerServiceWorker from './registerServiceWorker';
// import Login from './components/testAuth/Login';
// import Login from "/src/components/testAuth/login"
// import Login from "./components/newAuth/login"
// import CreateCourse from "./components/course/createCourse"
// import ChangeCourse from "./components/course/changeCourse"
// import Test from "./components/newAuth/test"
// import User from "./components/user/userInfo"
// import Take from "./components/course/takeACourse"
// import AllCourses from "./components/course/allCourses"
// import TakeCourse from "./components/course/takeACourse"
// import Register from "./components/newAuth/register"
// import DoTest from "./components/test/doTest"
// import LookUp from "./components/course/myCourseResults"
// import Admin from "./components/admin/adminCreateUser"
// import AdminUsers from "./components/admin/adminUsers"
// import TestRoute from "./components/test/route"
import ezUser from "./ezRouterUser"
import ezTeacher from "./ezRouterTeacher"
import ezAdmin from "./ezRouterAdmin"
// import Register from "/src/components/testAuth/register"
// import Register from './components/testAuth/Register';
class ezRouter extends Component {
    constructor(props){
        super(props);
        this.state = {
            location: ""
        }
        // this.callServer();



        // console.log(props);
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.location.state !== this.props.location.state) {
            console.log(nextProps.location.state);
            this.props.history.push({
                pathname: '/' + nextProps.location.state.role,
                state: nextProps.location.state,
            })
            // this.callServer();

        }
    }

    callServer(){
        console.log(this.props.location.state);
        if(this.props.location.state){
            this.props.history.push({
                pathname: '/' + this.props.location.state.role,
                state: this.state.location
            })
        }
    }
    render(){
        // console.log(this.state.location);

        return(
            <Router>
            <div>

                {/*<Route path='/' component={ezRouter} />*/}
                {/*<Route path='/student' component={ezUser} />*/}
                {/*<Route path='/teacher' component={ezTeacher} />*/}
                {/*<Route path='/admin' component={ezAdmin} />*/}

                <PrivateRouteUser path='/student' component={ezUser} />
                <PrivateRouteTeacher path='/teacher' component={ezTeacher} />
                <PrivateRouteAdmin path='/admin' component={ezAdmin} />


            </div>
        </Router>
        );
    };



}

const PrivateRouteUser = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        // fakeAuth.isAuthenticated === true
        "snake" === ""
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
);
const PrivateRouteAdmin = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        // fakeAuth.isAuthenticated === true
        "snake" != "snake"
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
);
const PrivateRouteTeacher = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        // fakeAuth.isAuthenticated === true
        "snake" != "snake"
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
);


export default ezRouter;
// registerServiceWorker();