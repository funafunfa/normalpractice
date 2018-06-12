import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';

class Create extends Component {

    constructor() {

        super();
        this.state = {
            username: '',
            password: '',
            name: '',
            role: 'student',
        };
    }
    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { username, password, name, role } = this.state;

        axios.post('http://localhost:3000/api/auth/register', { username, password, name, role })
            .then((result) => {
                this.props.history.push("/login")
            });
    }

    render() {
        const { username, password, name, role} = this.state;
        return (
            <div className="container">
                <form className="form-signin" onSubmit={this.onSubmit}>
                    <h2 className="form-signin-heading">Register</h2>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input type="email" className="form-control" placeholder="Email address" name="username" value={username} onChange={this.onChange} required/>
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" className="form-control" placeholder="Password" name="password" value={password} onChange={this.onChange} required/>
                    <label htmlFor="name" className="sr-only">Name</label>
                    <input type="text" className="form-control" placeholder="name" name="name" value={name} onChange={this.onChange} required/>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
                </form>
            </div>
        );
    }
}

export default Create;