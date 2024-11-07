// src/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';
import './Login.css';

function Homepage() {
  return (
    <section>
      <div className='navbar'>
        <div className="fcontainer">
          <div className="fitem1">
            <Link to="#auctions" style={{ color: 'inherit', textDecoration: 'none' }}>
              Upcoming
            </Link>
          </div>
          <div className="fitem2">
            <Link to="#trending" style={{ color: 'inherit', textDecoration: 'none' }}>
              Trending
            </Link>
          </div>
          <div className="fitem3">
            <Link to="#locations" style={{ color: 'inherit', textDecoration: 'none' }}>
              Locations
            </Link>
          </div>
          <div className="fitem3">
            <Link to="#credits" style={{ color: 'inherit', textDecoration: 'none' }}>
              Credits
            </Link>
          </div>
          <div className="fitem4">
            <Link to="#contact" style={{ color: 'inherit', textDecoration: 'none' }}>
              Contact
            </Link>
          </div>

          <div className="fitem7">
            <br />
            <input type="text" placeholder="Search by keyword" />
          </div>

          <div className="fitem5">
            <input
              type="image"
              src="Untitled-removebg-preview.png"
              alt="Error"
              style={{ height: '200px' }}
            />
          </div>
          <div className="login">
            <Link to="/Signup">
              <button type="button">
                &nbsp; SIGN UP &nbsp;
              </button>
            </Link>
            <Link to="/Login">
              <button type="button">
                &nbsp; LOGIN &nbsp;
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Homepage;