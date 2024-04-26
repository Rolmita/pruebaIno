import Dashboard from "@/components/Dashboard";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/NavBar";
import DashboardHeader from "@/components/DashboardHeader";

async function FolderDashboard({ params }) {

    const dashboard = await prisma.dashboard.findUnique({
        where: { id: Number(params.dashboardId) }
    })

    const folder = await prisma.folder.findUnique({
        where: { id: Number(params.id) }
    })

    console.log(JSON.parse(dashboard.content));

    return (
        <section>
            <div className= 'nav-section-page' style={{display:'flex', flexDirection:'row'}}>
                <Navbar></Navbar>
                <nav className='nav-section-page' style={{display:'flex', flexDirection:'column'}}>
                    <div>
                        <Link className='route-link' href='/'><h1>Nombre</h1></Link>
                        <img src='/right.svg' width='18px'></img>
                        <Link className='route-link' href='/dashboards'>Dashboards</Link>
                        <img src='/right.svg' width='18px'></img>
                        <Link className='route-link' href={`/dashboards/folder/${folder.id}`}>{folder.name}</Link>
                        <img src='/right.svg' width='18px'></img>
                        <Link className='route-link' href={`/dashboards/folder/${folder.id}/${dashboard.id}`}>{dashboard.name}</Link>
                    </div>
                </nav></div>
            <div style={{ width: '100%' }}>
                <DashboardHeader folder={folder} dashboard={dashboard}></DashboardHeader>
                <Dashboard dashboard={dashboard}></Dashboard>
            </div>
        </section>
    )
}

export default FolderDashboard