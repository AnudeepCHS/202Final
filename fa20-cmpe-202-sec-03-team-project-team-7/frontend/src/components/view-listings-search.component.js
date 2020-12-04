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
    <td>{Moment(props.listing.dateListed).format('YYYY-MM-DD')}</td>
    <td><a href={"listing/"+props.listing._id}>Here</a></td>
  </tr>
)

export default class ViewListingsSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listings: []
    }
  }

  componentDidMount() {
    console.log(this.props.match.params.id);

    axios.get('http://52.89.223.218:3001/user/favSearches/'+this.props.match.params.id, 
      { headers: {"Authorization" : `Bearer ${localStorage.getItem('jwtToken')}`} })
      .then(res => {
        console.log(res.data);
        axios.post('http://52.89.223.218:3001/user/listings/search', res.data[0])
        .then(res => {
          console.log(res.data);
          this.setState({listings: res.data});
        });
    });

  }

  listingsList() {
    return this.state.listings.map(l => {
      return <Listing listing={l} key={l._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Listings</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Address</th><th>Type</th><th>Price</th><th>Square Feet</th><th>Bedrooms</th><th>Bathrooms</th>
              <th>Date Listed</th><th>View More Details</th>
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