
import Link from "next/link";
import Navbar from "@/components/Menu";
import UserDB from "@/components/UserDB";
import NavSection from "@/components/NavSection";

function Databases() {

    //TODO: MEJORAR CSS DE TODAS LAS PAG
    return (
        <main>
            <section>
                <NavSection>
                    <img src='/right.svg' width='18px'></img>
                    <Link className='route-link' href='/databases'>Databases</Link>
                </NavSection>

                <div className="show-databases">
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h1>Databases Connected</h1>
                        <div>
                            <button className="button">
                                <Link href='/databases/new-database' style={{ textDecoration: 'none', color: 'white' }}>
                                    New database
                                </Link>
                            </button>
                        </div>
                    </div>
                    <UserDB></UserDB>
                </div>
            </section>
        </main>
    )
}

export default Databases