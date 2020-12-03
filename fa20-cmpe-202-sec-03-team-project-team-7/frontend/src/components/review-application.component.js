import React, { Component } from 'react';
import axios from 'axios';

export default class ReviewApplication extends Component {
  constructor(props) {
    super(props);

    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      id: '',
      name: '',
      propertyId: '',
      email: '',
      offer: '',
      status: '',
      credit: '',
      employer: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/user/applications/'+this.props.match.params.id, 
      { headers: {"Authorization" : `Bearer ${localStorage.getItem('jwtToken')}`} })
      .then(response => {
        this.setState({id: response.data._id});
        this.setState({applierName : response.data.applierName});
        this.setState({propertyId : response.data.propertyId});
        this.setState({applierEmail : response.data.applierEmail});
        this.setState({offer : response.data.offer});
        this.setState({status : response.data.status});
        this.setState({credit : response.data.credit});
        this.setState({employer : response.data.employer});
      })   
  }

  onChangeStatus(e) {
      this.setState({status: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    let body = 
    {   
        id: this.state.id,
        status: this.state.status
    }
    
    axios.put('http://localhost:3001/user/applications/review', body, 
        { headers: {"Authorization" : `Bearer ${localStorage.getItem('jwtToken')}`} })
        .then(res => {
          console.log(res);
        });

    this.props.history.push('/applications');
  }

  render() {
    let userType = localStorage.getItem('userType');

    const renderApplicationDetails = ()=>{
      if(userType === 'seller'){
        return <table className="table"><thead className="thead-light"><tr><th>Name</th><th>Property ID</th><th>Email</th>
            <th>Offer</th><th>Status</th></tr></thead><tbody><tr>
            <td>{this.state.applierName}</td>
            <td>{this.state.propertyId}</td>
            <td>{this.state.applierEmail}</td>
            <td>{this.state.offer}</td>
            <td>{this.state.status}</td></tr>
            </tbody></table>
      } else if (userType === 'landlord') {
        return <table className="table"><thead className="thead-light"><tr><th>Name</th><th>Property ID</th><th>Email</th>
            <th>Credit</th><th>Employer</th><th>Status</th></tr></thead><tbody><tr>
            <td>{this.state.applierName}</td>
            <td>{this.state.propertyId}</td>
            <td>{this.state.applierEmail}</td>
            <td>{this.state.credit}</td>
            <td>{this.state.employer}</td>
            <td>{this.state.status}</td></tr>
            </tbody></table>
      } else if (userType === 'realtor') {
        return <table className="table"><thead className="thead-light"><tr><th>Name</th><th>Property ID</th><th>Email</th>
            <th>Offer</th><th>Credit</th><th>Employer</th><th>Status</th></tr></thead><tbody><tr>
            <td>{this.state.applierName}</td>
            <td>{this.state.propertyId}</td>
            <td>{this.state.applierEmail}</td>
            <td>{this.state.offer}</td>
            <td>{this.state.credit}</td>
            <td>{this.state.employer}</td>
            <td>{this.state.status}</td></tr>
            </tbody></table>
      }
    }

    return (
      <div>
        <h3>Application</h3>
        {renderApplicationDetails()}
        <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
              <label>Status: </label><br></br>
              <select name="type" id="type" value={this.status} onChange={this.onChangeStatus} >
                <option value="pending">Pending</option>
                <option value="approved">Approve</option>
                <option value="rejected">Reject</option>
            </select>
          </div>
          <div className="form-group">
            <input type="submit" value="Submit" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}