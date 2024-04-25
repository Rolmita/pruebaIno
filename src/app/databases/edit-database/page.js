import DatabaseForm from "@/components/DatabaseForm"
import { editDbConnection } from "@/lib/actions.js"
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Navbar from "@/components/NavBar";

async function EditDatabase({ searchParams }) {
    const databaseName = searchParams.database

    const session = await auth()

    const user = await prisma.user.findUnique({
        where: { email: session.user.email }
    })

    const userDB = user.databases
    const dbToEdit = userDB.filter((db) => db.database == databaseName)

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
                        <Link className='route-link' href={`/databases/edit-database?database=${databaseName}`}>Edit: {databaseName}</Link>
                    </div>
                </nav>
            </div>
            <div className="show-dashboards">
                <DatabaseForm db={dbToEdit} userId={user.id} disbaled={disabled}>
                    <button type='submit' className="button" formAction={editDbConnection}>Save Database Configuration</button>
                    <Link className="button" href='/databases'>Cancelar</Link>
                </DatabaseForm>
            </div>
        </main>
    )
}

export default EditDatabase