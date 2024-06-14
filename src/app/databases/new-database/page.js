import DatabaseForm from "@/components/DatabaseForm"
import { saveDbConnection } from "@/lib/db-actions"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Navbar from "@/components/Menu"
import NavSection from "@/components/NavSection"

async function NewDatabase() {
    const session = await auth()
    console.log(session);

    const user = await prisma.user.findUnique({
        where: { email: session.user.email }
    })

    const disabled = false

    return (
        <main>
            <NavSection>
                <img src='/right.svg' width='18px'></img>
                <Link className='route-link' href='/databases'>Databases</Link>
                <img src='/right.svg' width='18px'></img>
                <Link className='route-link' href='/databases/new-database'>New database</Link>
            </NavSection>

            <div className="show-dashboards">
                <div style={{ margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <h1>New database</h1>
                    <DatabaseForm userId={user.id} disabled={disabled} >
                        <div style={{ padding: '10px 0', margin: 'auto' }}>
                            <button type='submit' className="button" formAction={saveDbConnection}>Save Database Configuration</button>
                            <Link className="button" href='/databases'>Cancelar</Link>
                        </div>
                    </DatabaseForm>
                </div>
            </div>
        </main>
    )
}

export default NewDatabase