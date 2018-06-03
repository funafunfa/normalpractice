import React, { Component } from 'react';
import axios from 'axios';
// import request from 'superagent';
// import { Button, Input, Label, Container, Col } from 'reactstrap';

class Option extends Component{
    constructor(props){
        super(props);
        this.state = {
            elementName: props.elementName,
            optionText:"",
            trueAnswer: false
        };
        this.handleChangeOption = this.handleChangeOption.bind(this);
    }
    handleChangeOption(event){
        // event.preventDefault();
        if (event.target.name === this.state.elementName){
            this.setState({
                optionText: event.target.value
            })
        }
        if (event.target.name === this.state.elementName + "C"){
            let checkbox = this.state.trueAnswer;
            this.setState({
                trueAnswer: !checkbox
            })
        }
    }

    render(){
        return <div><input name={this.state.elementName} onChange={this.handleChangeOption} placeholder={this.state.elementName + " answer" +
        " option"}/><input name = {this.state.elementName + "C"} value={this.state.elementName} onChange={this.handleChangeOption} type="checkbox"/></div>
    };
}

class Question extends Component{
    constructor(props){
        super(props);
        this.state = {
            elementName: props.elementName,
            optionArray: [<Option elementName = {props.elementName + "_" + 0 + "A"}/>,<Option elementName = {props.elementName + "_" + 1 + "A"}/>],
            questionText:"",
            counter: 2,
        };
        this.handleChangeQuestion = this.handleChangeQuestion.bind(this);
        this.addButton = this.addButton.bind(this);
        this.disButton = this.disButton.bind(this);

    };


    handleChangeQuestion(event){
        event.preventDefault();
        if (event.target.name === "questionInput"){
            this.setState({
                questionText: event.target.value
            })
        }
    };

    addButton(event){
        event.preventDefault();
        const u = this.state.optionArray;
        // console.log(u.length);
        let i = this.state.counter;
        // let z = this.props.number;
        u[i] = <div key={i}><Option elementName = {this.state.elementName + "_" + this.state.counter + "A"}/></div>;
        i++;
        this.setState({
            optionArray: u, counter:i
        })
    };

    disButton(event){
        event.preventDefault();
        const inputList = this.state.optionArray;
        let i = this.state.counter;
        if(i !== 2){
            i--;
            inputList.pop();
            this.setState({
                optionArray: inputList, counter: i
            });
        }

    };



    render(){
        let divStyle = {
            marginWidth:10
        };
        return <div>
            <input  name = {this.state.elementName} placeholder={this.state.elementName + " question text"} onChange={this.handleChangeQuestion}/>
            <div><button size="sm" color="primary" onClick={this.addButton}>+</button><button size="sm" color="danger" onClick={this.disButton}>-</button></div>
            <div style={divStyle}>{this.state.optionArray.map(function (input, index) {
                return input
            })}</div>
            <br></br>
        </div>
    };
}

class QuestionSet extends Component{
    constructor(props){
        super(props);
        this.state = {
            questionSetName: "",
            elementName: props.elementName,
            questionArray: [<Question elementName = {0 + "Q"}/>],
            counter: 1,
            timer: 0,
        };
        this.handleChangeQuestionSet = this.handleChangeQuestionSet.bind(this);
        this.handleChangeTimer = this.handleChangeTimer.bind(this);
        this.addButtonQuestion = this.addButtonQuestion.bind(this);
        this.disButtonQuestion = this.disButtonQuestion.bind(this);
        this.adamSender = this.adamSender.bind(this);
    }

    handleChangeQuestionSet(event){
        event.preventDefault();
        if (event.target.name === "questionSetInput"){
            this.setState({
                questionSetName: event.target.value
            })
        }
    };

    handleChangeTimer(event){
        event.preventDefault();
        if (event.target.name === "timerInput"){
            this.setState({
                timer: event.target.value
            })
        }
    };

    adamSender(event){
        event.preventDefault();
        // const data = new FormData(event.target);
        // console.log(data);
        // console.log(event.target.elements.);

        // event.preventDefault();
        let formElements = event.target.elements;
        let formData = {
            questions: [
                {questionName: "",
                    answers: [
                        {answerNumber: 0,
                            answerText: "",
                            answerTrue: ""}
                    ]}
            ]
        };
        let form = {testName:formElements[0].value,timer:formElements[1].value, questions: []};

        console.log(formElements);

        Object.keys(formElements).forEach((key) => {
            if (formElements[key].type === 'text') {
                // if (formElements[key].value !== ""){
                //     if(formElements[key].name.charAt(2) === ""){
                //         form[formElements[key].name.charAt(0)].questions.push(
                //             {questionName:formElements[key].value,
                //                 answers:[]
                //             });
                //     }
                // }
                if(formElements[key].name.charAt(2) === ""){
                    form.questions[formElements[key].name.charAt(0)] = {
                        question:formElements[key].value,
                        textQ:formElements[key].name.charAt(0),
                        time: 120,
                        options: [],
                    };
                    // form[formElements[key].name.charAt(0)].questions.push();
                    // console.log("question", formElements[key].name);
                    // console.log("question value", formElements[key].value);
                    // console.log("q_key", key);
                }else if(formElements[key].name.charAt(2) === "_"){
                    // console.log("option", formElements[key].name);
                    // console.log("option value", formElements[key].value);
                    form.questions[formElements[key].name.charAt(0)].options.push({textO:formElements[key].value});
                }

                // console.log("o_key", key);
            }
            if(formElements[key].type === 'checkbox'){
                if(formElements[key].name.charAt(5) === "C"){
                    console.log("option", formElements[key].name);
                    console.log("option value", formElements[key].checked ? "true" : "false");
                    form.questions[formElements[key].name.charAt(0)].options[formElements[key].name.charAt(3)].t = formElements[key].checked ? "true" : "false";
                }
            }

        });



        // console.log('formData', formData);
        console.log('form', form);

        fetch('http://localhost:3000/tanya/admin/createTest', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: form,
                name: "Dimas",
                secondParam: 'yourOtherValue',
            })
        }).then(function(response) {
            console.log(response)
        })
    };

    addButtonQuestion(event){
        event.preventDefault();
        const u = this.state.questionArray;
        // console.log(u.length);
        let i = this.state.counter;
        // let z = this.props.number;
        u[i] = <div key={i}><Question elementName = {this.state.counter + "Q"}/></div>;
        i++;
        this.setState({
            questionArray: u, counter:i
        })
    };

    disButtonQuestion(event){
        event.preventDefault();
        const inputList = this.state.questionArray;
        let i = this.state.counter;
        if(i != 1){
            i--;
            inputList.pop();
            this.setState({
                questionArray: inputList, counter: i
            });
        }

    };
    render(){
        return <div><form onSubmit={this.adamSender}>
            <input  name = {"questionSetInput"} placeholder={"questionSet Name"} onChange={this.handleChangeQuestionSet}/>
            <input  name = {"timerInput"} placeholder={"timerInput"} onChange={this.handleChangeTimer}/>
            <div><button color="primary" onClick={this.addButtonQuestion}>++</button><button color="danger" onClick={this.disButtonQuestion}>--</button></div>
            <div >{this.state.questionArray.map(function (input, index) {
                return input
            })}</div>
            <div><button color="success">Send data</button></div>
        </form></div>
    };
}



export default QuestionSet;