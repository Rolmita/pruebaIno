import DatabaseForm from "@/components/DatabaseForm"
import { saveDbConnection } from "@/lib/db-actions"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Navbar from "@/components/NavBar"

async function NewDatabase() {
    const session = await auth()
    console.log(session);

    const user = await prisma.user.findUnique({
        where: { email: session.user.email }
    })

    const disabled = false

    return (
        <main>
            <div className='nav-section-page' style={{ display: 'flex', flexDirection: 'row' }}>
                <Navbar></Navbar>
                <nav className='nav-section-page'>
                    <div>
                        <Link className='route-link' href='/'><h1>Nombre</h1></Link>
                        <img src='/right.svg' width='18px'></img>
                        <Link className='route-link' href='/databases'>Databases</Link>
                        <img src='/right.svg' width='18px'></img>
                        <Link className='route-link' href='/databases/new-database'>New</Link>
                    </div>
                </nav>
            </div>
            <div className="show-dashboards">
                <DatabaseForm userId={user.id} disabled={disabled} >
                    <div>
                        <button type='submit' className="button" formAction={saveDbConnection}>Save Database Configuration</button>
                        <Link className="button" href='/databases'>Cancelar</Link>
                    </div>
                </DatabaseForm>
            </div>
        </main>
    )
}

export default NewDatabase