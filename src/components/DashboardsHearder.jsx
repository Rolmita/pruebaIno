'use client'
import NewMenu from "./NewMenu"
import MenuButton from "./MenuButton"

function DashboardsHeader({ user }) {

    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <h1 style={{ color: '#202c59' }}>Dashboards and folders list</h1>
            </div>
            <NewMenu user={user}></NewMenu>
        </div>
    )
}

export default DashboardsHeader