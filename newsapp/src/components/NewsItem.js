// import PropTypes from 'prop-types'
import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    // let today = new Date();
    let { title, description, imageUrl, articleUrl, author, date, source } = this.props;
    // console.log(today.toLocaleDateString());
    return (
      <div>
        <div className="card" >
          <span className="position-absolute top-0 badge rounded-pill bg-danger btn-lg" style={{ right: "-5%" }}>
            {source}
            <span className="visually-hidden">unread messages</span>
          </span>
          <img src={imageUrl} className="card-img-top" alt="..." style={{ height: "160px" }} />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a rel="noreferrer" href={articleUrl} target="_blank" className="btn btn-dark btn-sm">Read More</a>
            <p className="card-text my-3"><small className="text-muted">By <strong>{author ? author : "Unknown"}</strong> on <strong>{(new Date(date).toGMTString())}</strong></small></p>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem