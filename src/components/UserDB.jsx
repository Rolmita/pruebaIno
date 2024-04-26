
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
    console.log(user.databases);

    return (
        <div>
            <ul className='databases-list'>
            {databases != null && Object.keys(databases).length > 0 ? (
                    Object.keys(databases).map(dbName => (
                        <li key={dbName} style={{ color: 'white', listStyle: 'none' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div><h3>{dbName}</h3></div>
                                <div style={{ width: '300px', display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
                                    <Link className="button" href={`/databases/edit-database?database=${dbName}`}
                                        style={{ textDecoration: 'none', width: '100%', margin: '0 10px', backgroundColor: 'darkgrey', borderColor: 'darkgrey' }}>
                                        Editar
                                    </Link>
                                    <Link className="button" href={`/databases/delete-database?database=${dbName}`}
                                        style={{ textDecoration: 'none', width: '100%', margin: '0 10px', backgroundColor: 'darkgrey', borderColor: 'darkgrey' }}>
                                        Eliminar
                                    </Link>
                                </div>
                            </div>
                        </li>
                    ))
                ) : (
                    <li>No hay bases de datos registradas para el usuario</li>
                )}
            </ul>
        </div>
    )
}
