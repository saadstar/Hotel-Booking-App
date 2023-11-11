import React from 'react';
import { useFetch } from "../hooks/useFetch";
import { Link } from "react-router-dom";

export const FeaturedProperty = () => {
  const { data, loading } = useFetch("http://localhost:3500/api/hotels?featured=true" );
  
  const disply = data.map((item) => {
    return (
        <Link to={`/hotel/${item._id}`}>
      <div className="featuredpro-item" key={item?._id}>
          <img alt="featured-property" src={item?.photos[0]} height={150} />
          <span className="name">{item?.name}</span>
          <span className="city">
            <i class="fa-solid fa-location-dot"></i> {""}
            {item?.city}
          </span>
          <span className="price">{`cheapest Price
        : ${item?.cheapestprice}$`}</span>
          {item?.rating && (
            <div className="ratting">
              <button>{item.rating}</button>
              <span>Excellent</span>
            </div>
          )}
      </div>
        </Link>
    );
  }); 
  return (
    <>
     {loading?(<h3>Loading...</h3>):(
     
        <div className="featured-property">{data &&disply}</div>
     
      )}
    </>
  );
}
