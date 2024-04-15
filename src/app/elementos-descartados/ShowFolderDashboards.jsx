'use client'
import Link from 'next/link'
import { useState } from 'react';

function ShowFolderDashboards({ folder }) {

    const dashboards = folder.dashboards
    const [searchTerm, setSearchTerm] = useState(null);
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
        searching()
    }

    const searching = () => {
        const searchPattern = `${searchTerm}.*`
        const searchPatternLC = searchPattern.toLocaleLowerCase();
        const results = dashboards.filter(dash => dash.name.toLocaleLowerCase().match(searchPatternLC))
        setSearchResults(results)
    }

    return (
        <div className="show-dashboards">
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <h1>
                    <input type='text' defaultValue={folder.name} />
                </h1>
                <Link className='button' href='/folder/new-dashboard'>New Dashboard</Link>
            </div>

            <div className='searcher'>
                <img src='search.svg' style={{ width: '20px', padding: '3px' }}></img>
                <input type='text' className='searcher-input' placeholder='Search a folder or dashboard' onChange={handleSearch} />
            </div>
            <ul className='folder-dashboard-list'>
                {
                    dashboards && searchResults != null
                        ? (
                            searchResults.map(search =>
                                <li key={search.id} style={{ listStyle: 'none', color: 'white' }}>
                                    <img src='search.svg' width='20px' style={{ backgroundColor: 'gray', marginRight: '10px' }} />
                                    {search.name}
                                </li>
                            ))
                        : (
                            dashboards
                                .map(dashboard =>
                                    <li key={dashboard.id} style={{ listStyle: 'none', color: 'white' }}>
                                        <img src='search.svg' width='20px' style={{ backgroundColor: 'gray', marginRight: '10px' }} />
                                        {dashboard.name}
                                    </li>)
                                .short()
                        )
                }
            </ul>
        </div>
    )
}

export default ShowFolderDashboards