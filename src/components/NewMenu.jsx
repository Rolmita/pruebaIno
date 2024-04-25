import Link from 'next/link'
import MenuButton from './MenuButton';

const NewMenu = ({ user, visualization }) => {

    return (
        <div className="dropdown">
            <button className="btn-dropdown" ><div>New <img src='/down.svg' width='15px' /></div></button>
            <div name='new-menu' id='new-menu' className='dropdown-content'>
                <MenuButton className='btn-menu button' name='New Folder' user={user}></MenuButton>
                <MenuButton className='btn-menu button' name='New Dashboard' user={user}></MenuButton>
            </div>
        </div>
    );
}

export default NewMenu;