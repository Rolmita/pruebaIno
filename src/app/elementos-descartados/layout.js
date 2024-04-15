'use client'
import Link from 'next/link'
import NewMenu from '../components/NewMenu';
import {useEffect, useState} from 'react';

export default function DashboardSection({ children }) {

    return (
        <main>
            <section className='dashboard-options'>
                <form>
                    <label>Select a folder: </label>
                    {
                        // TODO: EL SIGUIENTE SELECT ES UN COMPONENTE QUE VOY A CREAR EN PÁGINA DE USO SERVIDOR
                    }
                    <select>
                        <option name="select-folder" defaultChecked>----</option>
                        <option name="select-folder">Folder-1</option>
                        <option name="select-folder">Folder-2</option>
                        <option name="select-folder">Folder-3</option>
                        <option name="select-folder">Folder-4</option>
                    </select>
                </form>
                <form>
                    <label>Select a dashboard to show: </label>
                    {
                        // TODO: EL SIGUIENTE SELECT ES UN COMPONENTE QUE VOY A CREAR EN PÁGINA DE USO SERVIDOR
                    }
                    <select>
                        <option name="select-dashboard" defaultChecked>----</option>
                        <option name="select-dashboard">Inoelec</option>
                        <option name="select-dashboard">Inoelec-1</option>
                        <option name="select-dashboard">Inoelec-2</option>
                        <option name="select-dashboard">Inoelec-3</option>
                    </select>
                </form>
                <NewMenu />
            </section>
            {children}
        </main>
    );
}
