import React, { Component } from 'react';
import { Link } from '@reach/router';

class Movie extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      /*<div>
        <h1>{this.props.title}</h1>
        <p>{this.props.date}</p>
        <p>{this.props.image}</p> */
      //<Link to={`/film/${this.props.id}`} className="movie" props={this.props}>
      <div className="row">
        <div className="col s12 m7">
          <div className="card">
            <div className="card-image">
              <img src={this.props.image} />
              <span className="card-title">{this.props.title}</span>
            </div>
            <div className="card-content">
              <p>{this.props.date}</p>
            </div>
            <div className="card-action">
              <Link to={`/film/${this.props.id}`}>
                Mehr Informationen und Reservieren
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
