import React, { Component } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone'
import { Collapse, CardBody, Card } from 'reactstrap';

import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import doTest from "../test/doTest"
import ReactCountdownClock from 'react-countdown-clock';
import { RadioGroup, RadioButton, ReversedRadioButton } from 'react-radio-buttons';
import Select from 'react-select';
// class SimpleReactFileUpload extends React.Component {
//
//     constructor(props) {
//         super(props);
//         this.state ={
//             file:null
//         }
//         this.onFormSubmit = this.onFormSubmit.bind(this)
//         this.onChange = this.onChange.bind(this)
//         this.fileUpload = this.fileUpload.bind(this)
//     }
//     onFormSubmit(e){
//         e.preventDefault() // Stop form submit
//         this.fileUpload(this.state.file).then((response)=>{
//             console.log(response.data);
//         })
//     }
//     onChange(e) {
//         this.setState({file:e.target.files})
//     }
//     fileUpload(file){
//         const url = 'http://localhost:3000/upload';
//         const formData = new FormData();
//         for(let z =0; z <= file.length-1;z++){
//             formData.append('file',file[z])
//         }
//         formData.append('data', "asd");
//         const config = {
//             headers: {
//                 'content-type': 'multipart/form-data'
//             }
//         }
//         return  post(url, formData,config)
//     }
//
//     render() {
//         return (
//             <div>
//                 <button type="submit">Upload</button>
//
//                 <Dropzone multiple={true} onDrop={this.fileUpload}>
//                 <p>Not working.</p>
//
//             </Dropzone></div>
//
//
//         );
//     }
// }
//
//
//
// export default SimpleReactFileUpload
class RadioSS extends Component{
    constructor(props){
        super(props);
        this.state = {
            options: [
                {textO: "1", t: true},
                {textO: "2", t: false},
                {textO: "3", t: false},
                {textO: "4", t: false}
            ], oArray: [],
            checked: false,
        };

        // this.handleName = this.handleName.bind(this);
        //
        let o = this.state.oArray;
        let os  = this.props.zzz;
        // console.log("os" + os);
        for (let i = 0; i<=this.props.zzz.length-1; i++){
            o.push(<ReversedRadioButton rootColor = {"#000000"} name = {this.props.zz + "_" + i} value={i + "_" + os[i].textO}>
                {os[i].textO}
            </ReversedRadioButton>);

        }
        this.setState({
            oArray:o,
        })
    }

    handleName = (langValue) => {
        console.log(langValue);
        console.log("onChange " + langValue);
        // this.setState({
        //     passing: langValue
        // });
        this.props.onSelectLanguage(this.props.zz + "_" + langValue);
        // var lang = this.dropdown.value;
        // this.props.onSelectLanguage(lang);
    };


    render(){
        // console.log("zzz" + this.props.zzz);

        return(<div><RadioGroup onChange={ this.handleName } vertical="true">
            {this.state.oArray.map(function (input, index) {
                return input
            })}
        </RadioGroup></div>);
    }
}

class Question extends Component {

    constructor(props){
        super(props);
        this.state = {
            qCounter: 0,
            qText: "Hello",
            qOptions: [],
        };
        this.handleName = this.handleName.bind(this);
        this.handleClick = this.handleClick.bind(this);



        let qIn = this.props.optionsText;
        // console.log("qIn" + this.props.optionsText);
        let qOut = this.state.qOptions;
        for(let i = 0; i <=qIn.length-1; i++){
            //отправка данных в Option через пропс Question
            qOut.push(qIn[i].textO);
        }
        this.setState({tQuestions:qOut});

        let test = {name: "FirstTest", questions:[
            {textQ: "1", answer: "dasdas", options: [
                {textO: "1", t: true},
                {textO: "2", t: false},
                {textO: "3", t: false},
                {textO: "4", t: false}
            ]},
            {textQ: "2", answer: "dasdas", options: [
                {textO: "A", t: true},
                {textO: "B", t: false},
                {textO: "C", t: false},
                {textO: "D", t: false}
            ]
            }
        ]
        };


    }


    handleName = (langValue) => {
        // console.log("Q" + langValue);
        // this.setState({
        //     passing: langValue
        // });
        this.props.onSelectLanguageTwo(langValue);
        // var lang = this.dropdown.value;
        // this.props.onSelectLanguage(lang);
    };

    handleClick () {
        // axios.get('http://localhost:3000/tanya_test')
        //     .then(response => console.log(response))
        console.log("+")
    }

    render() {
        // console.log(this.props.optionsText);

        return (

            <div>
                {/*//получение данных в Question из пропса в Test*/}
                <div><p>#{this.props.number} {this.props.questionName}</p></div>
                <div><RadioSS  zz = {this.props.number} zzz = {this.props.optionsText} onSelectLanguage={this.handleName}/></div>
            </div>);
    }
}

class Test extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tTitle: "   ",
            tTimer: 0,
            tNumbQuest: 0,
            tAnswQuest: 0,
            tQuestions: [],
            inputQuest: [
                {
                    textQ: "1", time: 120, question: "Первый вопрос", options: [
                    {textO: "1", t: true},
                    {textO: "2", t: false},
                    {textO: "3", t: false},
                    {textO: "4", t: false}
                ]
                },
                {
                    textQ: "2", question: "Второй вопрос", options: [
                    {textO: "A", t: true},
                    {textO: "B", t: false},
                    {textO: "C", t: false},
                    {textO: "D", t: false}
                ]
                },
                {
                    textQ: "3", question: "7777опрос", options: [
                    {textO: "Q", t: true},
                    {textO: "S", t: false},
                    {textO: "G", t: false},
                    {textO: "S", t: false}
                ]
                },
                {
                    textQ: "4", question: "Вт55й вопрос", options: [
                    {textO: "2", t: true},
                    {textO: "3", t: false},
                    {textO: "Z", t: false},
                    {textO: "B", t: false}
                ]
                },
                {
                    textQ: "5", question: "Второй вопрос", options: [
                    {textO: "N", t: true},
                    {textO: "SD", t: false},
                    {textO: "T", t: false},
                    {textO: "Q", t: false}
                ]
                }
            ],
            response: "",
            test: "notGoing",
            answeredQ: [],
            answers: [],
            correctAnswers: [],
            inputAnswers:[],
            correctAnswersNum: 0,
            tDescription: "",



        };

        this.handleNameTest = this.handleNameTest.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickSend = this.handleClickSend.bind(this);
        this.timeIsGone = this.timeIsGone.bind(this);
        // axios.get('http://localhost:3000/tanya/test/' + this.props.id)
        //     .then(response => this.handleRequset(response.data[0]));
        console.log(props.data)
        this.handleRequset(props.data);
        // this.handleRequset(this.props.bbb[0]);
        // console.log(this.state.response);

        //Test обработка

        // qOut.push(<Question number={qIn[i].textQ} questionName={qIn[i].question} options={qIn[i].options}>);


        let test = {
            name: "FirstTest", questions: [
                {
                    textQ: "1", answer: "dasdas", options: [
                    {textO: "1", t: true},
                    {textO: "2", t: false},
                    {textO: "3", t: false},
                    {textO: "4", t: false}
                ]
                },
                {
                    textQ: "2", answer: "dasdas", options: [
                    {textO: "A", t: true},
                    {textO: "B", t: false},
                    {textO: "C", t: false},
                    {textO: "D", t: false}
                ]
                }
            ]
        };
    }

    handleRequset = (dataS) => {
        let data = dataS.data;
        console.log("DATA", data);
        console.log("test " + data.questions.length);
        this.state.tTitle = data.testName;
        this.state.tTimer = data.timer;
        this.state.tDescription = data.description;
        this.setState({
            response: data,
            tTitle: data.testName,
            tTimer: data.timer,
        });

        let qIn = data.questions;
        let qOut = this.state.tQuestions;
        // console.log(qIn.length);
        let ans = this.state.inputAnswers;
        this.state.tNumbQuest = qIn.length;
        for (let i = 0; i <= qIn.length - 1; i++) {
            //отправка данных через пропс в Question
            // console.log(qIn);
            ans.push(qIn[i].options);
            qOut.push(<Question number={qIn[i].textQ} questionName={qIn[i].question} optionsText={qIn[i].options}
                                onSelectLanguageTwo={this.handleNameTest}/>);
        }
        this.setState({tQuestions: qOut, inputAnswers:ans});


        // var lang = this.dropdown.value;
        // this.props.onSelectLanguage(lang);
    };

    handleNameTest = (langValue) => {
        console.log("test " + langValue);
        let answer = langValue.substr(4, langValue.length);
        console.log("testCropped " + answer);
        let s = this.state.tAnswQuest;
        let sS = this.state.answeredQ;
        let sSA = this.state.answers;
        sSA[langValue.charAt(0)] = {q:langValue.charAt(0), answer: answer};
        let eq = false;
        sS.map(function (input, index) {
            if (input === langValue.charAt(0)) {
                eq = true;
            }
        });

        if (!eq) {
            sS.push(langValue.charAt(0));
            s++;
        }
        this.setState({
            answeredQ: sS,
            tAnswQuest: s,
        });

        // var lang = this.dropdown.value;
        // this.props.onSelectLanguage(lang);
    };

    handleClick(event) {
        // axios.get('http://localhost:3000/tanya_test')
        //     .then(response => console.log(response))

        this.setState({
            test: "going",
        })
    };

    handleClickSend() {
        // axios.get('http://localhost:3000/tanya_test')
        //     .then(response => console.log(response))


        let answers = this.state.answers;
        let inputAnswers = this.state.inputAnswers;
        let answered = [];
        let counter = 0;
        for(let i = 0; i<=answers.length-1;i++){
            console.log(answers[i]);
            if(answers[i] !== undefined){
                console.log("inputAnswers[i] === undefined");
                console.log("answers — " + answers[i].answer + "|" + answers[i].q)
            }

        }

        for(let x = 0; x<=inputAnswers.length-1;x++){
            if(answers[x] !== undefined){
                let inputAnswer = inputAnswers[x];
                let answerAbove = answers[x].answer;
                console.log(inputAnswer);
                for(let z = 0; z<=inputAnswer.length-1;z++){

                    if(inputAnswer[z].t === "true" && answerAbove === inputAnswer[z].textO){
                        console.log("correct " + x + inputAnswer[z].textO);
                        answered.push({answer:answerAbove, number:x});
                        counter++;
                    }
                    // if(answerAbove == inputAnswer[z].textO){
                    //
                    // }
                    console.log("option" + x + "_" + z + " " + inputAnswer[z].textO);
                }
            }

        }

        // answers.map(function (answerDone, indexDone) {
        //
        // });
        //
        // inputAnswers.map(function (optionsBig, indexBig) {
        //     optionsBig.map(function (options, index) {
        //
        //         console.log("options " + indexBig + " _ " + index + " - " + options.textO)
        //     });
        // });
        this.setState({
            test: "finished",
            correctAnswers:answered,
            correctAnswersNum:counter,
        })
        this.props.testIsDone({testNumber: this.props.data.testNumber, correctAnswers: answered,correctAnswersNum: counter, allQuestionsNum:this.state.tQuestions.length});

        // console.log("eee")

    }

    timeIsGone() {
        // axios.get('http://localhost:3000/tanya_test')
        //     .then(response => console.log(response))
        let answers = this.state.answers;
        let inputAnswers = this.state.inputAnswers;
        let answered = [];
        let counter = 0;
        for(let i = 0; i<=answers.length-1;i++){
            console.log(answers[i]);
            if(answers[i] !== undefined){
                console.log("inputAnswers[i] === undefined");
                console.log("answers — " + answers[i].answer + "|" + answers[i].q)
            }

        }

        for(let x = 0; x<=inputAnswers.length-1;x++){
            if(answers[x] !== undefined){
                let inputAnswer = inputAnswers[x];
                let answerAbove = answers[x].answer;
                console.log(inputAnswer);
                for(let z = 0; z<=inputAnswer.length-1;z++){

                    if(inputAnswer[z].t === "true" && answerAbove === inputAnswer[z].textO){
                        console.log("correct " + x + inputAnswer[z].textO);
                        answered.push({answer:answerAbove, number:x});
                        counter++;
                    }
                    // if(answerAbove == inputAnswer[z].textO){
                    //
                    // }
                    console.log("option" + x + "_" + z + " " + inputAnswer[z].textO);
                }
            }

        }

        // answers.map(function (answerDone, indexDone) {
        //
        // });
        //
        // inputAnswers.map(function (optionsBig, indexBig) {
        //     optionsBig.map(function (options, index) {
        //
        //         console.log("options " + indexBig + " _ " + index + " - " + options.textO)
        //     });
        // });
        this.setState({
            test: "finished",
            correctAnswers:answered,
            correctAnswersNum:counter,
        })

        this.props.testIsDone({correctAnswers: this.state.correctAnswers,correctAnswersNum: this.state.correctAnswersNum, allQuestionsNum:this.state.tQuestions.length});

    };




    render() {
        if (this.state.test === "going"){
            return (

                <div>
                    <div><p>Заголовок {this.state.tTitle}</p></div>
                    <div><p>Описание {this.state.tDescription}</p></div>
                    <div><p>Таймер {<ReactCountdownClock seconds={this.state.tTimer} color="#777" alpha={0.9} size={75} onComplete={this.timeIsGone}/>}</p></div>
                    <div><p>Количество ответов {this.state.tAnswQuest}</p></div>
                    <div><p>Количество вопросов {this.state.tNumbQuest}</p></div>
                    <div>{this.state.tQuestions.map(function (input, index) {
                        return input
                    })}</div>
                    <div><button name = {"SendData"} onClick={this.handleClickSend}>SendData</button></div>

                </div>)
        }else if(this.state.test === "notGoing"){
            return (
                <div>
                    <div><p>Заголовок {this.state.tTitle}</p></div>
                    <div><p>Описание {this.state.tDescription}</p></div>
                    <div><button name = {"startTest"} onClick={this.handleClick}>Start Test</button></div>


                </div>)
        }else if(this.state.test === "finished"){
            return (
                <div>
                    <div><p>Заголовок {this.state.tTitle}</p></div>
                    <div><p>Описание {this.state.tDescription}</p></div>
                    <div><p>Test is done</p></div>
                    <div><p>Correct {this.state.correctAnswersNum}/{this.state.tQuestions.length}</p></div>
                    {/**/}

                </div>)
        }
        ;
    }



}


class Theme extends Component{
    constructor(props){
        super(props);
        if(this.props.data){
            this.state = {
                title: this.props.data.themeName,
                text: this.props.data.themeText,
                file:"",
                tests:[],
                testCounter: 0,
                buttonEnabled: false,
                collapse: false,

            };
            this.props.onSelectLanguage(0 + "TN" + this.props.data.themeName);
            this.props.onSelectLanguage(0 + "TT" + this.props.data.themeText);
        }else{
            this.state = {
                title: "",
                text: "",
                file:"",
                tests:[],
                testCounter: 0,
                buttonEnabled: false,
                collapse: false,

            };
        }

        this.handleText = this.handleText.bind(this);
        this.addTest = this.addTest.bind(this);
        this.disTest = this.disTest.bind(this);
        this.handleForm = this.handleForm.bind(this);
        this.handleTest= this.handleTest.bind(this);
        this.toggle= this.toggle.bind(this);
        this.handleTestIsDone= this.handleTestIsDone.bind(this);
        // this.onDrop = this.onDrop.bind(this);
    }
    toggle() {
        this.setState({ collapse: true });
    }
    componentDidMount(){
        this.handleTest(this.props.data.tests)
        // this.handleTest(this.props.data.tests[this.props.number])
    }

    handleTestIsDone = (value) =>{
        console.log(value);
        let val = value;
        val.themeNum = this.props.number;
        this.props.onTestIsDoneTheme(val);
    };
    // this.props.testIsDone({correctAnswers: this.state.correctAnswers,correctAnswersNum: this.state.correctAnswersNum, allQuestionsNum:this.state.tQuestions.length});

handleTest = (value) => {
        let response = value;
        console.log("response.data");
        console.log(response);
        // console.log(response.themes);
        const u = this.state.tests;
        // console.log(u.length);
        let x = 0;
        // for(let b = 0, b <=response.l)
        // for(let z = 0; z <= response.length-1; z++){
        //     console.log("DAMN")
        //     u[z] = <div key={z}><Test testIsDone = {this.handleTestIsDone} elementName = {z + "C"} data = {response[z]}/></div>;
        //     // x = z;
        //     console.log("responseZ", response[z]);
        //
        // }
    for(let z = 0; z <= response.length-1; z++){
        console.log("DAMN",);
        u[z] = <div key={z}><Test testIsDone = {this.handleTestIsDone} elementName = {z + "C"} data = {response[z][0]}/></div>;
        // x = z;
        console.log("responseZ", response[z][0]);

    }
        this.setState({
            // usersIn: response,
            // doTheyIn: true,
            tests: u,
        });
    };
    handleForm = (value) => {
        console.log(value);
        this.props.onSelectTest(value);
    };

    addTest(event){
        if(event) event.preventDefault();


        const u = this.state.tests;
        // console.log(u.length);
        let i = this.state.testCounter;
        // let z = this.props.number;
        // u[i] = <div key={i}><CreateTest number = {this.props.number} numberTest = {i} onForm = {this.handleForm}/></div>;
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
    render(){
        const styleDropzone = {
            width : "100%",
            height : "20%",
            border : "1px solid black",
            textAlign: 'center',
            borderRadius: 5,
        };

        const styleAli = {
            display:"block",
            marginTop: 20,
        };

        const styleDropzoneP = {
            marginTop:10,

        };
        return (<div>
            <h3>Theme number {this.props.number}</h3>
            <FormGroup>
                <Label for="themeName">Theme Name</Label>
                <h5>{this.state.title}</h5>
                {/*<Input onChange={this.handleText} value = {this.state.title} type="text" name="themeName" id="themeName"/>*/}
            </FormGroup>
            <FormGroup>
                <Label for="themeText">Theme Text</Label>
                <h5>{this.state.text}</h5>

                {/*<Input onChange={this.handleText} value = {this.state.text} type="text" name="themeText" id="themeText"/>*/}
            </FormGroup>
            <FormGroup>
                <Label for="themeText">Theme File</Label>
                <h5>Not yet</h5>

                {/*<Input onChange={this.handleText} value = {this.state.text} type="text" name="themeText" id="themeText"/>*/}
            </FormGroup>
            <FormGroup>
                {/*<Dropzone style={styleDropzone} multiple={true} onDrop={this.onDrop.bind(this)}>*/}
                    {/*<p style={styleDropzoneP}>Not working.</p>*/}
                {/*</Dropzone>*/}

            </FormGroup>
            <FormGroup>


                {/*<Button color="danger" onClick={this.disTest}>Delete Test</Button>{' '}*/}
            </FormGroup>
            <FormGroup>
                <Button color="success" onClick={this.toggle} >Do test</Button>{' '}
                <Collapse isOpen={this.state.collapse}>
                    <Card>
                        <CardBody>
                            {this.state.tests.map(function (input, index) {
                                return <div>{input}</div>
                            })}
                        </CardBody>
                    </Card>
                </Collapse>

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
            courseText:props.data.data[0].courseName,
            // themes: [<div key={0}><Theme onSelectLanguage={this.handleName} onSelectFile={this.handleFile} number = {0}/></div>],
            themes: [],
            counter: 0,
            testCounter: 0,
            inData:[],
            tests: [],
            files: [],
            doneTests:[],
            buttonEnabled: true,
        };


        this.handleName = this.handleName.bind(this);
        this.testCounter = this.testCounter.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.addButton = this.addButton.bind(this);
        this.disButton = this.disButton.bind(this);
        this.sendData = this.sendData.bind(this);
        this.handleTest = this.handleTest.bind(this);
        this.handleChangeOption = this.handleChangeOption.bind(this);
        this.handelTestIsDoneTheme = this.handelTestIsDoneTheme.bind(this);

        this.testCounter(this.props.data.data[0].themes);
        // console.log(this.state.dataIn);
        const u = this.state.themes;
        // console.log(u.length);
        let x = 0;
        for(let z = 0; z <= this.props.data.data[0].themes.length-1; z++){
            u[z] = <div key={z}><Theme onTestIsDoneTheme = {this.handelTestIsDoneTheme} onSelectTest = {this.handleTest} onSelectLanguage={this.handleName} onSelectFile={this.handleFile} number =
                {0} data = {this.props.data.data[0].themes[z]} /></div>;
            x = z;
        }
        this.setState({
            themes: u, counter:x
        });
        x++;
        this.state.counter = x;

    }

    testCounter(tests){
        let co = 0;
        for(let i = 0;i<=tests.length-1;i++){
            co = co + tests[i].tests.length;
            console.log("ee", tests[i].tests.length)
        }
        console.log("co", co);
        this.state.testCounter = co;

        // console.log("tests", tests[0].tests);
    }
    handleFile = (langValue) => {
        console.log(langValue);
        let z = this.state.files;
        z.push(langValue);
        let array = this.state.inData;
        let themeNumber = langValue.number;
        if(typeof array[themeNumber] !== 'undefined'){
            array[themeNumber].file = langValue.file;
        }else{
            array[themeNumber] = {themeText: "", themeTitle: "", file: ""};
            array[themeNumber].file = langValue.file;
        }



        this.setState({
            inData: array,
            files: z
        });
        // this.props.onSelectLanguageTwo(langValue);
        // var lang = this.dropdown.value;
        // this.props.onSelectLanguage(lang);
    };


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
            array[themeNumber] = {themeText: "", themeTitle: "", file: "", tests: []};
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
    handelTestIsDoneTheme = (value) => {
        console.log("olo", value);
        let array = this.state.doneTests;
        array.push(value);
        if(this.state.doneTests.length === this.state.testCounter){
            this.state.buttonEnabled = false
        }
        // if(array[value.numberTheme][value.numberTheme])
        //     array[value.numberTheme].tests.push({data: value.data, testNumber: value.numberTest});
        // let v = this.state.inData;
        // if(!v[value.numberTheme].tests[value.numberTest]){
        //     v[value.numberTheme].tests[value.numberTest] = [];
        //     v[value.numberTheme].tests[value.numberTest].push({data: value.data, testNumber: value.numberTest});
        // }else{
        //     v[value.numberTheme].tests[value.numberTest].push({data: value.data, testNumber: value.numberTest});
        // }
        this.setState({
            doneTests:array
        })
    };
    addButton(event){
        // event.preventDefault();
        const u = this.state.themes;
        // console.log(u.length);
        let i = this.state.counter;
        // let z = this.props.number;
        u[i] = <div key={i}><Theme onTestIsDoneTheme = {this.handelTestIsDoneTheme} onSelectTest = {this.handleTest} onSelectLanguage={this.handleName} onSelectFile={this.handleFile} number = {i}/></div>;
        i++;
        this.setState({
            themes: u, counter:i
        })
    };

    sendData(event){
        // let formElements = this.state.inData;
        // let courseTitle = this.state.courseText;
        // console.log(formElements);
        // console.log(courseTitle);


        fetch('http://localhost:3000/tanya/course/courseisdone', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                courseId: this.props.routeData.cId,
                userId: localStorage.getItem("id"),
                testResults: this.state.doneTests,
            })
        }).then(function(response) {
            console.log(response)

        })

        this.props.onFinish("lol");
        // window.location.reload();

    };

    disButton(event){
        if(event) event.preventDefault();

        const inputList = this.state.themes;
        let i = this.state.counter;
        if( i > 0){
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
                {/*<Label for="exampleEmail">Course</Label>*/}
                <h2>{this.state.courseText}</h2>
                {/*<Input type="text" onChange = {this.handleChangeOption} name="courseName" id="courseName" value = {this.state.courseText} placeholder="Course Name" />*/}
            </FormGroup>
            <FormGroup>
                {/*<Button color="primary" onClick={this.addButton}>Add Theme</Button>{' '}*/}
                {/*<Button color="danger" onClick={this.disButton}>Delete Theme</Button>{' '}*/}

            </FormGroup>


            {this.state.themes.map(function (input, index) {
                return input
            })}

            <FormGroup>
                <Button color="success" block disabled={this.state.buttonEnabled} onClick={this.sendData}>End course</Button>{' '}
            </FormGroup>
        </div>
    };
}

class takeACourse extends Component{
    constructor(props){
        super(props)
        this.state = {
            testing: false,
            test: []
        }
        if(this.props.location.state){
            axios.get('http://localhost:3000/tanya/course/' + this.props.location.state.cId)
                .then(response =>
                        // console.log(response)
                    this.setState({
                    test:<Course onFinish = {this.finishHandler} data = {response} routeData = {this.props.location.state}/>,
                    testing: true,
                })
                );
        }
        this.finishHandler = this.finishHandler.bind(this);
        // axios.get('http://localhost:3000/tanya/' + this.state.selectedOption.value)
        //     .then(response => this.handleRequsetTest(response.data));
    }
    finishHandler=(data)=>{
        let str = "/" + localStorage.getItem("role") + "/main";
        this.props.history.push({
            pathname: str,
            state: this.props.location.state
        });
    };

    render(){
        if(!this.state.testing){
            return(<div>
                <h4>User ID {localStorage.getItem("id")}</h4>
                <h4>Course ID {this.props.location.state.cId}</h4>
            </div>);
    }else {
            return <div>
                {this.state.test}
            </div>
        }

    }
}

export default takeACourse
// import React, { Component } from 'react';
// import Dropzone from 'react-dropzone'
// import request from 'superagent';
// // var request = require('superagent');
// import axios from 'axios';
// class takeACourse extends Component{
//     constructor(props){
//         super(props);
//     }
//     onDrop(files) {
//         // this.props.onSelectFile({number:this.props.number, file:files});
//         //
//         // console.log(files);
//         // this.setState({
//         //     file:files,
//         // });
//
//         let photo = new FormData();
//         photo.append('photo', files[0]);
//
//         // axios.post('http://localhost:3000/upload', { photo })
//         //     .then((result) => {
//         //         // localStorage.setItem('jwtToken', result.data.token);
//         //         // this.setState({ message: '' });
//         //         console.log(result);
//         //         // // this.props.params.push(username);
//         //         // this.props.history.push({
//         //         //     pathname: '/user',
//         //         //     state: { detail: username, id:result.data.id }
//         //         // })
//         //     })
//         //     .catch((error) => {
//         //         if(error.response.status === 401) {
//         //             this.setState({ message: 'Login failed. Username or password not match' });
//         //         }
//         //     });
//         let z = "asdasd"
//
//         // request
//         //     .post( 'http://localhost:3000/upload' )
//         //     .accept('application/json')
//         //     .field('name', 'My name')
//         //     .field('phone', 'My phone')
//         //     .attach('photo', photo)
//         //     .then((result) => {
//         //         // process the result here
//         //         console.log(result);
//         //     })
//         //     .catch((err) => {
//         //         throw err;
//         //     });
//         request.post('http://localhost:3000/upload')
//             // .send({body:{z:"asd"}})
//             // .send(photo)
//             .set('Content-Type', 'multipart/form-data')
//             .attach('logo', photo)
//             .field("data", z)
//             .end(function(err, resp) {
//                 if (err) { console.error(err); }
//                 return resp;
//             });
//     }
//     render(){
//         const styleDropzone = {
//             width : "100%",
//             height : "20%",
//             border : "1px solid black",
//             textAlign: 'center',
//             borderRadius: 5,
//         };
//         const styleDropzoneP = {
//             marginTop:10,
//
//         };
//         return(<div>
//             <Dropzone style={styleDropzone} multiple={true} onDrop={this.onDrop.bind(this)}>
//                 <p style={styleDropzoneP}>Not working.</p>
//             </Dropzone>
//         </div>);
//     }
// }
//
// export default takeACourse;