
import { auth } from "@/auth"
import { prisma } from '@/lib/prisma';
import Link from "next/link";

export default async function UserDB({children}) {

    let session = await auth()
    console.log(session);
    let userEmail = session.user.email;
    const user = await prisma.user.findUnique({
        where: { email: userEmail }
    })
    console.log(user);
    // const databases = JSON.parse(user.databases)

    const databases = [{
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'primera',
        port: '3306',
        supportBigNumbers: true,
        decimalNumbers: true,
    },{
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'segunda',
        port: '3306',
        supportBigNumbers: true,
        decimalNumbers: true,
    },{
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'tercera',
        port: '3306',
        supportBigNumbers: true,
        decimalNumbers: true,
    },{
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'cuarta',
        port: '3306',
        supportBigNumbers: true,
        decimalNumbers: true,
    }]

    return (
        <div>
            <ul className='databases-list'>
                {databases != null
                    ? databases.map(db => (
                        <li key={db.database} style={{ color: 'white', listStyle: 'none' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div><h3>{db.database}</h3></div>
                                <div style={{ width: '300px', display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
                                    {/* <button className="button" style={{ margin: '0 10px', backgroundColor: 'darkgrey', borderColor: 'darkgrey' }}> */}
                                        <Link className="button" href={`/databases/edit-database?id=${db.id}`} style={{ textDecoration: 'none', width: '100%',margin: '0 10px', backgroundColor: 'darkgrey', borderColor: 'darkgrey'  }}>Edit</Link>
                                        <Link className="button" href={`/databases/delete-database?id=${db.id}`} style={{ textDecoration: 'none', width: '100%',margin: '0 10px', backgroundColor: 'darkgrey', borderColor: 'darkgrey'  }}>Delete</Link>
                                    {/* TODO: LLEVAR A PAGINA DE CONFIRMACION CON LINK PARA BORRAR */}
                                    {/* TODO: CAMBIAR BOTON A LINK */}
                                    {/* </button> */}
                                    {children}
                                </div>
                            </div>
                        </li>
                    ))
                    : 'No hay bases de datos registradas para el usuario'}
            </ul>
        </div>
    )
}
