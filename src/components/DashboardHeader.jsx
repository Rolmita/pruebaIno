'use client'
import Link from "next/link"
import MenuButton from "./MenuButton";
import { useState } from "react";
import { editDashboard } from "@/lib/actions";

function DashboardHeader({ folder, dashboard }) {

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
        // setButtonState(true)
    }

    return (
        < div className='dashboard-header'>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <form style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <input type='hidden' name='id' id='id' key={dashboard.id} defaultValue={dashboard.id}></input>
                    <h1 style={{ marginRight: '10px' }}>
                        <input className='input-name' type='text' name='dashboardName' placeholder={dashboard.name} defaultValue={dashboard.name}
                            disabled={buttonState} autoFocus/>
                    </h1>
                    <button type='submit' formAction={editDashboard} onClick={returnState} className='btn-menu button' style={{ display: buttonSaveState }}>Save name</button>
                    <button type='button' className='btn-menu button' onClick={changeState} style={{ display: buttonEditState }}>Edit name</button>
                </form>
            </div>
            <MenuButton className='btn-menu button' name='New Visualization' dashboardId={dashboard.id} folderId={folder?.id}></MenuButton>
        </div >
    )
}

export default DashboardHeader;