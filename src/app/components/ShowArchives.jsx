'use client'
import Link from 'next/link'
import { useState } from 'react';
import Search from './Search';
import List from './List';

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

    let id;
    let folderToShow;

    if (isFolder) {
        id = folder.id
        folderToShow = id
    }

    console.log('archives', archives);



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
            {
                searchResults != ''
                    ? <Search searchResults={searchResults}></Search>
                    : <List archives={archives} isFolder={isFolder} identificationFolder={folderToShow}></List>
            }

        </div>
    )
}

export default ShowArchives