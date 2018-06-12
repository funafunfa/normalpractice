import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';

class User extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedOption:"",
            email:"",
            userName:"",
            password:"",


        };
        this.deleteUser = this.deleteUser.bind(this);
        this.handleSelectChange= this.handleSelectChange.bind(this);
        this.handleButtonClick= this.handleButtonClick.bind(this);
        this.handleInputChange= this.handleInputChange.bind(this);

    }

    deleteUser(event){
        console.log(event.target.value);
        fetch('http://localhost:3000/tanya/admin/deleteUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id:event.target.value,
                secondParam: 'yourOtherValue',
            })
        })
    }
    handleSelectChange = (selectedOption) => {
        this.setState({ selectedOption });
        // selectedOption can be null when the `x` (close) button is clicked
        if (selectedOption) {
            console.log(`Selected: ${selectedOption.label}`);
        }
        console.log(this.state);
    }

    handleButtonClick(event){

        console.log("email " + this.state.email);
        console.log("username " + this.state.userName);
        console.log("password " + this.state.password);
        console.log("role " + this.state.selectedOption.value);

        console.log(event.target.value);
        fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username:this.state.email,
                name:this.state.userName,
                password:this.state.password,
                role:this.state.selectedOption.value,
            })
        });
        this.props.history.push({
            pathname: '/user',
            state: this.props.location.state
        });
        // window.location.reload();

    }

    handleInputChange(event){
        let name = event.target.name;
        let value = event.target.value;
        if(name === "email"){
            this.setState({email:value})
        }else if(name === "username"){
            this.setState({userName:value})
        }else if(name === "password"){
            this.setState({password:value})
        }
    }



    render(){
        const { selectedOption } = this.state;

        // let user = this.state.dataIn
        return(<div><p><input onChange={this.handleInputChange} type={"email"} name ={"email"} placeholder={"email"}/></p>
            <p><input onChange={this.handleInputChange} type={"text"} name ={"username"} placeholder={"username"}/></p>
            <p><input onChange={this.handleInputChange} type={"password"} name ={"password"} placeholder={"password"}/></p>
            <Select
                name="role"
                options={[{value: "admin", label: "Admin"},{value: "user", label: "User"},{value: "teacher", label: "Teacher"}]}
                onChange={this.handleSelectChange}
                value={selectedOption}
            />
            <p><button onClick={this.handleButtonClick}>Click me</button></p>
        </div>);
    }
}


export default User;