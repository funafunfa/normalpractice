import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
// import 'node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

import axios from 'axios';
class User extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataIn: props.dataInUser,
        };
        this.deleteUser = this.deleteUser.bind(this);

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

    render(){
        let user = this.state.dataIn
        return(<div><p>id {user._id}</p>
            <p>username {user.username}</p>
            <p>email {user.email}</p>
            <p>role {user.role}</p>
            <button onClick={this.deleteUser} value={user._id}>Delete User</button><hr></hr></div>);
    }
}

class AdminUsers extends Component{
    constructor(props){
        super(props);
        this.state = {
            usersIn: [],
            doTheyIn: false,
            usersArray: [],


        };
        this.handleUsers = this.handleUsers.bind(this);
        this.getUsers();

    }
    getUsers(){
        axios.get('http://localhost:3000/tanya/admin/users')
            .then(response => this.handleUsers(response.data));
    }


    handleUsers = (response) => {
      console.log("response.data");
      console.log(response.data);
        const u = this.state.usersArray;
        // console.log(u.length);
        let x = 0;
        for(let z = 0; z <= response.length-1; z++){
            u[z] = <div key={z}><User elementName = {z + "Q"} dataInUser = {response[z]}/></div>;
            // x = z;
        }
      this.setState({
          usersIn: response,
          doTheyIn: true,
          usersArray: u,
      })
        console.log(response);
    };

    render(){
        let doTheyIn = this.state.doTheyIn;
        if(doTheyIn){

            // return(<div>{this.state.usersArray.map(function(user, index){
            //     return user;
            // })}</div>);
            return(<div>
                {/*<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"/>*/}
                <BootstrapTable data={this.state.usersIn} v={"3"} striped hover>
                <TableHeaderColumn isKey dataField='_id'>ID</TableHeaderColumn>
                <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
                <TableHeaderColumn dataField='username'>User Name</TableHeaderColumn>
                <TableHeaderColumn dataField='role'>role</TableHeaderColumn>
            </BootstrapTable></div>);
        }else {
            return(<div>Nothing here</div>
            );
        }
    }

}

export default AdminUsers;