import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// import './index.css';
// import App from "./App";
// import registerServiceWorker from './registerServiceWorker';
// import Login from './components/testAuth/Login';
// import Login from "/src/components/testAuth/login"
// import Login from "./components/newAuth/login"
import AllCourses from "../course/allCourses"
// import Test from "./components/newAuth/test"
// import Register from "./components/newAuth/register"
// import Register from "/src/components/testAuth/register"
// import Register from './components/testAuth/Register';
import UserInfo from './userInfo';
class userInterface extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(<Router>
            <div>
                {/*<Route exact path='/main' component={Test} />*/}
                <Route exact path='/userInfo' component={UserInfo} />
                <Route exact path='/courses' component={AllCourses} />
                {/*<Route path='/login' component={Login} />*/}
                {/*<Route path='/register' component={Register} />*/}
            </div>
        </Router>);
    };

}
export default AllCourses;
// registerServiceWorker();