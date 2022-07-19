import spinner from '../loading.gif';
import React, { Component } from 'react'

export default class Spinner extends Component {
  render() {
    return (
      <div className='container text-center'>
        <img src={spinner} alt="Loading Spinner" />
      </div>
    )
  }
}
