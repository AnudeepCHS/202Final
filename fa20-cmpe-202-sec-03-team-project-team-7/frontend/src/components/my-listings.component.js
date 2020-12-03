import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'moment';

const Listing = props => (
  <tr >
    <td>{props.listing.street + ", " + props.listing.city + ", " + props.listing.state + ", " + props.listing.zipCode}</td>
    <td>{props.listing.propertyType}</td>
    <td>{props.listing.price}</td>
    <td>{props.listing.sqFt}</td>
    <td>{props.listing.bedrooms}</td>
    <td>{props.listing.bathrooms}</td>
    <td>{props.listing.flooring}</td>
    <td>{props.listing.parking}</td>
    <td>{props.listing.yearBuilt}</td>
    <td>{props.listing.securityDeposit}</td>
    <td>{Moment(props.listing.visitDate).format('YYYY-MM-DD')}</td>
    <td>{Moment(props.listing.dateListed).format('YYYY-MM-DD')}</td>
    <td><a href={"updateListing/"+props.listing._id}>Update</a></td>
  </tr>
)

export default class MyListings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listings: []
    }
  }

  componentDidMount() {
    
    axios.post('http://localhost:3001/user/listings/myListings', {email: localStorage.getItem('email')}, 
        { headers: {"Authorization" : `Bearer ${localStorage.getItem('jwtToken')}`} })
        .then(res => {
            this.setState({listings: res.data});
        });
  }

  listingsList() {
    return this.state.listings.map(l => {
      return <Listing listing={l}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Listings</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Address</th><th>Type</th><th>Price</th><th>Square Feet</th><th>Bedrooms</th><th>Bathrooms</th><th>Flooring</th>
              <th>Parking</th><th>Year Built</th><th>Security Deposit</th><th>Visit Date</th><th>Date Listed</th><th>Update</th>
            </tr>
          </thead>
          <tbody>
            { this.listingsList() }
          </tbody>
        </table>
      </div>
    )
  }
}