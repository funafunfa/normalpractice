import React, { Component } from 'react';
import axios from 'axios';
// import request from 'superagent';
// import { Button, Input, Label, Container, Col } from 'reactstrap';
import Select from 'react-select';

class Option extends Component{
    constructor(props){
        super(props);
        if(props.dataInOption){
            this.state = {
                elementName: props.elementName,
                optionText:"",
                trueAnswerText: props.dataInOption.t,
                trueAnswer:"",
                dataInOption: props.dataInOption,

            };
            if(this.state.trueAnswerText === "true"){
                this.state.trueAnswer = true;
            }
            this.state.optionText = props.dataInOption.textO;

        }else{
            this.state = {
                elementName: props.elementName,
                optionText:"",
                trueAnswer: "",
                dataInOption: "",

            };
        }


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
        return <div><input name={this.state.elementName} value={this.state.optionText} onChange={this.handleChangeOption} placeholder={this.state.elementName + " answer" +
        " option"}/><input name = {this.state.elementName + "C"} checked = {this.state.trueAnswer} value={this.state.elementName} onChange={this.handleChangeOption} type="checkbox"/></div>
    };
}

class Question extends Component{
    constructor(props){
        super(props);
        this.state = {
            elementName: props.elementName,
            optionArray: [],
            questionText:"",
            counter: 0,
            dataInQuestion:"",

        };
        if(props.dataInQuestion){
            this.state.dataInQuestion = props.dataInQuestion;
        }
        this.handleChangeQuestion = this.handleChangeQuestion.bind(this);
        this.addButton = this.addButton.bind(this);
        this.disButton = this.disButton.bind(this);

        console.log(this.state.dataInQuestion);
        const u = this.state.optionArray;
        // console.log(u.length);
        if(this.state.dataInQuestion.options){
            let dat = this.state.dataInQuestion.options;
            let x = 0;
            for(let z = 0; z <= dat.length-1; z++){
                // u[z] = <div key={z}><Question elementName = {z + "Q"} dataInQuestion =   {this.state.dataIn.qustions[z]}/></div>;
                u[z] = <div key={z}><Option elementName = {this.state.elementName + "_" + z + "A"} dataInOption = {dat[z]}/></div>;
                x = z;
                console.log(dat);
                // console.log(x);
            }
            this.setState({
                optionArray: u, counter:x
            });
            this.state.questionText = props.dataInQuestion.question;
            x++;
            this.state.counter = x;
        }


    };


    handleChangeQuestion(event){
        event.preventDefault();
        if (event.target.name === this.state.elementName){
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

            i--;
            inputList.pop();
            this.setState({
                optionArray: inputList, counter: i
            });


    };



    render(){
        let divStyle = {
            marginWidth:10
        };
        return <div>
            <input  name = {this.state.elementName} placeholder={this.state.elementName + " question text"} value={this.state.questionText} onChange={this.handleChangeQuestion}/>
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
        if(props.dataIn){
            this.state = {
                questionSetName: props.dataIn[0].data.testName,
                elementName: props.elementName,
                questionArray: [],
                counter: 0,
                timer: props.dataIn[0].data.timer,
                dataIn: props.dataIn[0].data,
                description:props.dataIn[0].data.description
            };
        }else{
            this.state = {
                questionSetName:"",
                elementName: "",
                questionArray: [],
                counter: 0,
                timer: "",
                dataIn: "",
                description:""
            };
        }

        this.handleChangeQuestionSet = this.handleChangeQuestionSet.bind(this);
        this.handleChangeTimer = this.handleChangeTimer.bind(this);
        this.addButtonQuestion = this.addButtonQuestion.bind(this);
        this.disButtonQuestion = this.disButtonQuestion.bind(this);
        this.adamSender = this.adamSender.bind(this);

        if(props.dataIn){
            console.log(this.state.dataIn);
            console.log("DATA", this.state.dataIn);
            const u = this.state.questionArray;
            // console.log(u.length);
            let x = 0;
            for(let z = 0; z <= this.state.dataIn.questions.length-1; z++){
                u[z] = <div key={z}><Question elementName = {z + "Q"} dataInQuestion = {this.state.dataIn.questions[z]}/></div>;
                x = z;
            }
            this.setState({
                questionArray: u, counter:x
            })
            x++;
            this.state.counter = x;
        }

    }

    handleChangeQuestionSet(event){
        event.preventDefault();
        if (event.target.name === "questionSetInput"){
            this.setState({
                questionSetName: event.target.value
            })
        }
        else if (event.target.name === "description"){
            this.setState({
                description: event.target.value
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
        let form = {testName:formElements[0].value,timer:formElements[1].value,description:this.state.description, questions: []};

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


        // fetch('http://localhost:3000/tanya/changeTest', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         data: form,
        //         oldId: this.state.dataIn._id,
        //         name: "Dimas",
        //         secondParam: 'yourOtherValue',
        //     })
        // })

        this.props.onTestDone({numberTheme: this.props.number,numberTest:this.props.numberTest, data:form});

        // // console.log('formData', formData);
        // let changed = [];
        // let dataIn = this.state.dataIn;
        console.log('formIn', this.state.dataIn._id);
        // console.log('formOut', form);
        //
        // if(dataIn.testName !== form.testName)changed.push({name:"testName", was:dataIn.testName, now:form.testName})
        // if(dataIn.timer !== form.timer)changed.push({name:"timer", was:dataIn.timer, now:form.timer});
        // for(let i = 0; i<=dataIn.questions.length-1;i++){
        //
        // }
        // console.log('changed', changed);
        // window.location.reload();

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
            i--;
            inputList.pop();
            this.setState({
                questionArray: inputList, counter: i
            });

    };
    render(){
        return <div><form onSubmit={this.adamSender}>
            <input  name = {"questionSetInput"} value={this.state.questionSetName} placeholder={"questionSet Name"} onChange={this.handleChangeQuestionSet}/>
            <input  name = {"timerInput"} value={this.state.timer} placeholder={"timerInput"} onChange={this.handleChangeTimer}/>
            <input  name = {"description"} value={this.state.description} placeholder={"description"} onChange={this.handleChangeQuestionSet}/>
            <div><button color="primary" onClick={this.addButtonQuestion}>++</button><button color="danger" onClick={this.disButtonQuestion}>--</button></div>
            <div >{this.state.questionArray.map(function (input, index) {
                return input
            })}</div>
            <div><button color="success">Send data</button></div>
        </form></div>
    };
}

class BigQuestionSet extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: "",

        };

        //
        var id = "5b105df47e857f5fd0eb1634";
        axios.get('http://localhost:3000/tanya/test/' + this.props.id)
            .then(response => this.setState({data: <QuestionSet dataIn = {response.data[0]}/>}));

    }
    render(){
        return(<div>{this.state.data}</div>);
    }
}

class SelectorTest extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedOption: '',
            options: [],
            test: "",
            testing:false
        };
        this.buttonClick = this.buttonClick.bind(this);

        axios.get('http://localhost:3000/tanya/test/testTitles')
            .then(response => this.handleRequsetTitles(response.data));
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        // selectedOption can be null when the `x` (close) button is clicked
        if (selectedOption) {
            console.log(`Selected: ${selectedOption.label}`);
        }
    }

    handleRequsetTitles = (data) => {
        // console.log("test " + langValue);
        let op = this.state.options;

        data.map(function (input, index) {
            op.push({value: input.id, label: input.title});
        });

        this.setState({
            options: op,
        })
        // var lang = this.dropdown.value;
        // this.props.onSelectLanguage(lang);
    };

    buttonClick(){
        console.log("test " + this.state.selectedOption.value);
        this.setState({
            test:<BigQuestionSet id = {this.state.selectedOption.value}/>,
            testing: true,
        })
        // axios.get('http://localhost:3000/tanya/' + this.state.selectedOption.value)
        //     .then(response => this.handleRequsetTest(response.data));
    };

    // handleRequsetTest = (data) => {
    //     console.log(data[0]);
    //     this.setState({
    //         test:<Test id = {data}/>,
    //         testing: true,
    //     })

    // };

    render() {
        const { selectedOption } = this.state;
        if(!this.state.testing){
            return (
                <div>
                    <Select
                        name="form-field-name"
                        value={selectedOption}
                        onChange={this.handleChange}
                        options={this.state.options}
                    />
                    <button disabled = {!selectedOption} onClick={this.buttonClick}>Choose test</button>
                </div>


            );
        }if(this.state.testing){
            return (
                <div>
                    {this.state.test}
                </div>


            );
        }

    }
}


export default QuestionSet;