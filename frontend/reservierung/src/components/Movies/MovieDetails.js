import React, { Component } from 'react';
import fire from './../../fire';

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = { reservierungen: 50, loading: true };
  }

  componentWillMount() {
    var db = fire.firestore();
    db.settings({ timestampsInSnapshots: true });

    var detailRef = db.collection('filme').doc(this.props.id);

    detailRef
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log('Document data:', doc.data());
          console.log(doc.data().reservierungen);
          this.setState({
            reservierungen: doc.data().reservierungen,
            loading: false,
          });
          console.log(this.state);
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch(function(error) {
        console.log('Error getting document:', error);
      });
  }

  render() {
    if (this.state.loading) {
      return <p>Loading...</p>;
    }
    return <p>{this.props.id}</p>;
  }
}

export default MovieDetails;
