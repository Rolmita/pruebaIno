import React from 'react';
import Link from 'next/link'
import '@/app/prueba.css'
import ShowArchives from '../components/ShowArchives';
import { getFolders, getDashboardsWithoutFolders } from '@/lib/actions';
import NewMenu from '../components/NewMenu';
import DashboardsHeader from '../components/DashboardsHearder';


async function DashboardList() {

    const isFolder = false;
    const folders = await getFolders()
    const dashboards = await getDashboardsWithoutFolders()

    return (
        <main>

            <div className="show-dashboards">
                <DashboardsHeader></DashboardsHeader>
                <ShowArchives folder={folders} dashboards={dashboards} isFolder={isFolder}></ShowArchives>
            </div>
        </main>
    );
};

export default DashboardList;