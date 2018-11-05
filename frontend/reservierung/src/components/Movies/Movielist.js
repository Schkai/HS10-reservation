import React, { Component } from 'react';
import Movie from './Movie';

class Movielist extends Component {
  render() {
    const movies = [
      {
        title: 'kuzkz',
        key: 1,
      },
      {
        title: 'title2',
        key: 2,
      },
      {
        title: 'titel3',
        key: 3,
      },
    ];

    return (
      <div className="movielist container">
        <div className="row">
          {movies.map(movie => {
            return (
              <Movie
                className="col s12 m6"
                title={movie.title}
                key={movie.key}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Movielist;
