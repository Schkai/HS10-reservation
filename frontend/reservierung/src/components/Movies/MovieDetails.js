import React, { Component } from 'react';
import fire from './../../fire';
import { Link } from '@reach/router';

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      date: '',
      image: '',
      name: '',
      reservierungen: '',
      maxReservierungen: '',
      loading: true,
      reservationName: '',
      phone: '',
      privacy: false,
      reservated: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    let db = fire.firestore();
    db.settings({ timestampsInSnapshots: true });

    let detailRef = db.collection('filme').doc(this.props.id);

    detailRef
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log('Document data:', doc.data());
          console.log(doc.data().reservierungen);
          this.setState({
            date: doc.data().date,
            image: doc.data().img,
            name: doc.data().name,
            reservierungen: doc.data().reservierungen,
            maxReservierungen: doc.data().maxReservierungen,
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

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.addReserveration(
      this.state.reservationName,
      this.state.phone,
      this.props.id
    );
  }

  addReserveration(reservationName, phone, id) {
    console.log(reservationName, phone, id);

    let db = fire.firestore();
    db.settings({ timestampsInSnapshots: true });

    let reservationRef = db
      .collection('filme')
      .doc(id)
      .collection('reservierungen');

    reservationRef
      .add({
        name: reservationName,
        phone: phone,
      })
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });

    this.setState({ phone: '', reservationName: '', reservated: true });
  }

  render() {
    const {
      date,
      image,
      name,
      reservierungen,
      loading,
      maxReservierungen,
      reservated,
    } = this.state;

    let form;

    if (reservierungen < maxReservierungen) {
      form = (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="reservationName"
                value={this.state.reservationName}
                onChange={this.handleChange}
                className="validate"
              />
            </label>
            <label>
              Telefonnummer:
              <input
                type="number"
                name="phone"
                value={this.state.phone}
                onChange={this.handleChange}
                className="validate"
              />
            </label>
            <label>
              <input
                type="checkbox"
                name="privacy"
                checked={this.state.privacy}
                onChange={this.handleChange}
                className="validate"
              />
              <span>
                <Link to="/privacy" target="_blank" rel="noopener noreferrer">
                  Datenschutzbestimmung gelesen und akzeptiert.
                </Link>
              </span>
            </label>
            <br />
            <button
              className="btn waves-effect waves-light"
              type="submit"
              onSubmit={this.handleSubmit}
            >
              Reservieren
            </button>
          </form>
        </div>
      );
    } else if (reservierungen < maxReservierungen && reservated) {
      form = <p>Unser Reservierungs-Kontingent ist leider aufgebraucht.</p>;
    } else {
      form = <p>Unser Reservierungs-Kontingent ist leider aufgebraucht.</p>;
    }

    if (loading) {
      return (
        <div className="container">
          <p>Loading...</p>
        </div>
      );
    } else {
      return (
        <div className="container">
          <p>{name}</p>
          <p>{date}</p>
          <p> Verbleibende Tickets: {reservierungen}</p>
          <p>Bild:</p>
          <img src={image} />
          <br />
           {form}
        </div>
      );
    }
  }
}

export default MovieDetails;
