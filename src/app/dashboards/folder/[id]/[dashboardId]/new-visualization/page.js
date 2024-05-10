'use client'
import Navbar from "@/components/NavBar"
import Link from "next/link"
import Information from "@/components/information";
import Visualization from "@/components/Visualization";
import QueryForm from "@/components/QueryForm";
import GraphicForm from "@/components/GraphicForm";
import { getFolderById, getDashboardById, getUserBySession } from "@/lib/actions";
import { useState, useEffect } from 'react'

export default function NewVisualization({ params }) {
    const [folder, setFolder] = useState(null)
    const [dashboard, setDashboard] = useState(null)
    const [databases, setDatabases] = useState(null)
    const [queryRes, setQueryRes] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            const folderId = Number(params.id);
            getFolderById(folderId)
                .then(folder => setFolder(folder))
                .catch(error => console.error('Error fetching folder:', error));
            const dashboardId = Number(params.dashboardId);
            getDashboardById(dashboardId)
                .then(dashboard => setDashboard(dashboard))
                .catch(error => console.error('Error fetching dashboard:', error));
            getUserBySession()
                .then(user => setDatabases(user.databases))
                .catch(error => console.error('Error fetching user by session:', error));
        };

        fetchData();
    }, [params.id, params.dashboardId]);

    return (
        <section>
            <div className='nav-section-page' >
                <Navbar></Navbar>
                <nav className='nav-section-page' >
                    <div>
                        <Link className='route-link' href='/'><h1>Nombre</h1></Link>
                        <img src='/right.svg' width='18px'></img>
                    </div>
                    <div>
                        <Link className='route-link' href='/dashboards'>Dashboards</Link>
                        <img src='/right.svg' width='18px'></img>
                        <Link className='route-link' href={`/dashboards/folder/${folder?.id}`}>{folder?.name}</Link>
                        <img src='/right.svg' width='18px'></img>
                        <Link className='route-link' href={`/dashboards/folder/${folder?.id}/${dashboard?.id}`}>{dashboard?.name}</Link>
                        <img src='/right.svg' width='18px'></img>
                        <Link className='route-link' href={``}>New visualization</Link>
                    </div>
                </nav>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'lightgray', width: '100%', padding: '10px' }}>
                    <div>
                        <h1>New Visualization</h1>
                    </div>
                    <div><button>Save</button>
                        <button>Discard</button>
                    </div>
                </div>
                <Visualization data={queryRes}></Visualization>
                <section className="visualization-settings tabs" style={{ display: 'flex', flexDirection: 'column', minWidth: '20%', padding: '5px' }}>

                    <div className="tab-container">

                        <div id="tab4" className="tab">
                            <a href="#tab4"><h4>Build</h4></a>
                            <Information build={queryRes}></Information>

                        </div>

                        <div id="tab3" className="tab">
                            <a href="#tab3"><h4>Table</h4></a>
                            <div className="tab-content">
                                <h3>Titulo 2</h3>
                                <p>Lorem ipsum ...</p>
                            </div>
                        </div>

                        <div id="tab2" className="tab">
                            <a href="#tab2"><h4>Graphic</h4></a>

                            <div className="tab-content" >
                                <h4>Graphic Settings</h4>
                                <GraphicForm></GraphicForm>
                            </div >
                        </div>

                        <div id='tab1' className="tab">
                            <a href='#tab1'><h4>Data</h4></a>
                            <QueryForm databases={databases} onQueryResults={setQueryRes}>
                            </QueryForm>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    )
}
