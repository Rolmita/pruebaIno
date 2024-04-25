'use client'

import Routebar from "../components/Routebar";
import Navbar from "../components/NavBar";
import Link from "next/link";

const Home = ({ children }) => {

  return (
    <main>
      <div className='nav-section-page' style={{ display: 'flex', flexDirection: 'row' }}>
        <Navbar></Navbar>
        <nav className='nav-section-page' style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <Link className='route-link' href='/'><h1>Nombre</h1></Link>
          </div>
        </nav></div>
      {children}
    </main>
  );
};

export default Home;

