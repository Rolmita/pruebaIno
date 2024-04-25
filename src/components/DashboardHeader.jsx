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
    }
   
    return (
        < div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' , backgroundColor:'lightgray', width:'100%', padding:'5px', alignItems:'center'}}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <form>
                    <input type='hidden' name='id' id='id' key={dashboard.id} defaultValue={dashboard.id}></input>
                    <h1 style={{marginRight:'10px'}}>
                        <input className='input-name' type='text' name='dashboardName' placeholder={dashboard.name} defaultValue={dashboard.name}  
                        disabled={buttonState} />
                    </h1>
                    <button type='submit' formAction={editDashboard} onClick={returnState} className='btn-menu button' style={{ display: buttonSaveState }}>Save name</button>
                </form>
                <div><button className='btn-menu button' onClick={changeState} style={{ display: buttonEditState }}>Edit name</button></div>
            </div>
            <MenuButton className='btn-menu button' name='New Visualization' dashboardId={dashboard.id} folderId={folder.id}></MenuButton>
        </div >
    )
}

export default DashboardHeader;