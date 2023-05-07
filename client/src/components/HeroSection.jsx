import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from '../styles/Button';

const HeroSection = () => {
  return (
    <Wrapper>
    <div className="container">
    <div className="grid grid-two-column">
      <div className="
      hero-section-data">
        <p className="intro-data">Welcome to </p>
        <h1>Shopzilla</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
          atque temporibus veniam doloribus libero ad error omnis voluptates
          animi! Suscipit sapiente.
        </p>
        <Link to="/products">
          <Button>shop now</Button>
        </Link>
      </div>
      {/* our homepage image  */}
      <div className="hero-section-image">
        <figure>
          <img
            src="https://teensmakehealthhappen.org/wp-content/uploads/2022/02/pexels-gustavo-fring-3985062-scaled.jpg"
            alt="hero-section-family"
            className="img-style"
          />
        </figure>
      </div>
    </div>
  </div>
  </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 7.6rem 8rem;
 
  img {
    min-width: 10rem;
    height: 10rem;
  }

  .hero-section-data {
    p {
      margin: 1.4rem 0; 
    }

    h1 {
      text-transform: capitalize;
      font-weight: bold;
      color:#4B3049;
    }

    .intro-data {
      margin-bottom: 0;  
    }
  }

  .hero-section-image {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  figure {
    position: relative;

    &::after {
      content: "";
      width: 60%;
      height: 80%;
      background-color:#B08EAD;
      position: absolute;
      left: 50%;
      top: -4rem;
      z-index: -1;
    }
  }
  .img-style {
    width: 100%;
    height: auto;
  }
  @media (max-width: 600px) {
    padding:4rem 0rem;
    .grid {
      gap: 6rem;
    }
    figure::after {
      content: "";
      width: 50%;
      height: 100%;
      left: 0;
      top: 10%;
      /* bottom: 10%; */
      background-color: #B08EAD;
    }
    p,button{
  font-size:0.8rem
}
h1{
  font-size:2.8rem
}
h2{
  font-size:1rem
 }
  }


 `;

export default HeroSection

  