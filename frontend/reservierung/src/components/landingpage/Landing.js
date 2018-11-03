import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    return (
      <div className="container">
        <Link to="/reservieren" className="nav">
          LINK BRUDDA
        </Link>
      </div>
    );
  }
}

export default Landing;
