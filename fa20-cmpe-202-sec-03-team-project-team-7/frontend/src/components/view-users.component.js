import React, { Component } from 'react';
import axios from 'axios';

const User = props => (
  <tr >
    <td>{props.user.name}</td>
    <td>{props.user.email}</td>
    <td>{props.user.userType}</td>
    <td>{props.user.status}</td>
    <td><a href={"updateUser/"+props.user._id}>Update</a></td>
  </tr>
)

export default class ViewUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    }
  }

  componentDidMount() {    
    axios.get('http://52.89.223.218:3001/user/user', 
        { headers: {"Authorization" : `Bearer ${localStorage.getItem('jwtToken')}`} })
        .then(res => {
            this.setState({users: res.data});
        });
  }

  usersList() {
    return this.state.users.map(u => {
      return <User user={u} key={u._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Users</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th><th>Email</th><th>Type</th><th>Status</th><th>Update</th>
            </tr>
          </thead>
          <tbody>
            { this.usersList() }
          </tbody>
        </table>
      </div>
    )
  }
}