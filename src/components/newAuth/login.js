import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            message: ''
        };
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('role');
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { username, password } = this.state;

        axios.post('http://localhost:3000/api/auth/login', { username, password })
            .then((result) => {
                localStorage.setItem('jwtToken', result.data.token);
                localStorage.setItem('role', result.data.role);
                localStorage.setItem('id', result.data.id);
                localStorage.setItem('name', result.data.name);
                this.setState({ message: '' });
                // console.log(result.date.id);
                // this.props.params.push(username);
                this.props.history.push({
                    pathname: "/" + localStorage.getItem("role") + "/main",
                    state: { detail: username, name:result.data.name, id:result.data.id, role:result.data.role }
                })
            })
            .catch((error) => {
                if(error.response.status === 401) {
                    this.setState({ message: 'Login failed. Username or password not match' });
                }
            });
    }

    render() {
        const { username, password, message } = this.state;
        return (
            <div className="container">
                <form className="form-signin" onSubmit={this.onSubmit}>
                    {message !== '' &&
                    <div className="alert alert-warning alert-dismissible" role="alert">
                        { message }
                    </div>
                    }
                    <h2 className="form-signin-heading">Please sign in</h2>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input type="email" className="form-control" placeholder="Email address" name="username" value={username} onChange={this.onChange} required/>
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" className="form-control" placeholder="Password" name="password" value={password} onChange={this.onChange} required/>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
                    <p>
                        Not a member? <Link to="/register"><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Register here</Link>
                    </p>
                </form>
            </div>
        );
    }
}

export default Login;