import React, { Component } from 'react';
import axios from 'axios';

export default class SignupUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeUserType = this.onChangeUserType.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      email: '',
      password: '',
      userType: 'renter'
    }
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  onChangeUserType(e) {
      console.log(e.target.value);
    this.setState({
      userType: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      userType: this.state.userType
    }

    axios.post('http://localhost:3001/user/signup', user)
      .then(res => console.log(res.data));

    this.setState({
      name: '',
      email: '',
      password: '',
      userType: 'renter'
    })
  }

  render() {
    return (
      <div>
        <h3>New User Registration</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Name: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeName}
                />
          </div>
          <div className="form-group"> 
            <label>Email: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
                />
          </div>
          <div className="form-group"> 
            <label>Password: </label>
            <input  type="password"
                required
                className="form-control"
                value={this.state.password}
                onChange={this.onChangePassword}
                />
          </div>
          <div className="form-group"> 
            <label>User Type: </label><br></br>
            <select name="user_type" id="user_type" value={this.state.userType} onChange={this.onChangeUserType} >
              <option value="renter">Renter</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="landlord">Landlord</option>
              <option value="realtor">Realtor</option>
            </select>
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}