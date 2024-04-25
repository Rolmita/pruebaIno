import Link from "next/link";
import { useRouter } from "next/navigation";

function List({ archives, isFolder }) {


    let elementsList = [];
    let isDashboard;
    let folderId;

    if (isFolder) {
        elementsList = archives.folders.dashboards
        folderId = archives.folders.id
    } else {
        elementsList = archives.folders.concat(archives.dashboards)
    }

    console.log('Lista de elementos', elementsList);

    const formattedDateTime = (datetime) => {
        const date = new Date(datetime);
        const day = ('0' + date.getDate()).slice(-2)
        const month = ('0' + (date.getMonth() + 1)).slice(-2)
        const year = date.getFullYear()
        const hour = ('0' + date.getHours()).slice(-2)
        const min = ('0' + date.getHours()).slice(-2)
        const lastUpdate = `${day}-${month}-${year} ${hour}:${min}`
        return lastUpdate
    }

    // TODO: EN CSS ESTOS LINKS Y LOS LI INCLUYENDO EL :HOVER (NO FUNCIONAN BIEN LSO EVENTOS)
    return (
        <ul className='folder-dashboard-list' style={{ backgroundColor: 'lightgray' }}>
            {elementsList.map(element =>
                <li key={element.name}>
                    {!isFolder && element.folderId !== null
                        ? <Link className='list-element' href={`dashboards/folder/${element.id}`} target='__blank'>
                            <div>
                                <img src='/folder2.svg' width='20px' />
                                <p>{element.name}</p>
                            </div>
                            <span>{formattedDateTime(element.updatedAt)}</span>
                        </Link>
                        : ''}

                    {!isFolder && element.folderId === null
                        ? <Link className='list-element' href={`dashboards/${element.id}`} target='__blank'>
                            <div><img src='/dashboard-img.svg' width='15px'></img>
                                <p>{element.name}</p></div>
                            <span>{formattedDateTime(element.updatedAt)}</span>
                        </Link>
                        : ''
                    }

                    {isFolder
                        ? <Link className='list-element' href={`${folderId}/${element.id}`} target='__blank'>
                            <div><img src='/dashboard-img.svg' width='15px'></img>
                                <p>{element.name}</p></div>
                            <span>{formattedDateTime(element.updatedAt)}</span>
                        </Link>
                        : ''}

                </li>
            )}
        </ul >
    )
}

export default List