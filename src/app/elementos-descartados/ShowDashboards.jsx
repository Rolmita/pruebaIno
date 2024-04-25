'use client'
import { useState } from "react";
import NewMenu from "../../components/NewMenu";

function ShowDashboards({folder, dashboard}) {

    const everything = folder.concat(dashboard)

    const [searchTerm, setSearchTerm] = useState(null);
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        searching();
    }

    const searching = () => {
        const searchPattern = `${searchTerm}.*`
        const searchPatternLC = searchPattern.toLocaleLowerCase();
        const results = everything.filter(item => item.name.toLocaleLowerCase().match(searchPatternLC));
        setSearchResults(results)
        console.log(searchTerm);
    }

    const visualization = false;
    

    return (
        <div className='show-dashboards'>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <h1>Your Folders And Dashboard</h1>
                <NewMenu visualization={visualization} />
            </div>
            <div className='searcher'>
                <img src='search.svg' style={{ width: '20px', padding: '3px' }}></img>
                <input type='text' className='searcher-input' placeholder='Search a folder or dashboard' onChange={handleSearch} />
            </div>
            <ul className='folder-dashboard-list'>
                {searchResults != null
                    ? (searchResults.sort().map(result =>
                        <li style={{ listStyle: 'none' }} key={result.name}>
                            <img src='search.svg' width='20px' style={{ backgroundColor: 'gray', marginRight: '10px' }} />
                            {result.name}
                        </li>
                    ))
                    : (
                        <div>
                            {/* /* // allItems.sort().map(item =>
                        //     <li style={{ listStyle: 'none' }}>
                        //         <img src='search.svg' width='20px' style={{ backgroundColor: 'gray', marginRight: '10px' }} />
                        //         {item.name}
                        //     </li>) */}
                            {objectItems.folders.sort().map(folder => {
                                <li style={{ listStyle: 'none' }} key={folder.name}>
                                    <img src='search.svg' width='20px' style={{ backgroundColor: 'gray', marginRight: '10px' }} />
                                    {folder.name}
                                </li>
                            })}
                            {objectItems.dashboards.sort().map(dashboard => {
                                <li style={{ listStyle: 'none' }} key={dashboard.name}>
                                    <img src='search.svg' width='20px' style={{ backgroundColor: 'gray', marginRight: '10px' }} />
                                    {dashboard.name}
                                </li>
                            })}
                        </div>)
                }
            </ul>
        </div>
    )
}

export default ShowDashboards;