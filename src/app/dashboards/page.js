import React from 'react';
import Link from 'next/link'
import ShowArchives from '../../components/ShowArchives'
import { getFolders, getDashboardsWithoutFolders } from '@/lib/actions'
import DashboardsHeader from '../../components/DashboardsHearder'
import Navbar from '../../components/Menu'
import { auth } from '@/auth'
import { getUserByEmail } from '@/lib/data'
import { TfiAngleRight } from 'react-icons/tfi'
import NavSection from '@/components/NavSection';

async function DashboardList() {

    const session = await auth()
    // console.log(session);

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
    // console.log(foundUser);

    const isFolder = false;

    const folders = foundUser.folders
    const dashboards = foundUser.dashboards
    // console.log('dashboardlist',dashboards);


    return (
        <section>
            <NavSection>
                <img src='/right.svg' width='18px'></img>
                {/* <TfiAngleRight ></TfiAngleRight> */}
                <Link className='route-link' href='/dashboards'>Dashboards</Link>
            </NavSection>

            <div className="show-dashboards">
                <DashboardsHeader user={foundUser.id}></DashboardsHeader>
                {
                    folders.length == 0 && dashboards.length == 0
                        ? <p>No hay archivos para este usuario</p>
                        : <ShowArchives folder={folders} dashboards={dashboards} isFolder={isFolder}></ShowArchives>
                }
            </div>
        </section>
    )
}

export default DashboardList;