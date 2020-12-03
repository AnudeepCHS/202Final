import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'moment';

const FavHome = props => (
  <tr >
    <td>{props.home.street + ", " + props.home.city + ", " + props.home.state + ", " + props.home.zipCode}</td>
    <td>{props.home.propertyType}</td>
    <td>{props.home.price}</td>
    <td>{props.home.sqFt}</td>
    <td>{props.home.bedrooms}</td>
    <td>{props.home.bathrooms}</td>
    <td>{Moment(props.home.dateListed).format('YYYY-MM-DD')}</td>
    <td><a href={"listing/"+props.home._id}>Here</a></td>
  </tr>
)

export default class ViewFavHomes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favHomes: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/user/favHomes/'+localStorage.getItem('id'), 
      { headers: {"Authorization" : `Bearer ${localStorage.getItem('jwtToken')}`} })
      .then(res => {
        console.log(res.data);
        this.setState({favHomes: res.data});
    });
  }

  favHomeList() {
    return this.state.favHomes.map(h => {
      return <FavHome home={h} key={h._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Favorite Homes</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Address</th><th>Type</th><th>Price</th><th>Square Feet</th><th>Bedrooms</th><th>Bathrooms</th>
              <th>Date Listed</th><th>View More Details</th>
            </tr>
          </thead>
          <tbody>
            { this.favHomeList() }
          </tbody>
        </table>
      </div>
    )
  }
}