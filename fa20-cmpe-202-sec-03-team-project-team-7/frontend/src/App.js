
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component"
import Welcome from "./components/welcome-screen.component";
import ViewListing from "./components/view-listing.component";
import UpdateListing from "./components/update-listing.component";
import CreateListing from "./components/create-listing.component";
import SignupUser from "./components/signup-user.component";
import LoginUser from "./components/login-user.component";
import LoginAdmin from "./components/login-admin.component";
import SignupAdmin from "./components/signup-admin.component";
import Logout from "./components/logout.component";
import ViewListings from "./components/view-listings.component";
import ViewListingsSearch from "./components/view-listings-search.component";
import MyListings from "./components/my-listings.component";
import Search from "./components/search.component";
import ViewFavHomes from "./components/view-favHomes.component";
import ViewFavSearches from "./components/view-favSearches.component";
import ViewApplications from "./components/view-applications.component";
import ReviewApplication from "./components/review-application.component";
import ViewUsers from "./components/view-users.component";
import UpdateUser from "./components/update-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={Welcome} />
        <Route path="/listing/:id" component={ViewListing} />
        <Route path="/signup" component={SignupUser} />
        <Route path="/login" component={LoginUser} />
        <Route path="/logout" component={Logout} />
        <Route path="/loginAdmin" component={LoginAdmin} />
        <Route path="/signupAdmin" component={SignupAdmin} />
        <Route path="/listings" component={ViewListings} />
        <Route path="/listingsSearchID/:id" component={ViewListingsSearch} />
        <Route path="/myListings" component={MyListings} />
        <Route path="/search" component={Search} />
        <Route path="/createListing" component={CreateListing} />
        <Route path="/updateListing/:id" component={UpdateListing} />
        <Route path="/favHomes" component={ViewFavHomes} />
        <Route path="/favSearches" component={ViewFavSearches} />
        <Route path="/applications" component={ViewApplications} />
        <Route path="/application/:id" component={ReviewApplication} />
        <Route path="/users" component={ViewUsers} />
        <Route path="/updateUser/:id" component={UpdateUser} />
      </div>
    </Router>
  );
}

export default App;