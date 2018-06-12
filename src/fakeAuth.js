import React, { Component } from 'react';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

// import LoginOld from "./components/login/login";
import Basic from "./App";
////////////////////////////////////////////////////////////
// 1. Click the public page
// 2. Click the protected page
// 3. Log in
// 4. Click the back button, note the URL each time
class AuthExample extends Component{
    constructor(props){
        super(props);
        this.state = {
            sessionId: ""
        };

        this.handleLogin = this.handleLogin.bind(this);
    }
    handleLogin = (id) => {
       console.log("id", id);
    }
    render(){
        return(<div><Router>
            <div>
                <AuthButton />
                <ul>
                    <li>
                        <Link to="/public">Public Page</Link>
                    </li>
                    <li>
                        <Link to="/protected">Protected Page</Link>
                    </li>
                </ul>
                <Route path="/public" component={Public} />
                <Route path="/login" component={Login} />
                <PrivateRoute path="/protected" component={Basic}
                              // onLogin = {this.handleLogin}
                />
            </div>
        </Router>
        </div>);
    }
}
function isReal(data){
    if(data.status === 200) console.log("yes");
    return data;
}
const fakeAuth = {
    isAuthenticated: false,
    failed: false,
    sessionId: "",
    error: "",
    authenticate(data, cb) {
        console.log(data);
        fetch('http://localhost:3000/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(response => {
                if(response !== "0"){
                    this.sessionId = response;
                    console.log(this.sessionId);

                    this.isAuthenticated = true;
                    setTimeout(cb, 100); // fake async
                }else{
                    this.error = "wrong smth",
                    this.failed = true;
                    this.isAuthenticated = false;

                }

                // this.isAuthenticated = true;
            });


                // this.isAuthenticated = true;


        // fetch('http://localhost:3000/', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json, text/plain, */*',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         logemail:"dcamozlo@gmail.com",
        //         logpassword:"123123",
        //     })
        // }).then(response => response.json())
        //     .then(response => {
        //         if(response){
        //             this.sessionId = response;
        //             console.log(this.sessionId);
        //
        //             this.isAuthenticated = true;
        //             setTimeout(cb, 100); // fake async
        //         }
        //
        //         // this.isAuthenticated = true;
        //     });

    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};


const AuthButton = withRouter(
    ({ history }) =>
        fakeAuth.isAuthenticated ? (
            <p>
                Welcome!{" "}
                <button
                    onClick={() => {
                        fakeAuth.signout(() => history.push("/"));
                    }}
                >
                    Sign out
                </button>
            </p>
        ) : (
            <p>You are not logged in.</p>
        )
);

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            fakeAuth.isAuthenticated ? (

                <Component {...props} sessionId = {fakeAuth.sessionId}/>
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location}
                    }}
                />
            )
        }
    />
);

const Public = () => <h3>Public</h3>;
const Protected = () => <h3>Protected</h3>;

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirectToReferrer: false,
            email: "",
            username: "",
            password: "",
            passwordConfirm: "",
            roleSelector: "admin",
            loginOrRegister: true,



        };
        // console.log("id", props.sessionId);
        // this.handleUsers = this.handleUsers.bind(this);
        this.loginButtons = this.loginButtons.bind(this);
        this.submitButton = this.submitButton.bind(this);
        this.textChangersLogin = this.textChangersLogin.bind(this);
        this.textChangersRegister = this.textChangersRegister.bind(this);
        // this.getUsers();
    }

    loginButtons(e){
        if(e.target.name === "login" ){
            this.setState({
                loginOrRegister:true,
                email: "",
                username: "",
                password: "",
                passwordConfirm: "",
                roleSelector: "admin",
            })
        }else if(e.target.name === "register" ){
            this.setState({
                loginOrRegister:false,
                email: "",
                username: "",
                password: "",
                passwordConfirm: "",
                roleSelector: "admin",
            })
        }
    }

    textChangersLogin(e){
        if(e.target.name === "email" ){
            this.setState({
                email:e.target.value,
            })
        }else if(e.target.name === "password" ){
            this.setState({
                password:e.target.value,
            })
        }
    }
    textChangersRegister(e){
        if(e.target.name === "email" ){
            this.setState({
                email:e.target.value,
            })
        }else if(e.target.name === "password" ){
            this.setState({
                password:e.target.value,
            })
        }else if(e.target.name === "passwordConfirm" ){
            this.setState({
                passwordConfirm:e.target.value,
            })
        }else if(e.target.name === "username" ){
            this.setState({
                username:e.target.value,
            })
        }else if(e.target.name === "roleSelector" ){
            this.setState({
                roleSelector:e.target.value,
            })
        }
    }

    submitButton(e){
        e.preventDefault();


        if(this.state.loginOrRegister){
            let data = {logemail: this.state.email,
                logpassword: this.state.password};
            // fetch('http://localhost:3000/', {
            //     method: 'POST',
            //     headers: {
            //         'Accept': 'application/json, text/plain, */*',
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         logemail:this.state.email,
            //         logpassword:this.state.password,
            //     })
            // }).then(response => response.json())
            //     .then(response => {
            //
            //         console.log(response);
            //     });
            console.log(this.state.email);
            console.log(this.state.password);


            fakeAuth.authenticate(data, () => {
                this.setState({ redirectToReferrer: true });

            });
            if(fakeAuth.failed)console.log(fakeAuth.error);
        }else if (!this.state.loginOrRegister){
            let data = {
                email:this.state.email,
                username:this.state.username,
                password:this.state.password,
                passwordConf: this.state.password,
                role:this.state.roleSelector,
            };
            // fetch('http://localhost:3000/', {
            //     method: 'POST',
            //     headers: {
            //         'Accept': 'application/json, text/plain, */*',
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         email:this.state.email,
            //         username:this.state.username,
            //         password:this.state.password,
            //         passwordConf: this.state.password,
            //         role:this.state.roleSelector,
            //         secondParam: 'yourOtherValue',
            //         type:"createdByAdmin",
            //     })
            // }).then(response => response.json())
            //     .then(response => {
            //
            //         console.log(response);
            //     });
            fakeAuth.authenticate(data, () => {
                this.setState({ redirectToReferrer: true });

            });
            if(fakeAuth.failed)console.log(fakeAuth.error);
            console.log(this.state.email);
            console.log(this.state.password);
            console.log(this.state.passwordConfirm);
            console.log(this.state.username);
            console.log(this.state.roleSelector);
        }

    }

    login = () => {





    };

    render() {
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        const { redirectToReferrer } = this.state;
        // const { error } = this.error;
        // if(fakeAuth.failed)console.log(fakeAuth.error);
        // console.log(error);

        if (redirectToReferrer) {
            return <Redirect to={from} />;
        }

        const loginOrRegister = this.state.loginOrRegister;
        if(loginOrRegister){
            return(<div>
                <div><a name = {"login"} href = {"#"} onClick={this.loginButtons}> Login </a> OR <a href = {"#"} name = {"register"} onClick={this.loginButtons}> Register </a></div>
                <div>
                    <Form inline>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="email" className="mr-sm-2">Email</Label>
                            <Input type="email" onChange = {this.textChangersLogin} name="email" id="email" placeholder="something@idk.cool" />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="password" className="mr-sm-2">Password</Label>
                            <Input type="password" onChange = {this.textChangersLogin} name="password" id="password" placeholder="don't tell!" />
                        </FormGroup>
                        <Button name = {"login"} onClick={this.submitButton}>Submit</Button>
                    </Form>
                </div>
            </div>);
        }else{
            return(<div>
                <div><a name = {"login"} href = {"#"} onClick={this.loginButtons}> Login </a> OR <a href = {"#"} name = {"register"} onClick={this.loginButtons}> Register </a></div>

                <div>
                    <FormGroup row className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="username" sm={2}>username</Label>
                        <Col sm={10}>
                            <Input type="email" onChange = {this.textChangersRegister} name="username" id="username" placeholder="with a placeholder" />
                        </Col>
                    </FormGroup>
                    <FormGroup row className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="email" sm={2}>email</Label>
                        <Col sm={10}>
                            <Input type="email" onChange = {this.textChangersRegister} name="email" id="email" placeholder="with a placeholder" />
                        </Col>
                    </FormGroup>
                    <FormGroup row className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="password" sm={2}>password</Label>
                        <Col sm={10}>
                            <Input type="password" onChange = {this.textChangersRegister} name="password" id="password" placeholder="password placeholder" />
                        </Col>
                    </FormGroup>
                    <FormGroup row className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="passwordConfirm" sm={2}>passwordConfirm</Label>
                        <Col sm={10}>
                            <Input type="password" onChange = {this.textChangersRegister} name="passwordConfirm" id="passwordConfirm" placeholder="password placeholder" />
                        </Col>
                    </FormGroup>
                    <FormGroup row className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="roleSelector" sm={2}>Select</Label>
                        <Col sm={10}>
                            <Input type="select" onChange = {this.textChangersRegister} name="roleSelector" id="roleSelector">
                                <option value={"admin"}>Admin</option>
                                <option value={"student"}>Student</option>
                                <option value={"teacher"}>Teacher</option>
                            </Input>
                        </Col>
                    </FormGroup>
                    <Button name = {"register"} onClick={this.submitButton}>Submit</Button>
                </div>
            </div>);

        }

        // return (
        //     <div>
        //         <LoginOld/>
        //         <p>You must log in to view the page at {from.pathname}</p>
        //         {/*<p>Error {error}</p>*/}
        //         <button onClick={this.login}>Log in</button>
        //     </div>
        // );
    }
}

export default AuthExample;