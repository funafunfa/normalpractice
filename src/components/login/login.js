import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
// import 'node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';


class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
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
    getUsers(){
        axios.get('http://localhost:3000/tanya/course/all')
            .then(response => this.handleUsers(response.data));
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
            fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username:this.state.email,
                    password:this.state.password,
                })
            }).then(response => response.json())
                .then(response => {

                    console.log(response);
                });
            console.log(this.state.email);
            console.log(this.state.password);
        }else if (!this.state.loginOrRegister){
            fetch('http://localhost:3000/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email:this.state.email,
                    username:this.state.username,
                    password:this.state.password,
                    passwordConf: this.state.password,
                    role:this.state.roleSelector,
                    secondParam: 'yourOtherValue',
                    type:"createdByAdmin",
                })
            }).then(response => response.json())
                .then(response => {

                    console.log(response);
                });

                    console.log(this.state.email);
            console.log(this.state.password);
            console.log(this.state.passwordConfirm);
            console.log(this.state.username);
            console.log(this.state.roleSelector);
        }

    }
    // handleUsers = (response) => {
    //     console.log("response.data");
    //     console.log(response);
    //     // console.log(response.themes);
    //     const u = this.state.coursesArray;
    //     // console.log(u.length);
    //     let x = 0;
    //     for(let z = 0; z <= response.length-1; z++){
    //         u[z] = <div key={z}><Course elementName = {z + "C"} dataInCourse = {response[z]}/></div>;
    //         // x = z;
    //     }
    //     this.setState({
    //         usersIn: response,
    //         doTheyIn: true,
    //         coursesArray: u,
    //     });
    //     // console.log(response);
    // };

    render(){
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
    }

}

export default Login;