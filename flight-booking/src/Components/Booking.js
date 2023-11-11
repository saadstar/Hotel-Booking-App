import React, {  useEffect, useState } from 'react';
import axios from 'axios';
import "./booking.css";
import {useNavigate} from "react-router-dom"


export const Booking = ({ setIsModel, hotelId }) => {
  const [rooms, setRooms] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const navigate = useNavigate();

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked ?
        [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    )
  };
  const btnHandler =async (e) => {
    e.preventDefault();
    try {
      await Promise.all(selectedRooms.map((roomId) => {
        const res = axios.put(``);
        navigate("/")
      }))
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const getAllRooms = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3500/api/hotels/room/${hotelId}`
        );
        setRooms(res.data);
      } catch (err) { }
    }
    getAllRooms();
  }, [hotelId]);
  return (
    <div className="booking">
      <div className="booking-container">
        <i
          class="fa-solid fa-circle-xmark"
          id="rClose"
          onClick={() => setIsModel(false)}
        ></i>
        <span>Select Your Room:</span>
        { rooms.length>=1? rooms?.map((item) => (
          <div className="rItem">
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                max People: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">Price:<b>{item.price}</b></div>
              <div className='selectedRoom'>
              {item.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input type="checkbox" value={roomNumber._id} onChange={ handleSelect} />
                </div>
              ))}
            </div>
            </div>
          </div>
        )):<h1>No Rooms are avaiable Now.</h1>}
        <button onClick={btnHandler} className='rButton'>Reserve Now!</button>
      </div>
    </div>
  );
};
