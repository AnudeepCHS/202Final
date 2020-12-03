import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    var userType = localStorage.getItem('userType');

    const renderFavorites = ()=>{
      if(userType && userType !== 'admin' && userType !== 'realtor'){
        return <Fragment><li className="navbar-item"><Link to="/favHomes" className="nav-link">Favorite Homes</Link></li>
        <li className="navbar-item"><Link to="/favSearches" className="nav-link">Favorite Searches</Link></li></Fragment>
      }
    }

    const renderLoginLogout = ()=>{
      if(userType){
        return <Link to="/logout" className="nav-link">Logout</Link>
      } else {
        return <Fragment><li className="navbar-item"><Link to="/login" className="nav-link">Login</Link></li>
        <li className="navbar-item"><Link to="/signup" className="nav-link">User Registration</Link></li></Fragment>
      }
    }

    const renderSellerLandlordTabs = ()=>{
      if(userType === 'seller' || userType === 'landlord' || userType === 'realtor'){
        return <Fragment><li className="navbar-item">
        <Link to="/createListing" className="nav-link">Create a Listing</Link></li>
        <li className="navbar-item"><Link to="/myListings" className="nav-link">My Listings</Link></li>
        <li className="navbar-item">
        <Link to="/applications" className="nav-link">Applications to Review</Link>
        </li></Fragment>
      } 
    }

    const renderAdminTabs = ()=>{
      if(userType === 'admin'){
        return <li className="navbar-item"><Link to="/users" className="nav-link">Manage Users</Link></li>
      } 
    }

    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Home App</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/listings" className="nav-link">Listings</Link>
          </li>
          <li className="navbar-item">
          <Link to="/search" className="nav-link">Search</Link>
          </li>
          {renderFavorites()}
          {renderSellerLandlordTabs()}
          {renderAdminTabs()}
          {renderLoginLogout()}
        </ul>
        </div>
      </nav>
    );
  }
}