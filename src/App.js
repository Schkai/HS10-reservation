import React, { Component } from 'react';
import { Router } from '@reach/router';
import Movielist from './components/Movies/Movielist';
import Imprint from './components/subsites/Imprint';
import Privacy from './components/subsites/Privacy';
import MovieDetails from './components/Movies/MovieDetails';
import { Footer } from 'react-materialize';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { movies: [] }; // setup state
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <nav className="transparent">
            <div className="nav-wrapper transparent">
              <a href="/" className="brand-logo center">
                Tickets
              </a>
            </div>
          </nav>
        </div>
        <Router>
          <Movielist path="/" />
          <Privacy exact path="/privacy" />
          <Imprint exact path="/imprint" />
          <MovieDetails path="/film/:id" />
        </Router>
        <Footer
          moreLinks={
            <div>
              <a className="grey-text text-lighten-4 right" href="/imprint">
                Impressum & Datenschutz
              </a>
            </div>
          }
          className="footer"
        />
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



              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <a href="/privacy">Datenschutz</a>
                </li>
                <li>
                  <a href="/imprint">Impressum</a>
                </li>
              </ul>
      */

export default App;
