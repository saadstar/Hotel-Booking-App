import React from 'react'
import { useFetch } from '../hooks/useFetch';
import { propertyData } from './DummyData';
export const Property = () => {
  const { data, loading, error } = useFetch("http://localhost:3500/api/hotels/countbytype");
  
  
  return (
    <div className="property">
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <>
          {data &&
            propertyData.map((item, i) => (
              <div className="property-item" key={i}>
                <img alt="property" src={item.image} />
                <div className="property-title">
                  <h1>{data[i]?.type}</h1>
                  <h2>
                    {`${data[i]?.count}  
                    ${data[i]?.type}`}
                  </h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
}
