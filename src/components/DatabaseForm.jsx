import Link from "next/link"

function DatabaseForm({ db, action }) {

    const userId = 1
    return (
        <form formAction={action} style={{}}>
            <h1 style={{ color: 'white' }}>Database connection</h1>
            <input type='hidden' name='id-database' defaultValue={db?.id} ></input>
            <input type='hidden' name='userId' defaultValue={userId}></input>
            <div>
                <label htmlFor="name">Database Name:</label>
                <input type='text' defaultValue={db?.name} name='name'></input>
            </div>
            <div>
                <label htmlFor="host">Host name:</label>
                <input type='text' name='host' defaultValue={db?.host}></input>
            </div>
            <div>
                <label htmlFor="port">Port:</label>
                <input type='text' name='port' defaultValue={db?.port}></input>
            </div>
            <div>
                <label htmlFor="user">User:</label>
                <input type='text' name='user' defaultValue={db?.user}></input>
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type='text' name='password' defaultValue={db?.password}></input>
            </div>
            <div>
                {/*TODO:  terminar la conexion a la base de datos (FORMULARIO Y ENVIO DE DATOS)*/}
                <button type='submit' className="button" action={action}>Save Database Configuration</button>
                <button type='reset' className="button"><Link href='/databases'>Cancelar</Link></button>
            </div>
        </form>
    )
}

export default DatabaseForm