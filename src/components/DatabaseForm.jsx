import Link from "next/link"

function DatabaseForm({ db, userId, children, disabled }) {

    return (
        <form >
            <input type='hidden' name='userId' defaultValue={userId}></input>
            <input type='hidden' name='dbPrev' defaultValue={db?.database}></input>
            <div className="form-row" style={{justifyContent:'right'}}>
                <label htmlFor="name">Database name:</label>
                <input type='text' defaultValue={db?.database} name='name' disabled={disabled} required></input>
            </div>
            <div className="form-row" style={{justifyContent:'right'}}>
                <label htmlFor="host">Host name:</label>
                <input type='text' name='host' defaultValue={db?.host} disabled={disabled} required></input>
            </div>
            <div className="form-row" style={{justifyContent:'right'}}>
                <label htmlFor="port">Port:</label>
                {db
                    ? <input type='text' name='port' defaultValue={db?.port} disabled={disabled} required></input>
                    : <input type='text' name='port' defaultValue='3306' disabled={disabled} required></input>
                }
            </div>
            <div className="form-row" style={{justifyContent:'right'}}>
                <label htmlFor="user">User:</label>
                <input type='text' name='user' defaultValue={db?.user} disabled={disabled} required></input>
            </div>
            <div className="form-row" style={{justifyContent:'right'}}>
                <label htmlFor="password">Password:</label>
                <input type='text' name='password' defaultValue={db?.password} disabled={disabled} required></input>
            </div>
            {children}
        </form>
    )
}

export default DatabaseForm