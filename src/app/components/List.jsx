import Link from "next/link";
import { useRouter } from "next/navigation";

function List({ archives, isFolder, identificationFolder }) {
    

    let elementsList = [];
    let rute = '';

    if (isFolder) {
        elementsList = archives.folders.dashboards

    } else {
        elementsList = archives.folders.concat(archives.dashboards)
    }

    console.log('Lista de elementos', elementsList);
    console.log(elementsList.folders);
    console.log(identificationFolder);
    

    return (
        <ul className='folder-dashboard-list'>
            {elementsList.map(element =>
                <li key={element.id} style={{ listStyle: 'none', color: 'white' }}>
                    <img src='search.svg' width='20px' style={{ backgroundColor: 'gray', marginRight: '10px' }} />
                    {isFolder
                        ? <Link href={`/dashboards/folder?id=${identificationFolder}/dashboard?id=${element.id}`} >{element.name}</Link>
                        : <Link href={`/dashboards/folder?id=${element.id}`} >{element.name}</Link>
                    }
                </li>)
            }
        </ul>
    )
}

export default List