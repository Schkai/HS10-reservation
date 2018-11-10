import React, { Component } from 'react';
import Movie from './Movie';
import fire from '../../fire';

class Movielist extends Component {
  constructor(props) {
    super(props);
    this.state = { movies: [] }; // setup state  }
  }

  componentWillMount() {
    /* Create reference to messages in Firebase Database */
    var db = fire.firestore();
    db.settings({ timestampsInSnapshots: true });

    var movieRef = db.collection('filme');
    movieRef
      .orderBy('name')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let movie = { movie: doc.data(), id: doc.id };
          this.setState({ movies: [movie].concat(this.state.movies) });

          console.log(this.state.movies);
        });
      });

    /*     movieRef.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database 
      let message = { text: snapshot.val(), id: snapshot.key };
      this.setState({ messages: [message].concat(this.state.messages) });
    });*/
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    return (
      <div className="movielist container">
        <div className="row">
          {this.state.movies.map(movie => {
            return (
              <Movie
                className="movie"
                title={movie.movie.name}
                date={movie.movie.date}
                image={movie.movie.img}
                id={movie.id}
                key={movie.id}
                teaser={movie.movie.teaser}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Movielist;
