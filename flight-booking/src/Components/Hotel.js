import React, { useContext, useState } from 'react'
import { Header } from './Header'
import { NavBar } from './NavBar'
import "./hotel.css";
import { MailList } from './MailList';
import { Footer } from './Footer';
import { useFetch } from "../hooks/useFetch";
import { useLocation,Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AuthContext } from '../Context/AuthContext';
import {Booking} from "./Booking"

export const Hotel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModel, setIsModel] = useState(false);
  const [slidNumber, setSlideNumber] = useState(0);
  const location = useLocation();
  const ids = location.pathname.split("/")[2];
  const { data, loading, error } = useFetch(
    `http://localhost:3500/api/hotels/find/${ids}`
  );
  const search = useSelector((state) => state.Reducer);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const MILLISECONED_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDefference(date1, date2) {
    const timeDeff = Math.abs(date2.getTime() - date1.getTime());
    const deffDays = Math.ceil(timeDeff / MILLISECONED_PER_DAY);
    return deffDays;
  }
  const viewHours=(dayDefference(search.date[0].endDate, search.date[0].startDate));

  const handler = (i) => {
    setIsOpen(true);
    setSlideNumber(i);
  };
  const Photos = [
    {
      src: "../images/photos.jpg",
    },
    {
      src: "../images/photos2.jpg",
    },
    {
      src: "../images/photos3.jpg",
    },
    {
      src: "../images/photos4.jpg",
    },
    {
      src: "../images/photos5.jpg",
    },
    {
      src: "../images/photos6.jpg",
    },
  ];
  const moveHandler = (direction) => {
    let newSliderNumber;
    if (direction === "l") {
      newSliderNumber = slidNumber === 0 ? 5 : slidNumber - 1;
    } else {
      newSliderNumber = slidNumber === 5 ? 0 : slidNumber + 1;
    }
    setSlideNumber(newSliderNumber);
  };
  const btnHandler = () => {
    if (user) {
      setIsModel(true);
    } else {
      navigate("/login")
    }
  }
  return (
    <div>      
      <Header type="hotels" />
      {isOpen && (
        <div className="slider">
          <div className="slideWrapper">
            <i
              class="fa-solid fa-xmark"
              id="close"
              onClick={() => setIsOpen(false)}
            ></i>
            <i
              class="fa-solid fa-circle-arrow-left"
              id="arrow"
              onClick={() => moveHandler("l")}
            ></i>
            <img
              src={Photos[slidNumber].src}
              alt="sliderImg"
              className="slideImg"
            />
            <i
              class="fa-solid fa-circle-arrow-right"
              id="arrow"
              onClick={() => moveHandler("r")}
            ></i>
          </div>
        </div>
      )}
      {loading ? (
        "Loading...."
      ) : (
        <div className="hotelContainer">
          <div className="hotelWrapper ">
            <div className="flex-book">
              <div className="hotelWrapper">
                <h1 className="hotelTitle">{data.name}</h1>
                <div className="hotelAdress">
                  <i class="fa-solid fa-location-dot"></i>
                  <span>{data.address}</span>
                </div>
                <span className="hotelDiatance">
                  Excellent location - {data.distance} from center
                </span>
                <span className="hotelPriceHighlight">
                  Book a stay over ${data.cheapestprice} at this property and
                  get a free airport taxi
                </span>
              </div>
              <div>
                <button className="bookNow" onClick={btnHandler}>
                  Reserve Or Book Now
                </button>
              </div>
            </div>
            <div className="hotelImages">
              {Photos.map((item, i) => {
                return (
                  <div className="hotelImgWrapper">
                    <img
                      src={item.src}
                      alt={data.name}
                      onClick={() => handler(i)}
                      className="hotelImg"
                      height="200px"
                    />
                  </div>
                );
              })}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsText">
                <h1 className="hotelTitle">Stay in the heart of {data.city}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {viewHours}-night stay</h1>
                <span>
                  Located in the real heart of {data.city}, this property has a
                  Excellent location score of 9.8
                </span>
                <h2>
                  <b>${data.cheapestprice * viewHours * search.option.room}</b>(
                  {viewHours} nights)
                </h2>
                <button className="bookNow" onClick={btnHandler}>
                  Reserve or Book Now!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <MailList />
      <Footer />
      {isModel && <Booking setIsModel={setIsModel} hotelId={ids} />}
    </div>
  );
}
