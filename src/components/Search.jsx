import Link from "next/link";
import { useState, useEffect } from "react";
import { revalidatePath } from "next/cache";

function Search({ elementsList, isFolder }) {
    const [elements, setElements] = useState(elementsList)

    useEffect(() => {
        setElements(elementsList)
    }, [elementsList])

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

    // console.log('Resultados de busqueda', elements);

    //TODO: la estructura de search y list es la misma(hacer componente)
    // TODO: CUANDO BORRO TODO LO QUE HAY EN LA BARRA ME SIGUE SALIENDO LA ULTIMA BUSQUEDA Y NO ME SALEN TODOS LOS ARCHIVOS

    return (
        <ul className='folder-dashboard-list'>
            {elements.map(element =>
                <li key={element.name} style={{ width: '100%' }}>
                    {!isFolder && element.folderId !== null
                        ? <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#ffffff' }}>
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
                        ? <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#ffffff' }}>
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
                        ? <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#ffffff' }}>
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
        </ul>
    )
}

export default Search