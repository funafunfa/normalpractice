import React, { Component } from 'react';
import axios from 'axios';

class userInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            id: "",
            username: "",
            role: "",
            courses: [],
            courseId: "",
            enabled: true,
        }
        // console.log(localStorage.getItem('role'));
        axios.post('http://localhost:3000/tanya/user/' + localStorage.getItem("id"))
            .then((result) => {
            let c = "";
            if(result.data.courses){
                c = result.data.courses;
                console.log("c" ,c);
                this.setState({
                    courses:c,
                });
            }


                this.setState({
                    name: result.data.name,
                    username: result.data.username,
                    role: result.data.role,
                    id: result.data._id,
                    // courses: c,
                });
                console.log(result);
                console.log("this.state.courses" ,this.state.courses);

            });
        this.click = this.click.bind(this);
        this.clickCourses = this.clickCourses.bind(this);
        this.clickCreateCourses = this.clickCreateCourses.bind(this);
        this.clickChangeCourses = this.clickChangeCourses.bind(this);
        this.clickLookUpMyStuff = this.clickLookUpMyStuff.bind(this);
        this.clickTakeCourses = this.clickTakeCourses.bind(this);
        this.textChange = this.textChange.bind(this);
        this.clickAdminPageCreator = this.clickAdminPageCreator.bind(this);
        this.clickAdminPage = this.clickAdminPage.bind(this);
        this.pop = this.pop.bind(this);
        this.clickTest= this.clickTest.bind(this);
    }
    click(e){
        e.preventDefault();
        this.state.enabled = false;
        axios.post('http://localhost:3000/tanya/user/' + localStorage.getItem("id") + '/addCourse',{ data:{
            courses: {id: this.state.courseId}} , oldId: localStorage.getItem("id")})
            .then((result) => {
                this.state.enabled = true;
                console.log(result);
            }).catch((error) => {
            this.state.enabled = true;
            console.log(error)
            // if(error.response.status === 500) {
            //     this.state.enabled = true;
            //     this.setState({ message: 'Login failed. Username or password not match' });
            // }
        });
    }

    clickCourses(e){
        e.preventDefault();
        this.props.history.push({
            pathname: '/allCourses',
            state: this.props.location.state
        });

    }

    clickCreateCourses(e){
        e.preventDefault();
        this.props.history.push({
            pathname: '/createCourse',
            state: this.props.location.state
        });

    }
    pop(e){
        e.preventDefault();
        axios.get('http://localhost:3000/tanya/user/' + localStorage.getItem("id") + '/pop')
            .then((result) => {
                console.log(result);
            });
            // if(error.response.status === 500) {
            //     this.state.enabled = true;
            //     this.setState({ message: 'Login failed. Username or password not match' });
            // }
        // window.location.reload();

    }

    clickChangeCourses(e){
        e.preventDefault();
        this.props.history.push({
            pathname: '/changeCourse',
            state: this.props.location.state
        });

    }
    clickTakeCourses(e){
        e.preventDefault();
        this.props.history.push({
            pathname: '/takeCourse',
            state: this.props.location.state
        });

    }
    clickLookUpMyStuff(e){
        e.preventDefault();
        this.props.history.push({
            pathname: '/lookUp',
            state: this.props.location.state
        });

    }
    clickAdminPageCreator(e){
        e.preventDefault();
        this.props.history.push({
            pathname: '/admin',
            state: this.props.location.state
        });

    }
    clickAdminPage(e){
        e.preventDefault();
        this.props.history.push({
            pathname: '/adminUsers',
            state: this.props.location.state
        });

    }
    clickTest(e){
        e.preventDefault();
        this.props.history.push({
            pathname: '/testRouter',
            state: this.props.location.state
        });

    }
    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get('http://localhost:3000/api/book')
            .then(res => {
                // this.setState({ books: res.data });
                // console.log(res);
            })
            .catch((error) => {
                if(error.response.status === 401) {
                    this.props.history.push("/login");
                }
            });
    }
    textChange(e){
        this.setState({
            courseId:e.target.value,
        });
    }
    logout = () => {
        localStorage.removeItem('jwtToken');
        window.location.reload();
    }
    render(){
        const { name, username, role, courses, id } = this.state;
        return(<div>
            <div>
                <p>{id}</p>
                <p>{name}</p>
                <p>{username}</p>
                <p>{role}</p>
                <p>Tests: </p>
                <p>{this.state.courses.map(function (input, index) {
                    // console.log(input);
                    return <p>{input.courseName}</p>
                })}</p>
            </div>
            {/*<div><input type={"text"} onChange={this.textChange}></input></div>*/}
            {/*<button disabled={!this.state.enabled} onClick={this.click}>Test Click</button>*/}
            {/*<button onClick={this.clickCourses}>Courses Click</button>*/}
            {/*<button onClick={this.clickCreateCourses}>CreateCourse Click</button>*/}
            {/*<button onClick={this.clickChangeCourses}>ChangeCourse Click</button>*/}
            {/*<button onClick={this.clickTakeCourses}>Take Click</button>*/}
            {/*<button onClick={this.clickLookUpMyStuff}>Look Click</button>*/}
            {/*<button onClick={this.clickAdminPage}>AdminAll Click</button>*/}
            {/*<button onClick={this.clickAdminPageCreator}>AdminCreator Click</button>*/}
            {/*<button onClick={this.pop}>pop Click</button>*/}
            {/*<button onClick={this.clickTest}>test Click</button>*/}
            {/*<button onClick={this.click}>Click</button>*/}
            {/*<button onClick={this.logout}>logout</button>*/}
        </div>);
    };

}
export default userInfo;