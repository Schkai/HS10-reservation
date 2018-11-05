import React, { Component } from 'react';

class Movie extends Component {
  constructor(props) {
    super(props);

    this.state = [];
  }

  render() {
    return (
      <div>
        <h1>Movie-Component</h1>
        <p>{this.props.title}</p>
      </div>
    );
  }
}

export default Movie;
