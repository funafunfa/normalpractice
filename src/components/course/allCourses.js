import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
// import 'node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import axios from 'axios';
import takeATest from './takeACourse';
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
            disabled: false,
            testIsGoing: false,
            test: []

        };
        let response = this.state.dataIn.themes;
        console.log("response.data");
        console.log(response);
        // console.log(response.themes);
        const u = this.state.themesArray;
        // console.log(u.length);
        let x = 0;
        for(let z = 0; z <= response.length-1; z++){
            u[z] = <div key={z}><Theme doneIds = {this.props.doneIds} elementName = {z + "C"} dataInTheme = {response[z]}/></div>;
            // x = z;
        }
        this.setState({
            // usersIn: response,
            // doTheyIn: true,
            themesArray: u,
        });
        this.toggle = this.toggle.bind(this);
        this.takeCourse = this.takeCourse.bind(this);
        // this.deleteUser = this.deleteUser.bind(this);
        for(let z =0; z<=props.doneIds.length-1; z++){
            if(this.state.dataIn._id === props.doneIds[z].id){
                this.state.disabled = true
            }
        }
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

    takeCourse(){
            let id = this.state.dataIn._id;
            axios.post('http://localhost:3000/tanya/user/' + localStorage.getItem("id") + '/addCourse',{ data:{
                courses: {id: id}} , oldId: localStorage.getItem("id")})
                .then((result) => {
                    console.log(result);
                    let z = [];
                    let o = {id:localStorage.getItem("id"), cId: id};
                    z.push(<takeATest z = {o} location = {this.props.location.state}/>);
                    this.setState({
                        test: z,
                    })
                    this.state.testIsGoing = true;
                    this.props.onSelectLanguage(id);
                }).catch((error) => {
                console.log(error)

                // if(error.response.status === 500) {
                //     this.state.enabled = true;
                //     this.setState({ message: 'Login failed. Username or password not match' });
                // }
            });


    }



    render(){
        let course = this.state.dataIn;
        if(!this.state.testIsGoing){
            return(<div>
                <p onClick={this.toggle} style={{ marginBottom: '1rem' }}>{course.courseName} </p>
                <Collapse isOpen={this.state.collapse}>
                    <Card>
                        <CardBody>
                            {this.state.themesArray.map(function (input, index) {
                                return input
                            })}
                            <Button name = {course._id} disabled={this.state.disabled} onClick={this.takeCourse}>Take a course</Button>
                        </CardBody>
                    </Card>
                </Collapse>

            </div>);
        }else {
            return(
                <div>
                    {this.state.test.map(function (damn) {
                        return damn;
                    })}
                </div>
            )
        }

    }
}

class Courses extends Component{
    constructor(props){
        super(props);
        this.state = {
            usersIn: [],
            doTheyIn: false,
            coursesArray: [],
            doneIds:[],


        };
        this.props.location.id = localStorage.getItem("id");
        this.handleUsers = this.handleUsers.bind(this);
        this.handleUsersData = this.handleUsersData.bind(this);
        this.handleName = this.handleName.bind(this);
        this.getUsersData = this.getUsersData.bind(this);
        this.getUsersData();

        this.getUsers();
    }

    getUsersData(){
        console.log("DAMN", localStorage.getItem("id"));
        axios.get('http://localhost:3000/tanya/user/' + localStorage.getItem("id") + '/coursesTitles')
            .then(response => this.handleUsersData(response.data));
    }
    getUsers(){
        axios.get('http://localhost:3000/tanya/course/all')
            .then(response => this.handleUsers(response.data));
    }


    handleName = (value) => {
        console.log(value);
        let z = this.props.location.state = {cId: value};
        // z.cId = value
        let obj = {id:localStorage.getItem("id"), cId: value};
        console.log(this.props.match.url);
        // let str = "/" + "teacher" + "/takeCourse";
        let str = "/" + localStorage.getItem("role") + "/takeCourse";

        this.props.history.push({
            pathname: str,
            // state: obj,
            state: z,
            id: value
        });

        // this.props.history.push({
        //     pathname: '/takeCourse',
        //     state: { detail: localStorage.getItem("id"), id:value }
        // })
    };

    handleUsers = (response) => {
        console.log("response.data");
        console.log(response);
        // console.log(response.themes);
        const u = this.state.coursesArray;
        // console.log(u.length);
        let x = 0;
        console.log("DONEID", this.state.doneIds);
        for(let z = 0; z <= response.length-1; z++){
            u[z] = <div key={z}><Course doneIds = {this.state.doneIds} onSelectLanguage={this.handleName} location = {this.props.location} elementName = {z + "C"} dataInCourse = {response[z]}/></div>;
            // x = z;
        }
        this.setState({
            usersIn: response,
            doTheyIn: true,
            coursesArray: u,
        });
        // console.log(response);
    };

    handleUsersData = (response) => {
        console.log("response.dataID");
        console.log(response);
        this.setState({
            doneIds:response
        })
        // // console.log(response.themes);
        // const u = this.state.coursesArray;
        // // console.log(u.length);
        // let x = 0;
        // for(let z = 0; z <= response.length-1; z++){
        //     u[z] = <div key={z}><Course onSelectLanguage={this.handleName} location = {this.props.location} elementName = {z + "C"} dataInCourse = {response[z]}/></div>;
        //     // x = z;
        // }
        // this.setState({
        //     usersIn: response,
        //     doTheyIn: true,
        //     coursesArray: u,
        // });
        // // console.log(response);
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