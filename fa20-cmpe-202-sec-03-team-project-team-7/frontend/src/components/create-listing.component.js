import React, { Component } from 'react';
import axios from 'axios';

export default class CreateListing extends Component {
  constructor(props) {
    super(props);

    this.onChangeStreet = this.onChangeStreet.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.onChangeZipCode = this.onChangeZipCode.bind(this);
    this.onChangePropertyType = this.onChangePropertyType.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeSqFt = this.onChangeSqFt.bind(this);
    this.onChangeBedrooms = this.onChangeBedrooms.bind(this);
    this.onChangeBathrooms = this.onChangeBathrooms.bind(this);
    this.onChangeFlooring = this.onChangeFlooring.bind(this);
    this.onChangeParking = this.onChangeParking.bind(this);
    this.onChangeYearBuilt = this.onChangeYearBuilt.bind(this);
    this.onChangeSecurityDeposit = this.onChangeSecurityDeposit.bind(this);
    this.onChangeVisitDate = this.onChangeVisitDate.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        ownerEmail: localStorage.getItem("email"),
        street: undefined,
        city: undefined,
        state: undefined,
        zipCode: undefined,
        propertyType: 'apartment',
        price: undefined,
        sqFt: undefined,
        bedrooms: undefined,
        bathrooms: undefined,
        flooring: 'carpet',
        parking: 'open',
        yearBuilt: undefined,
        securityDeposit: undefined,
        visitDate: undefined
    }
  }

  onChangeStreet(e) {
    this.setState({ street: e.target.value})
  }

  onChangeCity(e) {
    this.setState({ city: e.target.value})
  }

  onChangeState(e) {
    this.setState({ state: e.target.value})
  }

  onChangeZipCode(e) {
    this.setState({ zipCode: e.target.value})
  }
  
  onChangePropertyType(e) {
    this.setState({ propertyType: e.target.value})
  }
  
  onChangePrice(e) {
    this.setState({ price: e.target.value})
  }
  
  onChangeSqFt(e) {
    this.setState({ sqFt: e.target.value})
  }

  onChangeBedrooms(e) {
    this.setState({ bedrooms: e.target.value})
  }

  onChangeBathrooms(e) {
    this.setState({ bathrooms: e.target.value})
  }

  onChangeFlooring(e) {
    this.setState({ flooring: e.target.value})
  }

  onChangeParking(e) {
    this.setState({ parking: e.target.value})
  }

  onChangeYearBuilt(e) {
    this.setState({ yearBuilt: e.target.value})
  }

  onChangeSecurityDeposit(e) {
    this.setState({ securityDeposit: e.target.value})
  }

  onChangeVisitDate(e) {
    this.setState({ visitDate: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(localStorage.getItem('jwtToken'));
    axios.post('http://localhost:3001/user/listings/', this.state, 
        { headers: {"Authorization" : `Bearer ${localStorage.getItem('jwtToken')}`} })
        .then(res => {
          console.log(res);
        });

    this.props.history.push('/myListings')
  }

  render() {
    return (
        <div>
        <h3>Submit a New Listing</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Street: </label>
            <input  type="text" required className="form-control" value={this.state.street} onChange={this.onChangeStreet}/>
          </div>
          <div className="form-group"> 
            <label>City: </label>
            <input  type="text" required className="form-control" value={this.state.city} onChange={this.onChangeCity}/>
          </div>
          <div className="form-group"> 
            <label>State: </label>
            <input  type="text" required className="form-control" value={this.state.state} onChange={this.onChangeState}/>
          </div>
          <div className="form-group"> 
            <label>Zip Code: </label>
            <input  type="text" required className="form-control" value={this.state.zipCode} onChange={this.onChangeZipCode}/>
          </div>
          <div className="form-group"> 
            <label>Property Type: </label><br></br>
            <select name="type" id="type" value={this.state.type} onChange={this.onChangePropertyType} >
              <option value="apartment">Apartment</option>
              <option value="townhouse">Townhouse</option>
              <option value="attached">Attached</option>
              <option value="detached">Detached</option>
            </select>
          </div>
          <div className="form-group"> 
            <label>Price: </label>
            <input  type="number" required className="form-control" min="0" value={this.state.price} onChange={this.onChangePrice}/>
          </div>
          <div className="form-group"> 
            <label>Square Feet: </label>
            <input  type="number" required className="form-control" min="0" value={this.state.sqFt} onChange={this.onChangeSqFt}/>
          </div>
          <div className="form-group"> 
            <label>Bedrooms: </label>
            <input  type="number" required className="form-control" min="0" step="1" value={this.state.bedrooms} onChange={this.onChangeBedrooms}/>
          </div>
          <div className="form-group"> 
            <label>Bathrooms: </label>
            <input  type="number" required className="form-control" min="0" step="1" value={this.state.bathrooms} onChange={this.onChangeBathrooms}/>
          </div>
          <div className="form-group"> 
            <label>Flooring: </label><br></br>
            <select name="flooring" required id="flooring" value={this.state.flooring} onChange={this.onChangeFlooring} >
              <option value="carpet">Carpet</option>
              <option value="wooden">Wooden</option>
            </select>
          </div>
          <div className="form-group"> 
            <label>Parking: </label><br></br>
            <select name="parking" required id="parking" value={this.state.parking} onChange={this.onChangeParking} >
              <option value="open">Open</option>
              <option value="closed">Closed</option>
              <option value="none">None</option>
            </select>
          </div>
          <div className="form-group"> 
            <label>Year Built: </label>
            <input type="number" className="form-control" min="0" value={this.state.yearBuilt} onChange={this.onChangeYearBuilt}/>
          </div>
          <div className="form-group"> 
            <label>Security Deposit: </label>
            <input type="number" className="form-control" min="0" value={this.state.securityDeposit} onChange={this.onChangeSecurityDeposit}/>
          </div>
          <div className="form-group"> 
            <label>Open House: </label>
            <input type="date" className="form-control" min="0" value={this.state.visitDate} onChange={this.onChangeVisitDate}/>
          </div>
          <div className="form-group">
            <input type="submit" value="Submit" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}