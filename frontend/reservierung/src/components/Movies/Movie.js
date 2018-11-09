import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = [{ movie: '' }];
  }

  render() {
    return (
      /*<div>
        <h1>{this.props.title}</h1>
        <p>{this.props.date}</p>
        <p>{this.props.image}</p> */
      <Link to={`/film/${this.props.id}`} className="movie">
        <div class="row">
          <div class="col s12 m7">
            <div class="card">
              <div class="card-image">
                <img src={this.props.image} />
                <span class="card-title">{this.props.title}</span>
              </div>
              <div class="card-content">
                <p>{this.props.date}</p>
              </div>
              <div class="card-action">
                <a href="#">Mehr Informationen</a>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default Movie;
