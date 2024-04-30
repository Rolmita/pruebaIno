import DatabaseForm from "@/components/DatabaseForm"
import { deleteDB } from "@/lib/db-actions"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Navbar from "@/components/NavBar"

async function DeleteDatabase({ searchParams }) {
    const databaseName = searchParams.database

    const session = await auth()

    const user = await prisma.user.findUnique({
        where: { email: session.user.email }
    })

    const dbToDelete = user.databases[databaseName]
    const disabled = true

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
                        <Link className='route-link' href={`/databases/delete-database?database=${databaseName}`}>Delete: {databaseName}</Link>
                    </div>
                </nav>
            </div>
            <div className="show-dashboards">
                <p>¿Are you sure you want to delete your connection to {databaseName}?</p>
                <DatabaseForm userId={user.id} db={dbToDelete} disabled={disabled}>
                    <div>
                        <button className="button" formAction={deleteDB}>Delete</button>
                        <Link className="button" href='/databases'>Cancelar</Link>
                    </div>
                </DatabaseForm>
            </div>
        </main>
    )
}

export default DeleteDatabase