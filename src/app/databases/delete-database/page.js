import DatabaseForm from "@/components/DatabaseForm"
import { getDatabase } from "@/lib/actions.js"

async function EditDatabase({ searchParams }) {
    const databaseId = Number(searchParams.id)
    //TODO: buscar bases de datos en actions.js en lugar de meterlas en la variable array predefinida
    
    // const db = await getDatabase(databaseId);

    const databases = [
        { id: 1, name: 'casa_almazara', host: 'localhost', port: '3306', user: 'root', password: 'root' },
        { id: 2, name: 'prueba_inoelec', host: 'localhost', port: '3306', user: 'root', password: 'root' },
        { id: 3, name: 'prueba_datos', host: 'localhost', port: '3306', user: 'root', password: 'root' },
    ]

    let foundDatabase;

    for (const db of databases) { if (db.id === databaseId) foundDatabase = db }

    console.log('esta es la base de datos', foundDatabase);

    return (
        <main>
            <div className="show-dashboards">
                <DatabaseForm db={foundDatabase} />
            </div>
        </main>
    )
}

export default EditDatabase