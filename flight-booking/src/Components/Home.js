import React from 'react'
import { Header } from './Header'
import { NavBar } from './NavBar'
import { Featured } from './Featured'
import { Property } from './Property'
import { FeaturedProperty } from './FeaturedProperty'
import { MailList } from './MailList'
import { Footer } from './Footer'

export const Home = () => {
  return (
    <div>
      <Header />
      <div className="homeContainer">
        <Featured />
        <h1 className="home-title">Browse by property type</h1>
        <Property />
        <h1 className="home-title">Home guests love</h1>
        <FeaturedProperty />
        <MailList />
        <Footer />
      </div>
    </div>
  );
}
