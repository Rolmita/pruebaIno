
function Search({ searchResults }) {

    return (
        <ul className="folder-dashboard-list">
            {searchResults.map(search =>
                <li key={search.id} style={{ listStyle: 'none', color: 'white' }}>
                    <img src='search.svg' width='20px' style={{ backgroundColor: 'gray', marginRight: '10px' }} />
                    {search.name}
                </li>
            )}
        </ul>
    )
}

export default Search