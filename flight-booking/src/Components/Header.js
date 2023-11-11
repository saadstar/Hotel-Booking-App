import React, { useContext, useState } from 'react';
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import {useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { newSearch } from '../redux/Actions';
import { AuthContext } from '../Context/AuthContext';

export const Header = ({type}) => {
  const [openDate, setOpenDate] = useState(false);
  const [destination, setDestination] = useState("");
  const navigate = useNavigate("");
  const search = useSelector((state) => state.Reducer);
  const dispatch = useDispatch();
  const [date,setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    }
  ]);
  const [openOption, setOpenOption] = useState(false);
  const [option, setOption] = useState({
    room:1,
    children: 0,
    adult:1,
  });
  const { user } = useContext(AuthContext);
  const optionHandler = (name, operation) => {
    setOption((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? option[name] + 1 : option[name] - 1
      };
    });
  };

  const formHandler = (e) => {
    e.preventDefault();
    setOpenDate(false);
    
  }
  const btnHandler = (ile) => {
    navigate("/hotels",{state:{destination,date,option}});
    dispatch(newSearch({ destination, date, option }));
  }
  return (
    <div className="header">
      <div
        className={
          type === "hotels" ? "header-container listMode" : "header-container"
        }
      >
        <div className="header-list">
          <div className="header-list-item active">
            <i class="fa-solid fa-bed"></i>
            <span>Stays</span>
          </div>
          <div className="header-list-item ">
            <i class="fa-solid fa-plane"></i>
            <span>Flights</span>
          </div>
          <div className="header-list-item">
            <i class="fa-solid fa-car"></i>
            <span>Car Rentals</span>
          </div>
          <div className="header-list-item nonee">
            <i class="fa-solid fa-bed"></i>
            <span>Attrections</span>
          </div>
          <div className="header-list-item nonee">
            <i class="fa-solid fa-taxi"></i>
            <span>Airport Taxis</span>
          </div>
        </div>
        {type !== "hotels" && (
          <div className="header-bottom">
            <h1 className="header-title">
              A lifetime of discounts? It's Genuis.
            </h1>
            <p className="header-desc">
              Get rewarded for your travels - unlock instant saving of 10% or
              more with a free saad booking account
            </p>
            {!user && (
              <button className="header-button">Sign in / Register</button>
            )}
            {/* // start search */}
            <form className="header-search" onSubmit={formHandler}>
              <div className="header-search-item">
                <i class="fa-solid fa-bed" id="header-icon"></i>
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="header-search-input"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="header-search-item">
                <i
                  class="fa-solid fa-calendar-days"
                  id="header-icon"
                  onClick={() => setOpenDate(!openDate)}
                ></i>
                <span
                  className="header-search-text"
                  onClick={() => setOpenDate(!openDate)}
                >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )} `}</span>
                {openDate && (
                  <DateRange
                    minDate={new Date()}
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date-fns"
                  />
                )}
              </div>
              <div className="header-search-item">
                <i
                  class="fa-solid fa-person"
                  id="header-icon"
                  onClick={() => setOpenOption(!openOption)}
                ></i>
                <span
                  className="header-search-text"
                  onClick={() => setOpenOption(!openOption)}
                >
                  {`${option.adult} adult . ${option.children} children . ${option.room} room .`}
                </span>
                {openOption && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={option.adult <= 1}
                          className="optionButton"
                          onClick={() => optionHandler("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionNumber">{option.adult}</span>
                        <button
                          className="optionButton"
                          onClick={() => optionHandler("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          className="optionButton"
                          onClick={() => optionHandler("children", "d")}
                          disabled={option.children <= 0}
                        >
                          -
                        </button>
                        <span className="optionNumber">{option.children}</span>
                        <button
                          className="optionButton"
                          onClick={() => optionHandler("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          className="optionButton"
                          onClick={() => optionHandler("room", "d")}
                          disabled={option.room <= 1}
                        >
                          -
                        </button>
                        <span className="optionNumber">{option.room}</span>
                        <button
                          className="optionButton"
                          onClick={() => optionHandler("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="header-search-item">
                <button className="header-button" onClick={btnHandler}>
                  Search
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
