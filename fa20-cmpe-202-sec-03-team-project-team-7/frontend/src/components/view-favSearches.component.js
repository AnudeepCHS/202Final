import React, { Component } from 'react';
import axios from 'axios';

const FavSearch = props => (
  <tr >
    <td>{props.search.street}</td>
    <td>{props.search.city}</td>
    <td>{props.search.state}</td>
    <td>{props.search.zipCode}</td>
    <td>{props.search.propertyType}</td>
    <td>{props.search.minPrice}</td>
    <td>{props.search.maxPrice}</td>
    <td>{props.search.minSqFt}</td>
    <td>{props.search.maxSqFt}</td>
    <td>{props.search.minBedrooms}</td>
    <td>{props.search.maxBedrooms}</td>
    <td>{props.search.minBathrooms}</td>
    <td>{props.search.maxBathrooms}</td>
    <td>{props.search.flooring}</td>
    <td>{props.search.parking}</td>
    <td><a href={"listingsSearchID/"+props.search._id}>Search!</a></td>
  </tr>
)

export default class ViewFavSearches extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favSearches: []
    }
  }

  componentDidMount() {
    axios.post('http://52.89.223.218:3001/user/favSearches/searchEmail', {email: localStorage.getItem('email')},  
      { headers: {"Authorization" : `Bearer ${localStorage.getItem('jwtToken')}`} })
      .then(res => {
        console.log(res.data);
        this.setState({favSearches: res.data});
    });
  }

  favSearchList() {
    return this.state.favSearches.map(s => {
      return <FavSearch search={s} key={s._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Favorite Searches</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Street</th><th>City</th><th>State</th><th>Zip Code</th><th>Type</th><th>Min Price</th><th>Max Price</th>
              <th>Min Sq Ft</th><th>Max Sq Ft</th><th>Min Bedrooms</th><th>Max Bedrooms</th><th>Min Bathrooms</th>
              <th>Max Bathrooms</th><th>Flooring</th><th>Parking</th><th>Search!</th>
            </tr>
          </thead>
          <tbody>
            { this.favSearchList() }
          </tbody>
        </table>
      </div>
    )
  }
}