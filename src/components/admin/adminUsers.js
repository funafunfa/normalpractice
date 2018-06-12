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
        // let user = this.state.dataIn
        return(<div>
            <button onClick={this.deleteUser} value={this.props.id}>Delete User</button><hr></hr></div>);
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
        this.deleteUserHere = this.deleteUserHere.bind(this);
        this.getUsers();

    }
    getUsers(){
        axios.get('http://localhost:3000/tanya/admin/users')
            .then(response => this.handleUsers(response.data));
    }

    deleteUserHere(data){
        // console.log(event.target.value);
        fetch('http://localhost:3000/tanya/admin/deleteUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id:data,
                secondParam: 'yourOtherValue',
            })
        })
    }


    handleUsers = (response) => {
      console.log("response.data");
      console.log(response);
        const u = this.state.usersArray;
        // console.log(u.length);
        let x = 0;
        for(let z = 0; z <= response.length-1; z++){

            // 0
            // _id:
            //     "5b13f5c15c1e063fe41497b6"
            // email:
            //     "rdimon@i.ua@Sd"
            // password:
            //     "$2a$10$3q0MhBbl/bE5aKR0rBsa9.ueWq.bSp3CwjeHpv/Tm.zCf1Xy6SPkC"
            // passwordConf:
            //     "asd"
            // role:
            //     "teacher"
            // username:
            //     "asdzxc"
                u[z] = {
                    _id: response[z]._id,
                    // email: response[z].email,
                    name:response[z].name,
                    password: response[z].password,
                    // passwordConf: response[z].passwordConf,
                    role: response[z].role,
                    username: response[z].username,
                    // button: response[z]._id,
                }
            // u[z] = <div key={z}><User elementName = {z + "Q"} dataInUser = {response[z]}/></div>;
            // x = z;
        }
      this.setState({
          usersIn: u,
          doTheyIn: true,
          usersArray: u,
      })
        console.log(response);
    };

    render(){
        let doTheyIn = this.state.doTheyIn;
        const selectRow = {
            mode: 'checkbox'
        };

        function buttonFormater(cell, row) {
            function del(a)
                {
                    // console.log(event.target.value);
                    fetch('http://localhost:3000/tanya/admin/deleteUser', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id:a,
                            secondParam: 'yourOtherValue',
                        })
                    })
            }
            return <button onClick={del(cell)} value={cell}>Delete</button>
        }
        if(doTheyIn){

            // return(<div>{this.state.usersArray.map(function(user, index){
            //     return user;
            // })}</div>);
            console.log(this.state.usersIn);
            return(<div>
                {/*<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"/>*/}
                <BootstrapTable data={this.state.usersIn} v={"3"} selectRow = {selectRow} deleteRow striped hover>
                <TableHeaderColumn isKey dataField='_id'>ID</TableHeaderColumn>
                <TableHeaderColumn dataField='name'>name</TableHeaderColumn>
                <TableHeaderColumn dataField='username'>User Name</TableHeaderColumn>
                <TableHeaderColumn dataField='role'>role</TableHeaderColumn>
                {/*<TableHeaderColumn dataField='button'  >button</TableHeaderColumn>*/}
                {/*<TableHeaderColumn dataField='button' dataFormat = {buttonFormater} >button</TableHeaderColumn>*/}
            </BootstrapTable></div>);
        }else {
            return(<div>Nothing here</div>
            );
        }
    }

}

export default AdminUsers;