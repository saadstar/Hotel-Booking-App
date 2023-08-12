import React from 'react'
import { Link } from 'react-router-dom';

export const SearchItem = ({item}) => {
  return (
    <div className="waller" key={item._id}>
      <div className="search-item">
        <div className="dispaly-flex">
          <img
            src={item.photos[0]}
            alt={"destion"}
            height={180}
            width="150px"
          />
          <div className="content-x">
            <h4>{item.name}</h4>
            <p className="ayna">{item.distance} from center</p>
            <button className="btn-green">Free airport taxi</button>
            <h6>{item.title}</h6>
            <p className="ayna">
              Entire Studio<span></span> 1 Bathroom<span></span>
              21m 1 Full bed
            </p>
            <p className="free">Free Cancellation</p>
            <p className="fae">
              you can cancel later,so lock in the great price today!
            </p>
          </div>
          <div className="create">
            {item.rating && (
              <div className="d-flex">
                <span>Excellent</span>
                <button className="blue">{item.rating}</button>
              </div>
            )}
            <span>${item.cheapestprice}</span>
            <p className="ayna">icludes taxes and fees</p>
            <Link to={`/hotels/${item._id }`}>
              <button className="btn-all">See availbale</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
