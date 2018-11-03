import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import fire from './fire';
import User from './User';
import Landing from './components/landingpage/Landing';
import Movielist from './components/Movies/Movielist';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] }; // setup state
  }

  componentWillMount() {
    /* Create reference to messages in Firebase Database */
    let messagesRef = fire
      .database()
      .ref('messages')
      .orderByKey()
      .limitToLast(100);
    messagesRef.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database */
      let message = { text: snapshot.val(), id: snapshot.key };
      this.setState({ messages: [message].concat(this.state.messages) });
    });
  }
  addMessage(e) {
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    fire
      .database()
      .ref('messages')
      .push(this.inputEl.value);
    this.inputEl.value = ''; // <- clear the input
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Movielist} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

/*

      <div className="App">
        <User />

        <div className="App-header">
          <form onSubmit={this.addMessage.bind(this)}>
            <input type="text" ref={el => (this.inputEl = el)} />
            <input type="submit" />
            <ul>
              {/* Render the list of messages */
/*
              this.state.messages.map(message => (
                <li key={message.id}>{message.text}</li>
              ))}
            </ul>
          </form>
        </div>
      </div>
      */

export default App;
