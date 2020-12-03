import React, { Component } from 'react';
import axios from 'axios';

const Application = props => (
  <tr >
    <td>{props.app.applierName}</td>
    <td>{props.app.applierEmail}</td>
    <td>{props.app.status}</td>
    <td><a href={"listing/"+props.app.propertyId}>{props.app.propertyId}</a></td>
    <td><a href={"application/"+props.app._id}>Update</a></td>
  </tr>
)

export default class ViewApplications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      applications: []
    }
  }

  componentDidMount() {
    axios.post('http://localhost:3001/user/applications/searchEmail', {email: localStorage.getItem('email')},  
      { headers: {"Authorization" : `Bearer ${localStorage.getItem('jwtToken')}`} })
      .then(res => {
        this.setState({applications: res.data});
    });
  }

  applicationList() {
    return this.state.applications.map(a => {
      return <Application app={a} key={a._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Applications to Review</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th><th>Email</th><th>Status</th><th>Property ID</th><th>Update</th>
            </tr>
          </thead>
          <tbody>
            { this.applicationList() }
          </tbody>
        </table>
      </div>
    )
  }
}