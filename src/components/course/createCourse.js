import React, { Component } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
// import request from 'superagent';
// import { Button, Input, Label, Container, Col } from 'reactstrap';
import CreateTest from "../test/createTest";

class Theme extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: "",
            text: "",
            file:"",
            tests:[],
            testCounter: 0,
            buttonEnabled: false,


        };
        this.handleText = this.handleText.bind(this);
        // this.onDrop = this.onDrop.bind(this);
        this.addTest = this.addTest.bind(this);
        this.disTest = this.disTest.bind(this);
    }
    handleForm = (value) => {
        console.log(value);
        this.props.onSelectTest(value);
    };
    onDrop(files) {
        this.props.onSelectFile({number:this.props.number, file:files});

        console.log(files);
        this.setState({
            file:files,
        });
    }
    handleText(event){
        let number = this.props.number;
        if(event.target.name === "themeName"){
            this.setState({
                title:event.target.value
            })
            this.props.onSelectLanguage(number + "TN" + event.target.value);
        } else if(event.target.name === "themeText"){
            this.setState({
                text:event.target.value
            })
            this.props.onSelectLanguage(number + "TT" + event.target.value);

        }

        if(this.state.text === "" && this.state.title === ""){
            this.setState({
                buttonEnabled:true
            })
        }else {
            this.setState({
                buttonEnabled:false
            })
        }
    }
    addTest(event){
        if(event) event.preventDefault();


        const u = this.state.tests;
        // console.log(u.length);
        let i = this.state.testCounter;
        // let z = this.props.number;
        u[i] = <div key={i}><CreateTest number = {this.props.number} numberTest = {i} onForm = {this.handleForm}/></div>;
        i++;
        this.setState({
            tests: u, testCounter:i
        })

    };

    disTest(event){
        if(event) event.preventDefault();

        const inputList = this.state.tests;
        let i = this.state.testCounter;
        if(i > 0){
            i--;
            inputList.pop();
            this.setState({
                tests: inputList, testCounter: i
            });
        }


    };
    render(){
        const styleDropzone = {
            width : "100%",
            height : "20%",
            border : "1px solid black",
            textAlign: 'center',
            borderRadius: 5,
        };

        const styleDropzoneP = {
            marginTop:10,

        };
            return (<div>
                <FormGroup>
                    <Label for="themeName">Theme Name</Label>
                    <Input onChange={this.handleText} type="text" name="themeName" id="themeName"/>
                </FormGroup>
                <FormGroup>
                    <Label for="themeText">Theme Text</Label>
                    <Input onChange={this.handleText} type="text" name="themeText" id="themeText"/>
                </FormGroup>
                <FormGroup>
                    <Dropzone style={styleDropzone} multiple={true} onDrop={this.onDrop.bind(this)}>
                        <p style={styleDropzoneP}>Not working.</p>
                    </Dropzone>
                </FormGroup>
                <FormGroup>

                    <Button color="success" onClick={this.addTest}>Add Test</Button>{' '}
                    <Button color="danger" onClick={this.disTest}>Delete Test</Button>{' '}
                </FormGroup>
                <FormGroup>
                    {this.state.tests.map(function (input, index) {
                        return <div>{input}</div>
                    })}
                </FormGroup>

                {/*<Button color="secondary" name = {"create"} onClick={this.handleTestButtons}>Create Test</Button>{' '}*/}
                {/*<a>  Or  </a>*/}
                {/*<Button color="secondary" name = {"select"} onClick={this.handleTestButtons}>Select Test</Button>{' '}*/}

            </div>);
    }
}

class Course extends Component{
    constructor(props){
        super(props);
        this.state = {
            elementName: props.elementName,
            courseText:"",
            themes: [<div key={0}><Theme onSelectTest = {this.handleTest} onSelectLanguage={this.handleName} onSelectFile={this.handleFile} number = {0}/></div>],
            counter: 1,
            inData:[],
        };


        this.handleName = this.handleName.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.addButton = this.addButton.bind(this);
        this.disButton = this.disButton.bind(this);
        this.sendData = this.sendData.bind(this);
        this.handleChangeOption = this.handleChangeOption.bind(this);
    }
    handleFile = (langValue) => {
        console.log(langValue);
        let array = this.state.inData;
        let themeNumber = langValue.number;
        if(typeof array[themeNumber] !== 'undefined'){
                array[themeNumber].file = langValue.file;
        }else{
            array[themeNumber] = {themeText: "", themeTitle: "", file: ""};
            array[themeNumber].file = langValue.file;
        }



        this.setState({
            inData: array
        });
        // this.props.onSelectLanguageTwo(langValue);
        // var lang = this.dropdown.value;
        // this.props.onSelectLanguage(lang);
    };

    handleTest = (value) => {
        console.log("olo", value);
        let array = this.state.inData;
        if(array[value.numberTheme][value.numberTheme])
            array[value.numberTheme].tests.push({data: value.data, testNumber: value.numberTest});
        let v = this.state.inData;
        if(!v[value.numberTheme].tests[value.numberTest]){
            v[value.numberTheme].tests[value.numberTest] = [];
            v[value.numberTheme].tests[value.numberTest].push({data: value.data, testNumber: value.numberTest});
        }else{
            v[value.numberTheme].tests[value.numberTest].push({data: value.data, testNumber: value.numberTest});
        }
        this.setState({
            inData:v
        })
    }


    handleName = (langValue) => {
        console.log(langValue);
        let array = this.state.inData;
        let themeNumber = langValue.charAt(0);
        if(typeof array[themeNumber] !== 'undefined'){
            let themeElementChoozer = langValue.charAt(1) + langValue.charAt(2);
            if(themeElementChoozer === "TT"){
                let themeText = langValue.substr(3, langValue.length);
                array[themeNumber].themeText = themeText;
            }
            if(themeElementChoozer === "TN"){
                let themeTitle = langValue.substr(3, langValue.length);
                array[themeNumber].themeTitle = themeTitle;
            }
        }else{
            array[themeNumber] = {themeText: "", themeTitle: "", file: "", tests:[]};
            let themeElementChoozer = langValue.charAt(1) + langValue.charAt(2);
            if(themeElementChoozer === "TT"){
                let themeText = langValue.substr(3, langValue.length);
                array[themeNumber].themeText = themeText;
            }
            if(themeElementChoozer === "TN"){
                let themeTitle = langValue.substr(3, langValue.length);
                array[themeNumber].themeTitle = themeTitle;
            }
        }



        this.setState({
            inData: array
        });
        // this.props.onSelectLanguageTwo(langValue);
        // var lang = this.dropdown.value;
        // this.props.onSelectLanguage(lang);
    };

    addButton(event){
        // event.preventDefault();
        const u = this.state.themes;
        // console.log(u.length);
        let i = this.state.counter;
        // let z = this.props.number;
        u[i] = <div key={i}><Theme onSelectLanguage={this.handleName} onSelectTest = {this.handleTest} onSelectFile={this.handleFile} number = {i}/></div>;
        i++;
        this.setState({
            themes: u, counter:i
        })
    };

    sendData(event){
        let formElements = this.state.inData;
        let courseTitle = this.state.courseText;
        console.log(formElements);
        console.log(courseTitle);

        // fetch('http://localhost:3000/tanya/admin/createCourse', {
        fetch('http://localhost:3000/tanya/admin/createCourse', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: formElements,
                name: courseTitle,
                creatorId: localStorage.getItem("id"),
                secondParam: 'yourOtherValue',
            })
        }).then(function(response) {
            console.log(response)
        })
        window.location.reload();

    };

    disButton(event){
        if(event) event.preventDefault();

        const inputList = this.state.themes;
        let i = this.state.counter;
        if(i !== 1){
            i--;
            inputList.pop();
            this.setState({
                themes: inputList, counter: i
            });
        }

    };

    handleChangeOption(event){
        if(event) event.preventDefault();
        if (event.target.name === "courseName"){
            this.setState({
                courseText: event.target.value
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
        const style = {
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 20,
        }
        return <div style={style}>
            <FormGroup>
                <Label for="exampleEmail">Course</Label>
                <Input type="text" onChange = {this.handleChangeOption} name="courseName" id="courseName" placeholder="Course Name" />
            </FormGroup>
            <FormGroup>
                <Button color="primary" onClick={this.addButton}>Add Theme</Button>{' '}
                <Button color="danger" onClick={this. disButton}>Delete Theme</Button>{' '}
            </FormGroup>

            {this.state.themes.map(function (input, index) {
                return input
            })}

            <FormGroup>
                <Button color="success" block onClick={this.sendData}>Send</Button>{' '}
            </FormGroup>
        </div>
    };
}




export default Course;