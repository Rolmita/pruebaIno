import { deleteDashboard, deleteFolder } from "@/lib/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";

function List({ archives, isFolder, identificationFolder }) {


    let elementsList = [];
    let isDashboard;
    let folderId;

    if (isFolder) {
        elementsList = archives.dashboards
        folderId = archives.dashboards.folderId
    } else {
        elementsList = archives.folders.concat(archives.dashboards)
    }

    // console.log('Lista de elementos', elementsList);

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
        <ul className='folder-dashboard-list' style={{ backgroundColor: 'lightgray', width: 'auto' }}>
            {elementsList.map(element =>
                <li className='list-row' key={element.name} style={{ width: '100%' }}>
                    {!isFolder && element.folderId !== null
                        ? <div className="list-row-div">
                            <Link className='list-element' href={`/dashboards/folder/${element.id}`} style={{ width: '93%', marginRight: '2%' }}>
                                <div>
                                    <img src='/folder2.svg' width='20px' />
                                    <p>{element.name}</p>
                                </div>
                                <span>{formattedDateTime(element.updatedAt)}</span>
                            </Link>
                            <button type='button' style={{ width: 'auto', height: 'auto' }} onClick={() => deleteFolder(element.id)}>
                                <img src='/cross.svg' style={{ height: '10px', margin: '2px' }}></img>
                            </button>
                        </div>
                        : ''}

                    {!isFolder && element.folderId === null
                        ? <div className="list-row-div">
                            <Link className='list-element' href={`/dashboards/${element.id}`} target='__blank' style={{ width: '93%', marginRight: '2%' }}>
                                <div >
                                    <img src='/dashboard-img.svg' width='15px'></img>
                                    <p>{element.name}</p>
                                </div>
                                <div>
                                    <span>{formattedDateTime(element.updatedAt)}</span>
                                </div>
                            </Link>
                            <button type='button' style={{ width: 'auto', height: 'auto' }} onClick={() => deleteDashboard(element.id)}>
                                <img src='/cross.svg' style={{ height: '10px', margin: '2px' }}></img>
                            </button>
                        </div>
                        : ''
                    }

                    {isFolder
                        ? <div className="list-row-div">
                            <Link className='list-element' href={`/dashboards/folder/${element.folderId}/${element.id}`} target='__blank' style={{ width: '93%', marginRight: '2%' }}>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <img src='/dashboard-img.svg' width='15px'></img>
                                    <p>{element.name}</p>
                                </div>
                                <div>
                                    <span>{formattedDateTime(element.updatedAt)}</span>
                                </div>
                            </Link>
                            <button type='button' style={{ width: 'auto', height: 'auto' }} onClick={() => deleteDashboard(element.id)}>
                                <img src='/cross.svg' style={{ height: '10px', margin: '2px' }}></img>
                            </button>
                        </div>
                        : ''}

                </li>
            )}
        </ul >
    )
}

export default List