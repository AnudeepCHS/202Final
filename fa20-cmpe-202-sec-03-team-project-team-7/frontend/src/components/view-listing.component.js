import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'moment';

export default class ViewListing extends Component {
  constructor(props) {
    super(props);

    this.onSave = this.onSave.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeOffer = this.onChangeOffer.bind(this);
    this.onChangeCredit = this.onChangeCredit.bind(this);
    this.onChangeEmployer = this.onChangeEmployer.bind(this);

    this.state = {
      listing: {},
      offer: 0,
      credit: 0,
      employer: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/user/listings/'+this.props.match.params.id)
      .then(response => {
        this.setState({ listing: response.data});
      })   
      .catch(function (error) {
        console.log(error);
      })
  }

  onChangeOffer(e) {
    this.setState({
      offer: e.target.value
    })
  }

  onChangeCredit(e) {
    this.setState({
      credit: e.target.value
    })
  }

  onChangeEmployer(e) {
    this.setState({
      employer: e.target.value
    })
  }

  onSave(e) {
    e.preventDefault();
    axios.put('http://localhost:3001/user/favHomes/'+this.state.listing._id, {email: localStorage.getItem('email')}, 
        { headers: {"Authorization" : `Bearer ${localStorage.getItem('jwtToken')}`} })
        .then(res => {
          console.log(res);
        });

    this.props.history.push('/favHomes')
  }

  onSubmit(e) {
    e.preventDefault();
    let body = 
    {   
        applierName: localStorage.getItem('name'),
        propertyId: this.props.match.params.id,
        applierEmail: localStorage.getItem('email'),
        reviewerEmail: this.state.listing.ownerEmail,
        offer: this.state.offer,
        employer: this.state.employer
    }

    console.log(body);
    
    axios.post('http://localhost:3001/user/applications/', body, 
        { headers: {"Authorization" : `Bearer ${localStorage.getItem('jwtToken')}`} })
        .then(res => {
          console.log(res);
        });

    this.props.history.push('/listings');
  }

  render() {
    let userType = localStorage.getItem('userType');
    const renderSaveButton = ()=>{
      if(userType && userType !== 'realtor'){
        return <div className="savebtn"><input type="submit" onClick={this.onSave} value="Save Favorite Home" className="btn btn-primary" /></div>        
      }
    }

    const renderApplyForm = ()=>{
      if(userType === 'buyer'){
        return <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Offer: </label>
            <input  type="number" required className="form-control" value={this.state.offer} onChange={this.onChangeOffer}/>
          </div>
          <div className="form-group">
            <input type="submit" value="Apply for Purchase" className="btn btn-primary" />
          </div>
        </form>
      } else if (userType === 'renter') {
        return <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Credit Score: </label>
            <input  type="text" required className="form-control" value={this.state.credit} onChange={this.onChangeCredit}/>
          </div>
          <div className="form-group"> 
            <label>Employer: </label>
            <input  type="text" required className="form-control" value={this.state.employer} onChange={this.onChangeEmployer}/>
          </div>
          <div className="form-group">
            <input type="submit" value="Apply for Lease" className="btn btn-primary" />
          </div>
        </form>
      } else if (userType === 'realtor') {
        return <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Offer: </label>
            <input  type="number" required className="form-control" value={this.state.offer} onChange={this.onChangeOffer}/>
          </div>
          <div className="form-group"> 
            <label>Credit Score: </label>
            <input  type="text" required className="form-control" value={this.state.credit} onChange={this.onChangeCredit}/>
          </div>
          <div className="form-group"> 
            <label>Employer: </label>
            <input  type="text" required className="form-control" value={this.state.employer} onChange={this.onChangeEmployer}/>
          </div>
          <div className="form-group">
            <input type="submit" value="Apply for Lease" className="btn btn-primary" />
          </div>
        </form>
      }
    }

    return (
      <div>
        <h3>Listing</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Address</th><th>Type</th><th>Email</th><th>Price</th><th>Square Feet</th><th>Bedrooms</th><th>Bathrooms</th>
              <th>Flooring</th><th>Parking</th><th>Year Built</th><th>Security Deposit</th><th>Visit Dates</th><th>Date Listed</th>
            </tr>
          </thead>
          <tbody><tr>
            <td>{this.state.listing.street + ", " + this.state.listing.city + ", " + this.state.listing.state + ", " + this.state.listing.zipCode}</td>
            <td>{this.state.listing.propertyType}</td>
            <td>{this.state.listing.ownerEmail}</td>
            <td>{this.state.listing.price}</td>
            <td>{this.state.listing.sqFt}</td>
            <td>{this.state.listing.bedrooms}</td>
            <td>{this.state.listing.bathrooms}</td>
            <td>{this.state.listing.flooring}</td>
            <td>{this.state.listing.parking}</td>
            <td>{this.state.listing.yearBuilt}</td>
            <td>{this.state.listing.securityDeposit}</td>
            <td>{Moment(this.state.listing.visitDate).format('YYYY-MM-DD')}</td>
            <td>{Moment(this.state.listing.dateListed).format('YYYY-MM-DD')}</td></tr>
          </tbody>
        </table>
        {renderSaveButton()}
        <br></br>
        {renderApplyForm()}
      </div>
    )
  }
}