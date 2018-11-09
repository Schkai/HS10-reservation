import React, { Component } from 'react';
import fire from './../../fire';

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      date: '',
      image: '',
      name: '',
      reservierungen: '',
      loading: true,
    };
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
            date: doc.data().date,
            image: doc.data().image,
            name: doc.data().name,
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
    const { date, image, name, reservierungen, loading } = this.state;

    if (loading) {
      return (
        <div className="container">
          <p>Loading...</p>
        </div>
      );
    } else {
      return (
        <div className="container">
          {name}
          <p>Zweite Zeile</p>
        </div>
      );
    }
  }
}

export default MovieDetails;
