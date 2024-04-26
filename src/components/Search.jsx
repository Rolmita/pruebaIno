import Link from "next/link";
import { useState, useEffect } from "react";

function Search({ elementsList, isFolder }) {
    const [elements, setElements] = useState(elementsList)

    useEffect(() => {
        setElements(elementsList)
    }, [elementsList])

    // console.log('Resultados de busqueda', elements);

    // TODO: CUANDO BORRO TODO LO QUE HAY EN LA BARRA ME SIGUE SALIENDO LA ULTIMA BUSQUEDA Y NO ME SALEN TODOS LOS ARCHIVOS

    return (
        <ul className='folder-dashboard-list' style={{ backgroundColor: 'grey' }}>
            {elements.map(element =>
                <li key={element.name} style={{ listStyle: 'none', color: 'white', backgroundColor: 'darkgray', margin: '3px 0', padding: '3px 5px' }}>
                    {!isFolder && element.folderId !== null ? <Link href={`dashboards/folder/${element.id}`} style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>{element.name}</Link> : ''}
                    {!isFolder && element.folderId === null
                        ? <Link href={`dashboards/${element.id}`} style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>{element.name}</Link> : ''
                    }
                    {isFolder ? <Link href={`${folderId}/${element.id}`} style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>{element.name}</Link> : ''}
                </li>)
            }
        </ul>
    )
}

export default Search