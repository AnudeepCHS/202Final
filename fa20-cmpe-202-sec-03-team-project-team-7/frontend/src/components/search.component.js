import React, { Component } from 'react';
import axios from 'axios';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.onChangeStreet = this.onChangeStreet.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.onChangeZipCode = this.onChangeZipCode.bind(this);
    this.onChangePropertyType = this.onChangePropertyType.bind(this);
    this.onChangeMinPrice = this.onChangeMinPrice.bind(this);
    this.onChangeMaxPrice = this.onChangeMaxPrice.bind(this);
    this.onChangeMinSqFt = this.onChangeMinSqFt.bind(this);
    this.onChangeMaxSqFt = this.onChangeMaxSqFt.bind(this);
    this.onChangeMinBedrooms = this.onChangeMinBedrooms.bind(this);
    this.onChangeMaxBedrooms = this.onChangeMaxBedrooms.bind(this);
    this.onChangeMinBathrooms = this.onChangeMinBathrooms.bind(this);
    this.onChangeMaxBathrooms = this.onChangeMaxBathrooms.bind(this);
    this.onChangeFlooring = this.onChangeFlooring.bind(this);
    this.onChangeParking = this.onChangeParking.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    this.onSave = this.onSave.bind(this);

    this.state = {
      email: localStorage.getItem("email"),
      street: undefined,
      city: undefined,
      state: undefined,
      zipCode: undefined,
      propertyType: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      minSqFt: undefined,
      maxSqFt: undefined,
      minBedrooms: undefined,
      maxBedrooms: undefined,
      minBathrooms: undefined,
      maxBathrooms: undefined,
      flooring: undefined,
      parking: undefined
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
    if (e.target.value === 'any') {
        this.setState({ propertyType: undefined})
    } else this.setState({ propertyType: e.target.value})
  }
  
  onChangeMinPrice(e) {
    this.setState({ minPrice: e.target.value})
  }

  
  onChangeMaxPrice(e) {
    this.setState({ maxPrice: e.target.value})
  }
  
  onChangeMinSqFt(e) {
    this.setState({ minSqFt: e.target.value})
  }

  onChangeMaxSqFt(e) {
    this.setState({ maxSqFt: e.target.value})
  }

  onChangeMinBedrooms(e) {
    this.setState({ minBedrooms: e.target.value})
  }

  onChangeMaxBedrooms(e) {
    this.setState({ maxBedrooms: e.target.value})
  }

  onChangeMinBathrooms(e) {
    this.setState({ minBathrooms: e.target.value})
  }

  onChangeMaxBathrooms(e) {
    this.setState({ maxBathrooms: e.target.value})
  }

  onChangeFlooring(e) {
    if (e.target.value === 'any') {
        this.setState({ flooring: undefined})
    } else this.setState({ flooring: e.target.value})
  }

  onChangeParking(e) {
    if (e.target.value === 'any') {
        this.setState({ parking: undefined})
    } else this.setState({ parking: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault();
    localStorage.setItem('currentSearch', JSON.stringify(this.state));
    this.props.history.push('/listings');
  }

  onSave(e) {
    e.preventDefault();
    axios.post('http://localhost:3001/user/favSearches/', this.state, 
        { headers: {"Authorization" : `Bearer ${localStorage.getItem('jwtToken')}`} })
        .then(res => {
          console.log(res);
        });
  }

  render() {
    let userType = localStorage.getItem('userType');
    const renderSaveButton = ()=>{
      if(userType){
        return <div className="savebtn">
          <input type="submit" onClick={this.onSave} value="Save Favorite Search" className="btn btn-primary" /></div>
      }
    }

    return (
      <div>
        <h3>Search Listings</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Street: </label>
            <input  type="text" className="form-control" value={this.state.street} onChange={this.onChangeStreet}/>
          </div>
          <div className="form-group"> 
            <label>City: </label>
            <input  type="text" className="form-control" value={this.state.city} onChange={this.onChangeCity}/>
          </div>
          <div className="form-group"> 
            <label>State: </label>
            <input  type="text" className="form-control" value={this.state.state} onChange={this.onChangeState}/>
          </div>
          <div className="form-group"> 
            <label>Zip Code: </label>
            <input  type="text" className="form-control" value={this.state.zipCode} onChange={this.onChangeZipCode}/>
          </div>
          <div className="form-group"> 
            <label>Property Type: </label><br></br>
            <select name="type" id="type" value={this.state.type} onChange={this.onChangePropertyType} >
              <option value="any">Any</option>
              <option value="apartment">Apartment</option>
              <option value="townhouse">Townhouse</option>
              <option value="attached">Attached</option>
              <option value="detached">Detached</option>
            </select>
          </div>
          <div className="form-group"> 
            <label>Minimum Price: </label>
            <input  type="number" className="form-control" min="0" step="10000" value={this.state.minPrice} onChange={this.onChangeMinPrice}/>
          </div>
          <div className="form-group"> 
            <label>Maximum Price: </label>
            <input  type="number" className="form-control" min="0" step="10000" value={this.state.maxPrice} onChange={this.onChangeMaxPrice}/>
          </div>
          <div className="form-group"> 
            <label>Minimum Square Feet: </label>
            <input  type="number" className="form-control" min="0" step="100" value={this.state.minSqft} onChange={this.onChangeMinSqFt}/>
          </div>
          <div className="form-group"> 
            <label>Maximum Square Feet: </label>
            <input  type="number" className="form-control" min="0" step="100" value={this.state.maxSqft} onChange={this.onChangeMaxSqFt}/>
          </div>
          <div className="form-group"> 
            <label>Minimum Bedrooms: </label>
            <input  type="number" className="form-control" min="0" step="1" value={this.state.minBedrooms} onChange={this.onChangeMinBedrooms}/>
          </div>
          <div className="form-group"> 
            <label>Maximum Bedrooms: </label>
            <input  type="number" className="form-control" min="0" step="1" value={this.state.maxBedrooms} onChange={this.onChangeMaxBedrooms}/>
          </div>
          <div className="form-group"> 
            <label>Minimum Bathrooms: </label>
            <input  type="number" className="form-control" min="0" step="1" value={this.state.minBathrooms} onChange={this.onChangeMinBathrooms}/>
          </div>
          <div className="form-group"> 
            <label>Maximum Bathrooms: </label>
            <input  type="number" className="form-control" min="0" step="1" value={this.state.maxBathrooms} onChange={this.onChangeMaxBathrooms}/>
          </div>
          <div className="form-group"> 
            <label>Flooring: </label><br></br>
            <select name="flooring" id="flooring" value={this.state.flooring} onChange={this.onChangeFlooring} >
              <option value="any">Any</option>
              <option value="carpet">Carpet</option>
              <option value="wooden">Wooden</option>
            </select>
          </div>
          <div className="form-group"> 
            <label>Parking: </label><br></br>
            <select name="parking" id="parking" value={this.state.parking} onChange={this.onChangeParking} >
              <option value="any">Any</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
              <option value="none">None</option>
            </select>
          </div>
          <div className="form-group">
            <input type="submit" value="Search" className="btn btn-primary" />
          </div>
          {renderSaveButton()}
        </form>
      </div>
    )
  }
}