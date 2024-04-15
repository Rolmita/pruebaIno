'use client'
import Link from "next/link"
import MenuButton from "./MenuButton";
import { useState } from "react";

function FolderHeader({ folder }) {
    const [buttonState, setButtonState] = useState(true);
    const [buttonSaveState, setButtonSaveState] = useState('none')

    const handleState = (event) => {
        setButtonState(false)
        event.currentTarget.style.display = 'none'
        setButtonSaveState('flex')
    }

    return (
        < div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <form>
                    <input type='hidden' name='id' id='id' key={folder.id} defaultValue={folder.id}></input>
                    <h1>
                        <input type='text' name='folderName' placeholder={folder.name} defaultValue={folder.name} style={{ width: '300px', margin: 0, fontSize: '0.5em', color: 'darkgray' }} disabled={buttonState} />
                    </h1>
                    <MenuButton name='Save name' style={{ display: buttonSaveState }} />
                </form>
                <div><button className='btn-menu button' onClick={handleState}>Edit name</button></div>
            </div>
            <Link className='button' href='/folder/new-dashboard'>New Dashboard</Link>
        </div >
    )
}

export default FolderHeader;