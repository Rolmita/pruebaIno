
import { auth } from "@/auth"
import { prisma } from '@/lib/prisma';
import Link from "next/link";

export default async function UserDB({ children }) {

    let session = await auth()
    console.log(session);
    let userEmail = session.user.email;
    const user = await prisma.user.findUnique({
        where: { email: userEmail }
    })
    console.log(user);
    const databases = user.databases

    return (
        <div>
            <ul className='databases-list'>
                {databases != null
                    ? databases.map(db => (
                        <li key={db.database} style={{ color: 'white', listStyle: 'none' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div><h3>{db.database}</h3></div>
                                <div style={{ width: '300px', display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
                                    <Link className="button" href={`/databases/edit-database?database=${db.database}`}
                                        style={{ textDecoration: 'none', width: '100%', margin: '0 10px', backgroundColor: 'darkgrey', borderColor: 'darkgrey' }}>
                                        Edit
                                    </Link>
                                    <Link className="button" href={`/databases/delete-database?database=${db.database}`}
                                        style={{ textDecoration: 'none', width: '100%', margin: '0 10px', backgroundColor: 'darkgrey', borderColor: 'darkgrey' }}>
                                        Delete
                                    </Link>
                                </div>
                            </div>
                        </li>
                    ))
                    : 'No hay bases de datos registradas para el usuario'}
            </ul>
        </div>
    )
}
