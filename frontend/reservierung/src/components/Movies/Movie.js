import React, { Component } from 'react';
import { Link } from '@reach/router';
import './Movie.css';

class Movie extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      /*<div>
        <h1>{this.props.title}</h1>
        <p>{this.props.date}</p>
        <p>{this.props.image}</p> */
      //<Link to={`/film/${this.props.id}`} className="movie" props={this.props}>
      <div className="center-align">
        <div className="col m4">
          <div className="card medium hoverable">
            <div className="card-image">
              <img src={this.props.image} />
              <span className="card-title center-align">
                {this.props.title}
              </span>
            </div>
            <div className="card-content">
              <p>{this.props.teaser}</p>

              <br />
            </div>
            <div className="card-action ">
              <Link to={`/film/${this.props.id}`}>
                <span className="text-red text-darken-4">Reservieren</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      // </Link>
    );
  }
}

export default Movie;
