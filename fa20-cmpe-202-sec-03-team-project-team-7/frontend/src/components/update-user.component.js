import React, { Component } from 'react';
import axios from 'axios';

export default class UpdateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        user: {},
        status: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/user/user/'+this.props.match.params.id,
      { headers: {"Authorization" : `Bearer ${localStorage.getItem('jwtToken')}`} })
      .then(res => {
        this.setState({user: res.data});
        this.setState({status: res.data.status});
      })   
  }

  onChangeStatus(e) {
    this.setState({status: e.target.value});
  }

  onSubmit(e) {
    axios.put('http://localhost:3001/user/user/'+this.props.match.params.id, this.state, 
        { headers: {"Authorization" : `Bearer ${localStorage.getItem('jwtToken')}`} })
        .then(res => {
          console.log(res);
        });
  }

  onDelete(e) {
    axios.delete('http://localhost:3001/user/user/'+this.props.match.params.id,
        { headers: {"Authorization" : `Bearer ${localStorage.getItem('jwtToken')}`} })
        .then(res => {
          console.log(res);
          this.props.history.push('/users')
        });  
    }

  render() {
    return (
        <div>
        <h3>Update User</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th><th>Email</th><th>Type</th><th>Status</th><th>ID</th>
            </tr>
          </thead>
          <tbody><tr>
            <td>{this.state.user.name}</td>
            <td>{this.state.user.email} </td>
            <td>{this.state.user.userType}</td>
            <td>{this.state.user.status}</td>
            <td>{this.state.user._id}</td></tr>
          </tbody>
        </table>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Status: </label><br></br>
            <select name="user_type" id="user_type" value={this.state.status} onChange={this.onChangeStatus} >
              <option value="active">Activate</option>
              <option value="deactivated">Deactivate</option>
            </select>
          </div>
          <div className="form-group">
            <input type="submit" value="Update" className="btn btn-primary" />
          </div>
        </form>

        <div className="form-group2">
            <input type="button" value="Delete user" onClick={this.onDelete} className="btn btn-primary" />
        </div>
      </div>
    )
  }
}