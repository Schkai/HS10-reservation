import React, { Component } from 'react';
import fire from './../../fire';
import { navigate } from '@reach/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './MovieDetail.css';
import {
  Tabs,
  Tab,
  Col,
  Card,
  CardTitle,
  Preloader,
  ProgressBar,
  Input,
  Row,
} from 'react-materialize';
import $ from 'jquery';
import YouTube from 'react-youtube';
var getYouTubeID = require('get-youtube-id');

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
      teaser: '',
      regie: '',
      trailer: '',
      desc: '',
      laufzeit: '',
      ticketanzahl: 1,
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
            teaser: doc.data().teaser,
            regie: doc.data().regie,
            trailer: getYouTubeID(doc.data().trailer),
            desc: doc.data().desc,
            laufzeit: doc.data().laufzeit,
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
      teaser,
      trailer,
      regie,
      desc,
      laufzeit,
    } = this.state;

    let form;

    if (reservierungen < maxReservierungen && !reservated) {
      form = (
        <div>
          <form onSubmit={this.handleSubmit}>
            <Row>
              <Input placeholder="Ihr Name" s={6} label="Name" />
              <Input
                s={6}
                placeholder="Ihre Telefonnummer"
                label="Telefonnummer"
              />
              <Input
                s={12}
                type="select"
                label="Materialize Select"
                defaultValue="2"
              >
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </Input>
            </Row>

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
          <Col s={12}>
            <ProgressBar />
          </Col>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="whitespace">
            <Col m={7} s={12}>
              <Card horizontal header={<CardTitle image={image} />}>
                <div className="teaser">
                  <span>{teaser}</span>
                </div>
                <h4 className="">{name}</h4>
                <hr />
                <h6>{date}</h6>
                <h6>Laufzeit: {laufzeit}</h6>
              </Card>
              <Tabs className="tab-demo z-depth-1">
                <Tab title="Film" active>
                  <div className="card-panel white">
                    <p>{desc}</p>
                  </div>
                </Tab>
                <Tab title="Regie" className="regie">
                  <div className="card-panel white">
                    <p>{regie}</p>
                  </div>
                </Tab>
                <Tab title="Trailer">
                  <div className="card-panel white">
                    <YouTube videoId={trailer} />
                  </div>
                </Tab>
                <Tab title="Reservieren">
                  <div className="card-panel white"> {form}</div>
                </Tab>
              </Tabs>
            </Col>
          </div>

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


            
                      <div>
            <div class="col s12 m7">
              <div class="card horizontal">
                <div class="card-image">
                  <img src={image} />
                </div>
                <div class="card-stacked">
                  <div class="card-content">
                    <div className="teaser">
                      <span>{teaser}</span>
                    </div>
                    <h4 className="">{name}</h4>
                    <hr />
                    <h6>{date}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>




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
              Anzahl der Tickets (maximal 8):
              <input
                type="number"
                name="ticketanzahl"
                value={this.state.ticketanzahl}
                onChange={this.handleChange}
                className="validate"
                min="1"
                max="8"
              />
            </label>


            */
