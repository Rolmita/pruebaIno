import Dashboard from "@/components/Dashboard";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DashboardHeader from "@/components/DashboardHeader";
import NavSection from "@/components/NavSection";

async function FolderDashboard({ params }) {

    const dashboard = await prisma.dashboard.findUnique({
        where: { id: Number(params.dashboardId) }
    })

    console.log(JSON.parse(dashboard.content));

    return (
        <section>
            <NavSection dashboard={{ id: dashboard.id, name: dashboard.name }}>
                <img src='/right.svg' width='18px'></img>
                <Link className='route-link' href='/dashboards'>Dashboards</Link>
                <img src='/right.svg' width='18px'></img>
                <Link className='route-link' href={`/dashboards/${dashboard.id}`}>{dashboard.name}</Link>
            </NavSection>
            <div style={{ width: '100%' }}>
                <DashboardHeader dashboard={dashboard}></DashboardHeader>
                <Dashboard dashboard={dashboard}></Dashboard>
            </div>
        </section>
    )
}

export default FolderDashboard