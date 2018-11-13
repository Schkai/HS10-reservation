import React, { Component } from 'react';
import fire from './../../fire';
import { navigate } from '@reach/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './MovieDetail.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

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
  Button,
  Modal,
} from 'react-materialize';

class MovieDetails extends Component {
  constructor(props) {
    super(props);
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
      ticketanzahl: '',
      buttonDisabled: true,
      table: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.notifyToast = this.notifyToast.bind(this);
    this.updateTable = this.updateTable.bind(this);
    this.print = this.print.bind(this);
  }

  notifyToast = string => {
    switch (string) {
      case 'success':
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
        break;
      case 'error':
        console.log('error');
        toast.error(
          'Bei der Registrierung ist ein Fehler aufgetreten. Bitte versuchen sie es erneut.',
          {
            position: 'bottom-left',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
    }
  };
  /*
   */

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
            trailer: doc.data().trailer,
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

    let tableRef = db
      .collection('filme')
      .doc(this.props.id)
      .collection('reservierungen');

    tableRef.get().then(snap => {
      const items = [];
      snap.forEach(item => {
        items.push(item.data());
      });
      this.setState({ table: items });
      console.log(items);
    });
  }

  print() {
    window.print();
  }

  updateTable(tableData) {
    console.log(tableData);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      buttonDisabled: false,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(Number(this.state.ticketanzahl));
    this.setState({
      reservierungen: Number(
        Number(this.state.reservierungen) + Number(this.state.ticketanzahl)
      ),
    });
    if (Number(this.state.ticketanzahl) > 9) {
      this.notifyToast('error');
    } else {
      this.increaseTicketCounter(
        this.props.id,
        this.state.reservierungen,
        this.state.ticketanzahl
      );
      this.addReserveration(
        this.state.reservationName,
        this.state.phone,
        this.props.id,
        this.state.ticketanzahl
      );
      this.notifyToast('success');
    }
  }

  increaseTicketCounter(id, tickets, ticketanzahl) {
    console.log(this.state);
    console.log(tickets + ' ' + ticketanzahl);

    let db = fire.firestore();
    db.settings({ timestampsInSnapshots: true });

    let ticketCounterRef = db.collection('filme').doc(id);
    ticketCounterRef
      .set(
        {
          reservierungen: Number(
            Number(this.state.reservierungen) + Number(this.state.ticketanzahl)
          ),
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

  addReserveration(reservationName, phone, id, ticketanzahl) {
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
        ticketanzahl: ticketanzahl,
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
      table,
    } = this.state;

    const columns = [
      {
        Header: 'Name',
        accessor: 'name', // String-based value accessors!
      },
      {
        Header: 'Tickets',
        accessor: 'ticketanzahl',
      },
      {
        Header: 'Telefon',
        accessor: 'phone',
      },
    ];

    let form;

    if (reservierungen < maxReservierungen && !reservated) {
      form = (
        <div>
          <form onSubmit={this.handleSubmit}>
            <Row>
              <Input
                placeholder="Ihr Name"
                s={6}
                label="Name:"
                onChange={this.handleChange}
                type="text"
                name="reservationName"
              />
              <Input
                s={6}
                placeholder="Ihre Telefonnummer:"
                label="Telefonnummer"
                onChange={this.handleChange}
                type="number"
                name="phone"
              />
              <Input
                placeholder="1"
                s={6}
                label="Anzahl der Tickets (maximal 9):"
                onChange={this.handleChange}
                type="number"
                name="ticketanzahl"
              />
            </Row>

            <br />
            <button
              className="btn waves-effect waves-light"
              type="submit"
              onSubmit={this.handleSubmit}
              disabled={this.state.buttonDisabled}
            >
              Reservieren
            </button>
          </form>
        </div>
      );
    } else if (reservierungen < maxReservierungen && reservated) {
      form = <p>Ihre Registrierung wurde erfolgreich gespeichert!</p>;
    } else {
      form = (
        <div>
          <p>
            Unser Reservierungs-Kontingent ist leider aufgebraucht. Dies
            bedeutet aber nicht, dass das Kino vollständig belegt ist. An der
            Abendkasse halten wir für sie immer ein kleines Kontingent zurück.
          </p>
        </div>
      );
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
          <div className="centering">
            <Col s={12} className="centering">
              <Card>
                <h4 className="">{name}</h4>
                <hr />
                <div className="teaser">
                  <span>{teaser}</span>
                </div>

                <h6>{date}</h6>

                <h2>
                  {reservierungen}&nbsp;/{maxReservierungen}
                </h2>

                <Modal
                  header="Reservieren"
                  trigger={<Button>Reservieren</Button>}
                  actions={
                    <Button modal="close" waves="light">
                      Schließen
                    </Button>
                  }
                >
                  {form}
                </Modal>
                <br />
                <Button onClick={this.print}>Drucken</Button>
              </Card>
              <ReactTable
                classname="ref-table"
                data={table}
                columns={columns}
              />
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
