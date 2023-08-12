import React, { useEffect, useState } from 'react'
import { featuredData } from './DummyData';
import { useFetch } from '../hooks/useFetch';
import axios from 'axios';
export const Featured = () => {
   const { data, loading, error } = useFetch(
     "http://localhost:3500/api/hotels/countbycity?cities=berlin,madrid,london"
   );
  return (
    <div className="featured">
      {featuredData.map((item,i) => {
        return (
          loading?<h6>Loading Please wait !</h6>:(
          <><div className="featured-item">
            <img src={item.image} alt="featured" />
            <div className="featured-title">
              <h1>{item.name}</h1>
              <h2>{data[i]}</h2>
            </div>
          </div></>)
        );
      })}
    </div>
  );
}
