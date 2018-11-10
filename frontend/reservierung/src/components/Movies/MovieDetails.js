import React, { Component } from 'react';
import fire from './../../fire';
import { navigate } from '@reach/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      date: '',
      image: '',
      name: '',
      reservierungen: 0,
      maxReservierungen: 0,
      loading: true,
      reservationName: '',
      phone: '',
      privacy: false,
      reservated: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.notify = this.notify.bind(this);
  }

  notify = () =>
    toast.success(
      'Vielen Dank, Ihr Ticket wurde reserviert. Sie werden zurück auf die Startseite weitergeleitet.',
      {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        onClose: () => navigate('/'),
      }
    );

  componentWillMount() {
    let db = fire.firestore();
    db.settings({ timestampsInSnapshots: true });

    let detailRef = db.collection('filme').doc(this.props.id);

    detailRef
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log('Document data loaded:', doc.data());
          this.setState({
            date: doc.data().date,
            image: doc.data().img,
            name: doc.data().name,
            reservierungen: doc.data().reservierungen,
            maxReservierungen: doc.data().maxReservierungen,
            loading: false,
          });
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
    this.setState({ reservierungen: this.state.reservierungen + 1 });
    this.increaseTicketCounter(this.props.id, this.state.reservierungen);
    this.addReserveration(
      this.state.reservationName,
      this.state.phone,
      this.props.id
    );
  }

  increaseTicketCounter(id, tickets) {
    console.log(this.state);
    console.log(tickets);

    let db = fire.firestore();
    db.settings({ timestampsInSnapshots: true });

    let ticketCounterRef = db.collection('filme').doc(id);
    ticketCounterRef
      .set(
        {
          reservierungen: tickets + 1,
        },
        {
          merge: true,
        }
      )
      .then(function() {
        console.log('Document successfully updated!');
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error);
      });
  }

  addReserveration(reservationName, phone, id) {
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

    if (reservierungen < maxReservierungen && !reservated) {
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

            <br />
            <button
              className="btn waves-effect waves-light"
              type="submit"
              onSubmit={this.handleSubmit}
              onClick={this.notify}
            >
              Reservieren
            </button>
          </form>
        </div>
      );
    } else if (reservierungen < maxReservierungen && reservated) {
      form = <p>Ihre Registrierung wurde erfolgreich gespeichert!</p>;
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
          <p> Resevierte Tickets: {reservierungen}</p>
          <p>Bild:</p>
          <img src={image} />
          <br />
          <br />
           {form}
          <ToastContainer />
        </div>
      );
    }
  }
}

export default MovieDetails;

/*

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
                  Datenschutzbestimmung
                </Link>
                &nbsp;gelesen und akzeptiert.
              </span>
            </label>
            */
