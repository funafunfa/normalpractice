import React, { Component } from 'react';
// import ReactRadioButtonGroup from 'react-radio-button-group';
import axios from 'axios'
import ReactCountdownClock from 'react-countdown-clock';
import { RadioGroup, RadioButton, ReversedRadioButton } from 'react-radio-buttons';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


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



        };

        this.handleNameTest = this.handleNameTest.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickSend = this.handleClickSend.bind(this);
        this.timeIsGone = this.timeIsGone.bind(this);
        axios.get('http://localhost:3000/tanya/test/' + this.props.id)
            .then(response => this.handleRequset(response.data[0]));

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

    handleRequset = (data) => {

        console.log("test " + data.qustions.length);
        this.setState({
            response: data,
            tTitle: data.testName,
            tTimer: data.timer,
        });

        let qIn = this.state.response.qustions;
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

    };




    render() {
        if (this.state.test === "going"){
            return (

                <div>
                    <div><p>Заголовок {this.state.tTitle}</p></div>
                    <div><p>Описание {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor" +
                    " incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"}</p></div>
                    {/*<div><p>Таймер {<ReactCountdownClock seconds={this.state.tTimer} color="#777" alpha={0.9} size={300}/>}</p></div>*/}
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
                    <div><p>Описание {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor" +
                    " incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"}</p></div>
                    <div><button name = {"startTest"} onClick={this.handleClick}>Start Test</button></div>


                </div>)
        }else if(this.state.test === "finished"){
            return (
                <div>
                    <div><p>Заголовок {this.state.tTitle}</p></div>
                    <div><p>Описание {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor" +
                    " incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"}</p></div>
                    {/*<div><button name = {"startTest"} onClick={this.handleClick}>Start Test</button></div>*/}
                    <div><p>Test is done</p></div>
                    <div><p>Correct {this.state.correctAnswersNum}/{this.state.tQuestions.length}</p></div>
                    {/**/}

                </div>)
        }
        ;
    }



}

class TestPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedOption: '',
            options: [],
            test: "",
            testing:false
        };
        this.buttonClick = this.buttonClick.bind(this);

        axios.get('http://localhost:3000/tanya_test/testTitles/')
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
            test:<Test id = {this.state.selectedOption.value}/>,
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

export default TestPage;