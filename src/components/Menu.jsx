'use client'
import Link from 'next/link'
import { useState } from 'react'

function Navbar() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className='dropdown-menu'>
            <button className="dropdown-icon" onClick={toggleMenu}>
                <img className='dropdown-logo' src='/logo.png' />
            </button>
            {isOpen && (
                <div className="menu">
                    <Link className="menu-item" href="/">
                        {/* <img className='burger-img' width='30px'/> */}
                        <h3>Home</h3></Link>
                    <Link className="menu-item" href="/dashboards">
                        {/* <img className='burger-img' src='/dashboard.svg' width='30px' /> */}
                        <h3>Dashboards</h3></Link>
                    <Link className="menu-item" href="/databases">
                        {/* <img className='burger-img' src='/database_settings_icon.svg' width='30px' /> */}
                        <h3>Databases</h3></Link>
                    <Link className="menu-item" href="/settings">
                        {/* <img className='burger-img' src='/settings.svg' width='30px' /> */}
                        <h3>Settings</h3></Link>
                </div>
            )}
        </nav>
    )
}
export default Navbar