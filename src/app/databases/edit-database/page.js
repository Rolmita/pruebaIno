import DatabaseForm from "@/components/DatabaseForm"
import { editDbConnection } from "@/lib/db-actions"
import { getUserByEmail } from "@/lib/data";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Navbar from "@/components/Menu";
import NavSection from "@/components/NavSection";

async function EditDatabase({ searchParams }) {
    const databaseName = searchParams.database

    const session = await auth()

    const user = await getUserByEmail(session.user.email)

    const dbToEdit = user.databases[databaseName]
    const disabled = false

    return (
        <main>
            <NavSection>
                <img src='/right.svg' width='18px'></img>
                <Link className='route-link' href='/databases'>Databases</Link>
                <img src='/right.svg' width='18px'></img>
                <Link className='route-link' href={`/databases/edit-database?database=${databaseName}`}>Edit: {databaseName}</Link>
            </NavSection>

            <div className="show-databases">
                <div style={{ margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <h1>Edit database</h1>
                    <DatabaseForm db={dbToEdit} userId={user.id} disbaled={disabled}>
                        <div style={{ padding: '10px 0', margin: 'auto' }}>
                            <button type='submit' className="button" formAction={editDbConnection}>Save Database Configuration</button>
                            <Link className="cancel-db" href='/databases'>Cancelar</Link>
                        </div>
                    </DatabaseForm>
                </div>
            </div>
        </main>
    )
}

export default EditDatabase