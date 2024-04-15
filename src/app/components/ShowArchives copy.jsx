'use client'
import Link from 'next/link'
import { useState } from 'react';
import NewMenu from './NewMenu';
import MenuButton from './MenuButton';


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
    const [buttonState, setButtonState] = useState(true);
    const [buttonSaveState, setButtonSaveState] = useState('none')

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
        searching()
    }

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

    const handleState = (event) => {
        setButtonState(false)
        event.currentTarget.style.display = 'none'
        setButtonSaveState('flex')
    }

    return (
        <div className="show-dashboards">
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    {isFolder
                        ? <>
                            <form>
                                <input type='hidden' name='id' id='id' key={folder.id} defaultValue={folder.id}></input>
                                <h1><input type='text' name='folderName' placeholder={folder.name} defaultValue={folder.name} style={{ width: '300px', margin: 0, fontSize: '0.5em', color: 'darkgray' }} disabled={buttonState} /> </h1>
                                <MenuButton name='Save name' style={{ display: buttonSaveState }} />
                            </form>
                            <div><button className='btn-menu button' onClick={handleState}>Edit name</button></div>
                        </>
                        : <h1>Dashboards</h1>
                    }
                </div>
                {
                    /* TODO: ESTA RUTA PARA UN NUEVO DASHBOARD LLEVA UNA QUERY CON LA FOLDER, YA QUE SE INCLUYE DIRECTAMENTE DENTRO DE ELLA*/
                }
                {!isFolder
                    ? <NewMenu></NewMenu>
                    : <Link className='button' href='/folder/new-dashboard'>New Dashboard</Link>
                }

            </div>

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