import React from 'react';
import Link from 'next/link'
import ShowArchives from '../../components/ShowArchives';
import { getFolders, getDashboardsWithoutFolders } from '@/lib/actions';
import DashboardsHeader from '../../components/DashboardsHearder';
import Navbar from '../../components/NavBar';
import { auth } from '@/auth';
import { getUserByEmail } from '@/lib/data';

async function DashboardList() {

    const session = await auth()
    console.log(session);

    const foundUser = await prisma.user.findUnique({
        where: {
            email: session.user.email
        },
        include: {
            folders: true, dashboards: {
                where: {
                    folderId: null
                }
            }
        }
    })
    console.log(foundUser);

    const isFolder = false;

    const folders = foundUser.folders
    const dashboards = foundUser.dashboards


    return (
        <main>
            <div className='nav-section-page' style={{ display: 'flex', flexDirection: 'row' }}>
                <Navbar></Navbar>
                <nav className='nav-section-page'>
                    <div>
                        <Link className='route-link' href='/'><h1>Nombre</h1></Link>
                        <img src='/right.svg' width='18px'></img>
                        <Link className='route-link' href='/dashboards'>Dashboards</Link>
                    </div>
                </nav>
            </div>
            <div className="show-dashboards">
                <DashboardsHeader user={foundUser.id}></DashboardsHeader>
                {
                    folders.length == 0 && dashboards.length == 0
                        ? <p>No hay archivos para este usuario</p>
                        : <ShowArchives folder={folders} dashboards={dashboards} isFolder={isFolder}></ShowArchives>
                }
            </div>
        </main>
    )
}

export default DashboardList;