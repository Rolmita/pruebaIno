import DatabaseForm from "@/components/DatabaseForm"
import { deleteDB } from "@/lib/db-actions"
import { getUserBySession } from "@/lib/actions"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Navbar from "@/components/Menu"
import NavSection from "@/components/NavSection"

async function DeleteDatabase({ searchParams }) {
    const databaseName = searchParams.database

    const user = await getUserBySession()

    const dbToDelete = user.databases[databaseName]

    const disabled = true

    return (
        <main>
            <NavSection>
                <Link className='route-link' href='/databases'>Databases</Link>
                <img src='/right.svg' width='18px'></img>
                <Link className='route-link' href={`/databases/delete-database?database=${databaseName}`}>
                    Delete: {databaseName}
                </Link>
            </NavSection>

            {/* TODO: JUSTIFICAR AL CENTRO LOS BOTONES COMO SEA */}
            <div className="show-dashboards">
                <div style={{ margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <h1>Delete database</h1>
                    <p style={{ margin: '10px 0', color: '#202c59' }}>¿Are you sure you want to delete your connection to {databaseName}?</p>
                    <DatabaseForm userId={user.id} db={dbToDelete} disabled={disabled}>
                        <div style={{ padding: '10px 0', margin: 'auto', justifyItems: 'center' }}>
                            <button className="button" formAction={deleteDB}>Delete</button>
                            <Link className='cancel-db' href='/databases'>Cancelar</Link>
                        </div>
                    </DatabaseForm>
                </div>
            </div>
        </main>
    )
}

export default DeleteDatabase