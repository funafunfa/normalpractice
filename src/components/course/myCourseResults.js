import React, { Component } from 'react';
import axios from 'axios';

class DataShower extends Component{
    constructor(props){
        super(props);
        this.state = {
            courseName: "",
            userName: "",
        };
        this.getData = this.getData.bind(this);
        this.setUserData = this.setUserData.bind(this);
        this.setCourseData = this.setCourseData.bind(this);
        this.getData(this.props.data.courseId, this.props.data.userId);
        // /tanya/user/
        // /tanya/course/:id
    }
    getData(courseId, userId){

        axios.post('http://localhost:3000/tanya/user/' + userId)
            .then(response => this.setUserData(response.data));

        axios.post('http://localhost:3000/tanya/course/' + courseId)
            .then(response => this.setCourseData(response.data[0]));
    }

    setUserData(userId){
        console.log("userData", userId);
        this.setState({
            userName:userId.name
        });
    }
    setCourseData(courseId){
        this.setState({
            courseName:courseId.courseName
        });

        console.log("courseData", courseId);

    }

    render(){
        const input = this.props.data;
        const state = this.state;
        console.log("ss", state);
        return(<div><div>
            {/*<p>ID {input._id}</p>*/}
            <p>courseId {state.courseName}</p>
            <p>userId {state.userName}</p>
            <h6>TestResults</h6>
            <p>{input.testResult.map(function (inp) {
                return <div>
                    <p>Test number {inp.testNumber} Result {inp.correctAnswersNum}/{inp.allQuestionsNum}</p>
                    {/*<p>allQuestionsNum{inp.allQuestionsNum} testNumber {inp.testNumber}</p>*/}
                    {/*<p>correctAnswers {inp.correctAnswers.map(function (inp) {*/}
                        {/*return <div>*/}
                            {/*<p>answer {inp.answer} number {inp.number}</p>*/}
                        {/*</div>*/}
                    {/*})}</p>*/}
                    {/*<p>correctAnswersNum {inp.correctAnswersNum} themeNum {inp.themeNum}</p>*/}
                </div>
            })}</p>
            <hr></hr>

        </div></div>);
    }
}
class seeTestResults extends Component{
    constructor(props){
        super(props);
        this.state = {
            data:[]
        }
        this.getData = this.getData.bind(this);

        axios.get('http://localhost:3000/tanya/course/courseisdone/creator/' + localStorage.getItem("id"))
            .then(response => this.getData(response.data));
    }
    getData = (data) =>{
        let da = this.state.data;
        data.map(function (data) {
            da.push(<DataShower data = {data}/>);
        })
        this.setState({
            data:da
        })
        // console.log(da)
    };

    render(){
        return(
            <div>
                <h3>{localStorage.getItem("name")}</h3>
                {/*<h3></h3>*/}
                <div>{this.state.data.map(function (input, index) {
                    return input
                })}</div>
            </div>
        );
    }
}

export default seeTestResults;