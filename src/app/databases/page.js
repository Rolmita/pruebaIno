
import Link from "next/link";
// import { useState } from "react";
import UserDB from "@/components/UserDB";

function Databases() {

    // const [divDisplay, setDivDisplay] = useState('none')

    // const handleDelete = async () => {
    //     setDivDisplay('block')
    // }
    // const handleCancel = () => {
    //     setDivDisplay('none')
    // }
    return (
        <main>
            <div className="show-dashboards" style={{ maxWidth: '50vw', margin: '0 auto' }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 style={{ color: 'white' }}>Databases Connected</h1>
                    <div><button className="button"><Link href='/databases/new-database' style={{ textDecoration: 'none' }}>New database</Link></button></div>
                </div>
                <UserDB>
                    {/* <button className="button" style={{ margin: 0, backgroundColor: 'darkgrey', borderColor: 'darkgrey' }} onClick={handleDelete} >Delete </button> */}
                </UserDB>
                {/*AÑADIR CSS PARA QUE SEA CONTENEDOR EMERGENTE EN LA PAGINA  */}
                {/* <div style={{ display: `${divDisplay}` }}>
                    <h2 style={{ color: 'white' }}>Do you want to delete the database?</h2>
                    <button type='submit' className="button">Confirm</button>
                    <button type='reset' className="button" onClick={handleCancel}>Cancel</button>
                </div> */}
            </div>
        </main>
    )
}

export default Databases