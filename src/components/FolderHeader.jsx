'use client'
import Link from "next/link"
import MenuButton from "./MenuButton";
import { useState } from "react";
import { editFolder } from "@/lib/actions";

function FolderHeader({ folder }) {

    const isFolder = true

    const [buttonState, setButtonState] = useState(true)
    const [buttonSaveState, setButtonSaveState] = useState('none')
    const [buttonEditState, setEditState] = useState('flex')

    const changeState = () => {
        setButtonState(false)
        setEditState('none')
        setButtonSaveState('flex')
    }

    const returnState = () => {
        setEditState('flex')
        setButtonSaveState('none')
    }

    return (
        < div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <form>
                    <input type='hidden' name='id' id='id' key={folder.id} defaultValue={folder.id}></input>
                    <h1 style={{ marginRight: '10px' }}>
                        <input className='input-name' type='text' name='folderName' placeholder={folder.name} defaultValue={folder.name}
                            disabled={buttonState} />
                    </h1>
                    <button type='submit' formAction={editFolder} onClick={returnState} className='btn-menu button' style={{ display: buttonSaveState }}>Save name</button>
                </form>
                <div><button className='btn-menu button' onClick={changeState} style={{ display: buttonEditState }}>Edit name</button></div>
            </div>
            <MenuButton className='btn-menu button' name='New Dashboard' folderId={folder.id} isFolder={isFolder} user={folder.userId}></MenuButton>
        </div >
    )
}

export default FolderHeader;