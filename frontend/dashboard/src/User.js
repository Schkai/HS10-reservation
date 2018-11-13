import React from 'react';
import fire from './fire';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      fullname: '',
    };
  }

  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  addUser = e => {
    e.preventDefault();
    console.log(e);

    const db = fire.firestore();
    db.settings({
      timestampsInSnapshots: true,
    });
    const userRef = db.collection('users').add({
      fullname: this.state.fullname,
      email: this.state.email,
    });

    this.setState({
      fullname: '',
      email: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.addUser}>
        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          onChange={this.updateInput}
          value={this.state.fullname}
        />
        <input
          type="email"
          name="email"
          placeholder="Full Name"
          onChange={this.updateInput}
          value={this.state.email}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default User;
