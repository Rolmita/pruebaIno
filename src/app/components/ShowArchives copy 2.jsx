'use client'
import Link from 'next/link'
import { useState } from 'react';

function ShowArchives({ folder, dashboards, isFolder }) {

    let archives

    if (typeof dashboards == 'undefined') {
        archives = {
            folders: folder
        }
    } else if (typeof folder == 'undefined') {
        archives = {
            dashboards: dashboards
        }
    } else {
        archives = {
            folders: folder,
            dashboards: dashboards
        }
    }

    console.log('archives', archives);
    console.log(isFolder);

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const filterElements = (archives, searchPatternLC) => {
        let filteredList = [];
        for (let type in archives) {
            console.log(type);
            archives[type].filter(item => {
                if (item.name.toLowerCase().match(searchPatternLC)) {
                    filteredList.push(item)
                }
            });
            console.log('Lista filtrada', filteredList);
        }
        return filteredList
    }

    const searching = () => {
        const searchPattern = `${searchTerm}.*`
        const searchPatternLC = searchPattern.toLowerCase();
        const filteredResults = filterElements(archives, searchPatternLC)
        setSearchResults(filteredResults)
        console.log(filteredResults);
    }

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
        searching()
    }

    return (
        <div >
            <div className='searcher'>
                <img src='search.svg' style={{ width: '20px', padding: '3px' }}></img>
                <input type='text' className='searcher-input' placeholder='Search a folder or dashboard' onChange={handleSearch} />
            </div>
            <ul className='folder-dashboard-list'>
                {isFolder
                    ? <>{
                        archives.folders.dashboard != []
                            ? archives.folders.dashboards.map(dashboard =>
                                <li key={dashboard.id} style={{ listStyle: 'none', color: 'white' }}>
                                    <img src='search.svg' width='20px' style={{ backgroundColor: 'gray', marginRight: '10px' }} />
                                    {dashboard.name}
                                </li>)
                            : <li>Aún no existe ningún dashboard en esta carpeta</li>
                    }</>
                    : <>{
                        searchResults != ''
                            ? (
                                searchResults.map(search =>
                                    <li key={search.id} style={{ listStyle: 'none', color: 'white' }}>
                                        <img src='search.svg' width='20px' style={{ backgroundColor: 'gray', marginRight: '10px' }} />
                                        {search.name}
                                    </li>
                                ))
                            : <>
                                {archives.folders != []
                                    ? archives.folders.map(folder =>
                                        <li key={folder.id} style={{ listStyle: 'none', color: 'white' }}>
                                            <img src='search.svg' width='20px' style={{ backgroundColor: 'gray', marginRight: '10px' }} />
                                            <Link href={`/dashboards/folder?id=${folder.id}`}>{folder.name}</Link>
                                        </li>)
                                    : ''
                                }

                                {archives.dashboards != []
                                    ? archives.dashboards.map(dashboard =>
                                        <li key={dashboard.id} style={{ listStyle: 'none', color: 'white' }}>
                                            <img src='search.svg' width='20px' style={{ backgroundColor: 'gray', marginRight: '10px' }} />
                                            {dashboard.name}
                                        </li>)
                                    : ''
                                }
                            </>
                    }</>
                }
            </ul>
        </div>
    )
}

export default ShowArchives