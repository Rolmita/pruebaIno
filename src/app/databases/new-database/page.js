import DatabaseForm from "@/components/DatabaseForm"
import { getDatabase } from "@/lib/actions.js"

async function NewDatabase() {

    return (
        <main>
            <div className="show-dashboards">
                <DatabaseForm />
            </div>
        </main>
    )
}

export default NewDatabase