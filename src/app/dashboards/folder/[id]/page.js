import { getFolderById } from "@/lib/actions"
import FolderHeader from "@/components/FolderHeader.jsx";
import ShowArchives from "@/components/ShowArchives.jsx";
import Link from "next/link";
import Navbar from "@/components/NavBar";

async function FolderFound({ params, isFolder }) {

    let folder
    isFolder = true

    try {
        folder = await getFolderById(params.id)
    } catch (error) { console.log(error); }

    return (
        <section>
            <div className='nav-section-page' style={{ display: 'flex', flexDirection: 'row' }}>
                <Navbar></Navbar>
                <nav className='nav-section-page'>
                    <div>
                        <Link className='route-link' href='/'><h1>Nombre</h1></Link>
                        <img src='/right.svg' width='18px'></img>
                        <Link className='route-link' href='/dashboards'>Dashboards</Link>
                        <img src='/right.svg' width='18px'></img>
                        <Link className='route-link' href={`/dashboards/folder/${folder.id}`}>{folder.name}</Link>
                    </div>
                </nav>
            </div>
            <div className="show-dashboards">
                <FolderHeader folder={folder}></FolderHeader>
                <ShowArchives folder={folder} isFolder={isFolder}></ShowArchives>
            </div>
        </section>
    )

}

export default FolderFound