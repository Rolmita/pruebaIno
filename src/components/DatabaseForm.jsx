import Link from "next/link"

function DatabaseForm({ db, userId, children, disabled }) {

    db != null ? db = db[0] : db

    return (
        <form>
            {disabled ?? <h1 style={{ color: 'white' }}>Database connection</h1>}
            <input type='hidden' name='userId' defaultValue={userId}></input>
            <input type='hidden' name='dbPrev' defaultValue={db?.database}></input>
            <div>
                <label htmlFor="name">Database Name:</label>
                <input type='text' defaultValue={db?.database} name='name' disabled={disabled}></input>
            </div>
            <div>
                <label htmlFor="host">Host name:</label>
                <input type='text' name='host' defaultValue={db?.host} disabled={disabled}></input>
            </div>
            <div>
                <label htmlFor="port">Port:</label>
                <input type='text' name='port' defaultValue={db?.port} disabled={disabled}></input>
            </div>
            <div>
                <label htmlFor="user">User:</label>
                <input type='text' name='user' defaultValue={db?.user} disabled={disabled}></input>
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type='text' name='password' defaultValue={db?.password} disabled={disabled}></input>
            </div>
            {children}
        </form>
    )
}

export default DatabaseForm