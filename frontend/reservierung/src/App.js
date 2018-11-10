import React, { Component } from 'react';
import fire from './fire';
import { Router, Link } from '@reach/router';
import User from './User';
import Landing from './components/landingpage/Landing';
import Movielist from './components/Movies/Movielist';
import Imprint from './components/subsites/Imprint';
import Privacy from './components/subsites/Privacy';
import MovieDetails from './components/Movies/MovieDetails';
import './App.css';

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
        <div className="container">
          <nav className="transparent">
            <div className="nav-wrapper transparent">
              <a href="#" data-target="mobile-demo" class="sidenav-trigger">
                <i class="material-icons">menu</i>
              </a>

              <a href="/" class="brand-logo">
                Tickets
              </a>

              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <a href="/privacy">Datenschutz</a>
                </li>
                <li>
                  <a href="/imprint">Impressum</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <Router>
          <Movielist path="/" />
          <Privacy exact path="/privacy" />
          <Imprint exact path="/imprint" />
          <MovieDetails path="/film/:id" />
        </Router>
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
