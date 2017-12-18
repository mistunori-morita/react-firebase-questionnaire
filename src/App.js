import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: '',
      name: '',
      answers: {
        q1:'',
        q2:'',
        q3:'',
        q4:''
      },
      submitted: false
    }
  }


  handleNameSubmit(e) {
    var name = this.refs.name.value;
    this.setState({name: name,}, function(){
      console.log(this.state);
    });
    e.preventDefault();
  }

  render() {
    var user;
    var questions;

    if(this.state.name && this.state.submitted === false) {
      user = <h2>Wecome { this.state.name}</h2>
    } else if(!this.state.name && this.state.submitted === false) {
      user = <span>
        <h2>Please enter your name to begin the suvery</h2>
        <form onSubmit={this.handleNameSubmit.bind(this)}>
          <input type="text" placeholder="Enter Name..." ref="name"/>
        </form>

      </span>;
      questions = '';
    } else if(this.state.submitted === true) {

    }

    return (
      <div className="App text-center">
        <header className="App-header">
         <h2>Suvery</h2>
        </header>
        <div className="text-center">
          {user}
        </div>
      </div>
    );
  }
}

export default App;
