import NewMenu from "@/app/components/NewMenu";
import Link from "next/link"
import ShowArchives from "@/app/components/ShowArchives";
import FolderHeader from "@/app/components/FolderHeader";


async function FolderPage({ searchParams }) {

    const isFolder = true
    console.log(searchParams);

    const folder = await prisma.folder.findUnique({
        where: {
            id: Number(searchParams.id)
        },
        include: {
            dashboards: true
        }
    })

    console.log(folder);

    return (

        <main>
            <div className="show-dashboards">
                <FolderHeader folder={folder}></FolderHeader>
                <ShowArchives folder={folder} isFolder={isFolder}></ShowArchives>
            </div>
        </main>

    )
}

export default FolderPage;