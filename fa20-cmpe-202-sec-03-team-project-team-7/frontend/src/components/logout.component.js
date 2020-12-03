import React, { Component } from 'react';

export default class Logout extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  componentDidMount() {
    localStorage.clear();
  }

  render() {
    return (
      <div>
        <h3>Successfully Logged out</h3>
      </div>
    )
  }
}