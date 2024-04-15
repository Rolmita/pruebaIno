import NewMenu from "./NewMenu"
function DashboardsHeader() {

    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <h1 style={{color:'white'}}>Dashboards</h1>
            </div>
            {/* <NewMenu></NewMenu> */}
        </div>
    )
}

export default DashboardsHeader