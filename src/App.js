import React, { Component } from 'react';
import './App.css';

var uuid = require('uuid');
var firebase = require('firebase');

var config = {
    apiKey: "xxxxxx",
    authDomain: "fir-survery.firebaseapp.com",
    databaseURL: "https://fir-survery.firebaseio.com",
    projectId: "fir-xxx",
    storageBucket: "fir-survery.appspot.com",
    messagingSenderId: "xxxxxxxx"
  };
  firebase.initializeApp(config);


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: uuid.v1(),
      name: '',
      answers: {
        q1:'',
        q2:'',
        q3:'',
        q4:''
      },
      submitted: false
    }

    this.handleQuestionChange = this.handleQuestionChange.bind(this);
  }


  handleNameSubmit(e) {
    var name = this.refs.name.value;
    this.setState({name: name,}, function(){
      console.log(this.state);
    });
    e.preventDefault();
  }

  handleQuestionSubmit(e){
    firebase.database().ref('surveys/' + this.state.id).set({
      name: this.state.name,
      answers: this.state.answers
    });

    this.setState({submitted: true}, function() {
        console.log('Quesitions submitted...');
    });
    e.preventDefault();
  }

  handleQuestionChange(e){
    // console.log(e.target.value);
    var answers = this.state.answers;
    if(e.target.name === 'q1') {
      answers.q1 = e.target.value;
    }else if(e.target.name === 'q2'){
      answers.q2 = e.target.value;
    }else if(e.target.name === 'q3'){
      answers.q3 = e.target.value;
    }else if(e.target.name === 'q4'){
      answers.q4 = e.target.value;
    }

    this.setState({answers:answers}, function(){
      console.log(this.state);
    });
  }

  render() {
    var user;
    var questions;

    if(this.state.name && this.state.submitted === false) {
      user = <h2>Wecome { this.state.name}</h2>
      questions =
      <span>
        <h3>Survery Questions</h3>
        <form onSubmit={this.handleQuestionSubmit.bind(this)}>
          <div>
            <label>What is your favorite operating system?</label><br />
            <input type="radio" name ="q1" value="Windows" onChange={this.handleQuestionChange}/>Windows<br />
            <input type="radio" name ="q1" value="OSX" onChange={this.handleQuestionChange}/>OSX<br />
            <input type="radio" name ="q1" value="Linux" onChange={this.handleQuestionChange}/>Linux<br />
            <input type="radio" name ="q1" value="Solaris" onChange={this.handleQuestionChange}/>Solaris<br />
            <input type="radio" name ="q1" value="Other" onChange={this.handleQuestionChange}/>Other<br />
          </div>
          <div>
            <label>What is your favorite brand of TV?</label><br />
            <input type="radio" name ="q2" value="Sony" onChange={this.handleQuestionChange}/>Sony<br />
            <input type="radio" name ="q2" value="Samsung" onChange={this.handleQuestionChange}/>Samsung<br />
            <input type="radio" name ="q2" value="Green" onChange={this.handleQuestionChange}/>Green<br />
            <input type="radio" name ="q2" value="Vizio" onChange={this.handleQuestionChange}/>Vizio<br />
            <input type="radio" name ="q2" value="Other" onChange={this.handleQuestionChange}/>Other<br />
          </div>
          <div>
            <label>What is your favorite Smartphone Brand?</label><br />
            <input type="radio" name ="q3" value="Moring" onChange={this.handleQuestionChange}/>Moring<br />
            <input type="radio" name ="q3" value="Afternoon" onChange={this.handleQuestionChange}/>Afternoon<br />
            <input type="radio" name ="q3" value="Evening" onChange={this.handleQuestionChange}/>Evening<br />
            <input type="radio" name ="q3" value="Night" onChange={this.handleQuestionChange}/>Night<br />
            <input type="radio" name ="q3" value="Other" onChange={this.handleQuestionChange}/>Other<br />
          </div>
          <div>
            <label>What is your favorite CPU Brand?</label><br />
            <input type="radio" name ="q4" value="Intel" onChange={this.handleQuestionChange}/>Intel<br />
            <input type="radio" name ="q4" value="AMD" onChange={this.handleQuestionChange}/>AMD<br />
            <input type="radio" name ="q4" value="Nivita" onChange={this.handleQuestionChange}/>Nivita<br />
            <input type="radio" name ="q4" value="NEXT" onChange={this.handleQuestionChange}/>Night<br />
            <input type="radio" name ="q4" value="GO" onChange={this.handleQuestionChange}/>Other<br />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </span>
    } else if(!this.state.name && this.state.submitted === false) {
      user = <span>
        <h2>Please enter your name to begin the suvery</h2>
        <form onSubmit={this.handleNameSubmit.bind(this)}>
          <input type="text" placeholder="Enter Name..." ref="name"/>
        </form>

      </span>;
      questions = '';
    } else if(this.state.submitted === true) {
        user = <h2>Thanks You {this.state.name}</h2>
    }

    return (
      <div className="App">
        <header className="App-header text-center">
         <h2>Suvery</h2>
        </header>
        <div className="text-center">
          {user}
        </div>
        <div className="container">
          {questions}
        </div>
      </div>
    );
  }
}

export default App;
