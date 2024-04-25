
import Link from "next/link";
import Navbar from "@/components/NavBar";
import UserDB from "@/components/UserDB";

function Databases() {

    //TODO: MEJORAR CSS DE TODAS LAS PAG
    return (
        <main>
            <div className='nav-section-page' style={{ display: 'flex', flexDirection: 'row' }}>
                <Navbar></Navbar>
                <nav className='nav-section-page'>
                    <div>
                        <Link className='route-link' href='/'><h1>Nombre</h1></Link>
                        <img src='/right.svg' width='18px'></img>
                        <Link className='route-link' href='/databases'>Databases</Link>
                    </div>
                </nav>
            </div>
            <div className="show-dashboards" style={{ maxWidth: '50vw', margin: '0 auto' }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 style={{ color: 'white' }}>Databases Connected</h1>
                    <div>
                        <button className="button">
                            <Link href='/databases/new-database' style={{ textDecoration: 'none' }}>
                                New database
                            </Link>
                        </button>
                    </div>
                </div>
                <UserDB></UserDB>
            </div>
        </main>
    )
}

export default Databases