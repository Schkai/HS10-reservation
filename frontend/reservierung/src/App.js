import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import fire from './fire';

import User from './User';
import Landing from './components/landingpage/Landing';
import Movielist from './components/Movies/Movielist';
import Imprint from './components/subsites/Imprint';
import Privacy from './components/subsites/Privacy';
import MovieDetails from './components/Movies/MovieDetails';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { movies: [] }; // setup state
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
            <Movielist exact path="/" />
            <Privacy exact path="/privacy" />
            <Imprint exact path="/imprint" />
            <MovieDetails path="/film/:id" />
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
