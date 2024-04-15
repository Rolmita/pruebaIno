import Link from 'next/link'
import MenuButton from './MenuButton';

const NewMenu = ({ visualization }) => {

    return (
        <div className="dropdown">
            <button className="btn-dropdown" >New 🔽</button>
            <div name='new-menu' id='new-menu' className='dropdown-content'>
                <MenuButton className='btn-menu button' name='New Folder'></MenuButton>
                <div><button className='btn-menu button'>New dashboard</button></div>
                {visualization ? <div><button className='btn-menu button'>New visualization</button></div> : ''}
            </div>
        </div>
    );
}

export default NewMenu;