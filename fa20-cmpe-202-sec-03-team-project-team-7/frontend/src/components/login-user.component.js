import React, { Component } from 'react';
import axios from 'axios';

export default class LoginUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: '',
      password: ''
    }
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

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    }

    console.log(user);

    axios.post('http://localhost:3001/user/login', user)
      .then(res => {
        console.log(res.data);
        localStorage.setItem('name', res.data.name);
        localStorage.setItem('id', res.data.id);
        localStorage.setItem('jwtToken', res.data.token);
        localStorage.setItem('email', res.data.email);
        localStorage.setItem('userType', res.data.userType);
        localStorage.setItem('status', res.data.status);

        if (localStorage.getItem('status') === 'deactivated') {
          alert('Your account has been deactivated');
        } else {
          this.props.history.push('/')
        }
      })
      .catch(err => {
        alert('Invalid Credentials');
      });

    this.setState({
      email: '',
      password: ''
    })
  }

  render() {
    return (
      <div>
        <h3>User Login</h3>
        <form onSubmit={this.onSubmit}>
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
            <input type="submit" value="Login" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}