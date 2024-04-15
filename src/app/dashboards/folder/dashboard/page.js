import Dashboard from "@/app/components/Dashboard"

function DashboardPage({searchParams}) {
    return (
        <main>
            <Dashboard searchParams={{searchParams}}></Dashboard>
        </main>
    )
}

export default DashboardPage