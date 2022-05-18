import React from 'react';
import loc from '../img/loc.svg';

export default function Card(props) {
    
    console.log(props)
    
    return (
      <section className="container">
          <div className="card--container">
            <img src={props.item.imageUrl} alt=""></img>
            <div className="card--info">
              <div className="location-wrapper">
                <img className="icon-loc"src={loc} alt="" />
                <h4 className="card--location">{props.item.location.toUpperCase()}</h4>
                <a href={props.item.googleMapsUrl} className="card--maps"> View on Google Maps</a>
              </div>
              <h1 className="card--title">{props.item.title}</h1>
              <h3 className="card--date">{`${props.item.startDate} - ${props.item.endDate}`}</h3>
              <p className="card--description">{props.item.description}</p>
            </div>
          </div>
          <hr className="hr"></hr>
      </section>
    );
}
