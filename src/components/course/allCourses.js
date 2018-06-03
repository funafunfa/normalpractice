import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
// import 'node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import axios from 'axios';
class Theme extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataIn: props.dataInTheme,
            collapse: false,
        };
        this.toggle = this.toggle.bind(this);
        // this.deleteUser = this.deleteUser.bind(this);

    }

    // deleteUser(event){
    //     console.log(event.target.value);
    //     fetch('http://localhost:3000/tanya/admin/deleteUser', {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             id:event.target.value,
    //             secondParam: 'yourOtherValue',
    //         })
    //     })
    // }
    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }
    render(){
        let theme = this.state.dataIn;
        return(<div>
            <p onClick={this.toggle} style={{ marginBottom: '1rem' }}>{theme.themeName} </p>
            <Collapse isOpen={this.state.collapse}>
                <Card>
                    <CardBody>
                        {theme.themeText}
                    </CardBody>
                </Card>
            </Collapse>
        </div>);
    }
}

class Course extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataIn: props.dataInCourse,
            themesArray: [],
            collapse: false,

        };
        let response = this.state.dataIn.themes;
        console.log("response.data");
        console.log(response);
        // console.log(response.themes);
        const u = this.state.themesArray;
        // console.log(u.length);
        let x = 0;
        for(let z = 0; z <= response.length-1; z++){
            u[z] = <div key={z}><Theme elementName = {z + "C"} dataInTheme = {response[z]}/></div>;
            // x = z;
        }
        this.setState({
            // usersIn: response,
            // doTheyIn: true,
            themesArray: u,
        });

        this.toggle = this.toggle.bind(this);
        // this.deleteUser = this.deleteUser.bind(this);

    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    // deleteUser(event){
    //     console.log(event.target.value);
    //     fetch('http://localhost:3000/tanya/admin/deleteUser', {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             id:event.target.value,
    //             secondParam: 'yourOtherValue',
    //         })
    //     })
    // }

    render(){
        let course = this.state.dataIn;
        return(<div>
            <p onClick={this.toggle} style={{ marginBottom: '1rem' }}>{course.courseName} </p>
            <Collapse isOpen={this.state.collapse}>
                <Card>
                    <CardBody>
                        {this.state.themesArray.map(function (input, index) {
                            return input
                        })}
                    </CardBody>
                </Card>
            </Collapse>

        </div>);
    }
}

class Courses extends Component{
    constructor(props){
        super(props);
        this.state = {
            usersIn: [],
            doTheyIn: false,
            coursesArray: [],


        };
        this.handleUsers = this.handleUsers.bind(this);
        this.getUsers();

    }
    getUsers(){
        axios.get('http://localhost:3000/tanya/course/all')
            .then(response => this.handleUsers(response.data));
    }


    handleUsers = (response) => {
        console.log("response.data");
        console.log(response);
        // console.log(response.themes);
        const u = this.state.coursesArray;
        // console.log(u.length);
        let x = 0;
        for(let z = 0; z <= response.length-1; z++){
            u[z] = <div key={z}><Course elementName = {z + "C"} dataInCourse = {response[z]}/></div>;
            // x = z;
        }
        this.setState({
            usersIn: response,
            doTheyIn: true,
            coursesArray: u,
        });
        // console.log(response);
    };

    render(){
        let doTheyIn = this.state.doTheyIn;
        if(doTheyIn){

            // return(<div>{this.state.usersArray.map(function(user, index){
            //     return user;
            // })}</div>);
            return(<div>
                {this.state.coursesArray.map(function (input, index) {
                    return input
                })}
                {/*<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"/>*/}
                {/*<BootstrapTable data={this.state.usersIn} v={"3"} striped hover>*/}
                    {/*<TableHeaderColumn isKey dataField='_id'>ID</TableHeaderColumn>*/}
                    {/*<TableHeaderColumn dataField='email'>Email</TableHeaderColumn>*/}
                    {/*<TableHeaderColumn dataField='username'>User Name</TableHeaderColumn>*/}
                    {/*<TableHeaderColumn dataField='role'>role</TableHeaderColumn>*/}
                {/*</BootstrapTable>*/}
            </div>);
        }else {
            return(<div>Nothing here</div>
            );
        }
    }

}

export default Courses;