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
      maxReservierungen: '',
      loading: true,
      mail: '',
      phone: '',
      privacy: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    console.log('hi');
    console.log(event.target);
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.phone + ' ' + this.state.mail);
    console.log(this.state);
    event.preventDefault();
  }

  render() {
    const {
      date,
      image,
      name,
      reservierungen,
      loading,
      maxReservierungen,
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
                name="mail"
                value={this.state.mail}
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
              <span>Datenschutzbestimmung gelesen und akzeptiert.</span>
            </label>
          </form>
          <br />
          <button
            class="btn waves-effect waves-light"
            type="submit"
            name="action"
          >
            Submit
            <i class="material-icons right" />
          </button>
        </div>
      );
    } else {
      form = <p>Es sind leider keine Online-Reservierungen mehr möglich</p>;
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
          <p>Break</p>
           {form}
        </div>
      );
    }
  }
}

export default MovieDetails;
