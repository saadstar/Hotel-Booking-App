import React from 'react'
import { Link } from 'react-router-dom'

export const MailList = () => {
  return (
    <div className='mail'>
      <h1 className='mail-title'>Save time, save money!</h1>
      <span className='mail-desc'>Signup and we'll send the best deals to you</span>
      <span className='mail-input-container'>
        <input placeholder='Your Email' type="mail" />
        <Link to="/signup">
          <button>Subscribe</button>
        </Link>
      </span>
    </div>
  )
}
