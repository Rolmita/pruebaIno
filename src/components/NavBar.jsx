'use client'
import Link from 'next/link'
import { useState } from 'react'

function Navbar() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className='burger-menu'>
            <button className="burger-icon" onClick={toggleMenu}>
                <img className='burger-img' src='/burguer.svg' width='40px' />
            </button>
            {isOpen && (
                <div className="menu">
                    {/* <Link className="menu-item" href="/"><img className='burger-img' src='/logo.svg' width='30px' /></Link> */}
                    <Link className="menu-item" href="/dashboards"><img className='burger-img' src='/dashboard.svg' width='30px' />Dashboards</Link>
                    <Link className="menu-item" href="/databases"><img className='burger-img' src='/database_settings_icon.svg' width='30px' />Databases</Link>
                    <Link className="menu-item" href="/settings"><img className='burger-img' src='/settings.svg' width='30px' />Settings</Link>
                </div>
            )}
        </nav>

        // <nav className='burger-menu'>

        //     <img src='/logo.svg' width='40px'></img>
        //     <button className="burger-icon" onClick={toggleMenu}>
        //         <img className='burger-img' src='/burguer.svg' width='40px' />
        //     </button>

        //     {isOpen && (
        //         <div className="menu">
        //             <Link className="menu-item" href="/"><h1 style={{fontWeight:'bold'}}>Nombre</h1></Link>
        //             <Link className="menu-item" href="/dashboards"><img className='burger-img' src='/dashboard.svg' width='40px' /></Link>
        //             <Link className="menu-item" href="/databases"><img className='burger-img' src='/database_settings_icon.svg' width='40px' /></Link>
        //             <Link className="menu-item" href="/settings"><img className='burger-img' src='/settings.svg' width='40px' /></Link>
        //             <button className="burger-icon" onClick={toggleMenu}>
        //                 <img className='burger-img' src='/burguer.svg' width='40px' />
        //             </button>
        //         </div>
        //     )}
        // </nav>
    )
}
export default Navbar