import { getFolderWithDashboards } from "@/lib/actions"
import FolderHeader from "@/components/FolderHeader.jsx";
import ShowArchives from "@/components/ShowArchives.jsx";
import Link from "next/link";
import Navbar from "@/components/Menu";
import NavSection from "@/components/NavSection";

async function FolderFound({ params, isFolder }) {

    let folder
    isFolder = true

    try {
        folder = await getFolderWithDashboards(params.id)
        console.log(folder);
    } catch (error) { console.log(error); }

    return (
        <section>
            <NavSection>
                <img src='/right.svg' width='18px'></img>
                <Link className='route-link' href='/dashboards'>Dashboards</Link>
                <img src='/right.svg' width='18px'></img>
                <Link className='route-link' href={`/dashboards/folder/${folder.id}`}>{folder.name}</Link>
            </NavSection>
            <div className="show-dashboards">
                <FolderHeader folder={folder}></FolderHeader>
                <ShowArchives folder={folder} isFolder={isFolder}></ShowArchives>
            </div>
        </section>
    )

}

export default FolderFound