'use client'
import Navbar from "@/components/Menu"
import Link from "next/link"
import Information from "@/components/Information";
import Visualization from "@/components/charts/Visualization";
import QueryForm from "@/components/QueryForm";
import GraphicForm from "@/components/charts/GraphicForm2";
import NavSection from "@/components/NavSection";
import { getFolderById, getDashboardById, getUserBySession, saveChart, getVisualization } from "@/lib/actions";
import { useState, useEffect } from 'react'
import { reloadQuery } from "@/lib/db-actions";

export default function VisualizationId({ params }) {
    const [dashboard, setDashboard] = useState(null)
    const [visualization, setVisualization] = useState(null)
    const [databases, setDatabases] = useState(null)
    const [queryDb, setQueryDb] = useState(null)
    const [queryRes, setQueryRes] = useState(null)
    const [finalData, setFinalData] = useState(null)
    const [finalOptions, setFinalOptions] = useState(null)
    const [query, setQuery] = useState(null)
    const [chartType, setChartType] = useState(undefined)
    const status = 'old'

    //TODO: NO FUNCIONA CAMBIAR LA QUERY y NO SE AUTORELLENA EL FORM CON LOS DATOS DE VISUALIZACION

    useEffect(() => {
        const fetchData = () => {
            const dashboardId = Number(params.dashboardId)
            getDashboardById(dashboardId)
                .then(dashboard => setDashboard(dashboard))
                .catch(error => console.error('Error fetching dashboard:', error))

            getUserBySession()
                .then(user => setDatabases(user.databases))
                .catch(error => console.error('Error fetching user by session:', error))
        };
        fetchData();
    }, [params.dashboardId, params.visualization]);

    useEffect(() => {
        console.log('visualization: ', visualization);
        if (visualization != null) {
            setFinalData(visualization?.data)
            setFinalOptions(visualization?.options)
            setQuery(visualization?.querys[0].query)
            setQueryDb(visualization?.querys[0].db)
            setChartType(visualization?.type)
        }
    }, [visualization])

    useEffect(() => {
        console.log(dashboard);
        if (dashboard != null) {
            async function fetchData() {
                const visualizationId = Number(params.visualization)
                setVisualization(await getVisualization(dashboard, visualizationId))
            };
            fetchData();
        }
    }, [dashboard])

    useEffect(() => {
        if (queryDb != null && databases != null && query != null) {
            async function fetchData() {
                const res = await reloadQuery(databases, queryDb, query)
                setQueryRes(res)
            }
            fetchData()
        }
    }, [query])

    return (
        <section>
            <NavSection>
                <div><Link className='route-link' href='/dashboards'>Dashboards</Link></div>
                <div>
                    <img src='/right.svg' width='18px'></img>
                    <Link className='route-link' href={`/dashboards/${dashboard?.id}`}>{dashboard?.name}</Link>
                </div>
                <div>
                    <img src='/right.svg' width='18px'></img>
                    <Link className='route-link' href={`/dashboards/${dashboard?.id}/${visualization?.id}`}>
                        Edit visualization {visualization?.id} {visualization?.options.plugins.title.text.length > 0 ? `(${visualization?.options.plugins.title.text})` : ''}
                    </Link>
                </div>
            </NavSection>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'lightgray', width: '100%', padding: '10px' }}>
                    <div>
                        <h1>Edit {visualization?.options.plugins.title.text}</h1>
                    </div>
                    <div>
                        {visualization && <button onClick={() => saveChart(finalData, finalOptions, dashboard, query, queryDb, visualization?.id)}>Save</button>}
                        <button>
                            <Link href={`/dashboards/${dashboard?.id}`} style={{ textDecoration: 'none', color: '#000000' }}>Discard</Link>
                        </button>
                    </div>
                </div>
                <Visualization data={queryRes} status={status} finalData={finalData} type={chartType} finalOpt={finalOptions}></Visualization>
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
                                <GraphicForm data={queryRes} status={status} chartOpt={visualization?.options} chartD={visualization?.data} chartT={visualization?.type}
                                    onFinalData={setFinalData} onFinalOptions={setFinalOptions} onChartType={setChartType}></GraphicForm>
                            </div >
                        </div>

                        <div id='tab1' className="tab">
                            <a href='#tab1'><h4>Data</h4></a>
                            <QueryForm databases={databases} onQueryResults={setQueryRes} onQuery={setQuery} onDb={setQueryDb}
                                prevQuery={visualization?.querys[0].query} prevDb={visualization?.querys[0].db}>
                            </QueryForm>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    )
}

