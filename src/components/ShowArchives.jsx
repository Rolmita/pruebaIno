'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import Search from './Search';
import List from './List';


function ShowArchives({ folder, dashboards, isFolder }) {

    let archives
    let id;
    if (isFolder) {
        id = folder.id
    }
    if (typeof dashboards == 'undefined') {
        (!isFolder)
            ? archives = {
                folders: folder
            }
            : archives = {
                dashboards: folder.dashboards
            }

    } else if (typeof folder == 'undefined') {
        archives = {
            dashboards: dashboards
        }
    } else {
        archives = { folders: folder, dashboards: dashboards }
    }

    console.log('Total de archivos', archives);

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [triggerRender, setTriggerRender] = useState(false);

    const filterElements = (archives, searchPatternLC) => {
        let filteredList = [];
        for (let type in archives) {
            // console.log('Tipo en archivos', type);
            archives[type].filter(item => {
                if (item.name.toLowerCase().match(searchPatternLC)) {
                    filteredList.push(item)
                }
            });
            // console.log('Lista filtrada', filteredList);
        }
        return filteredList
    }

    const searching = () => {
        const searchPattern = `${searchTerm}.*`
        const searchPatternLC = searchPattern.toLowerCase();
        console.log(archives);
        const filteredResults = filterElements(archives, searchPatternLC)
        setSearchResults(filteredResults)
        console.log('Resultados filtrados', filteredResults);
    }

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
        searching()
    }



    return (
        <div >
            <div className='searcher'>
                <img src='/search.svg' style={{ width: '20px', padding: '3px' }}></img>
                <input type='text' className='searcher-input' placeholder='Search a folder or dashboard' onChange={handleSearch} />
            </div>
            {
                searchResults != ''
                    ? <Search elementsList={searchResults} isFolder={isFolder}></Search>
                    : <List archives={archives} isFolder={isFolder} identificationFolder={id}></List>
            }
        </div>
    )
}

export default ShowArchives