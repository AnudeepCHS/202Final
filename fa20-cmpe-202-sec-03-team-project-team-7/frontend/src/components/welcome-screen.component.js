import React, { Component } from 'react';

export default class Welcome extends Component {
  render() {

    let name = localStorage.getItem('name');

    const welcome = ()=>{
      if(name){
        return <h3>Welcome, {name}</h3>        
      } else {
      }
    }

    return (
      <div>
        {welcome()}
      </div>
    )
  }
}