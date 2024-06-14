'use client'
import React, { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { deleteChart, saveLayouts } from '@/lib/actions'
import 'chartjs-adapter-luxon'
import Grafico from './charts/Grafico';
import Link from 'next/link';

const ResponsiveGridLayout = WidthProvider(Responsive);

//TODO: CAMBIO DE QUERYS Y DATOS DEL GRAFICO AL SELECCIONAR TIEMPO (MODIFICACION SI YA TIENE FILTRO DE TIEMPO Y/O INCLUSION DE FILTRO DE TIEMPO CON CONSIGUIENTE MODIFICACION DE LOS CHARTS Y CONTENTS DEL DASHBOARD)

const Dashboard = ({ dashboard }) => {

    const [dashboardToShow, setDashboardToShow] = useState(dashboard)
    const content = JSON.parse(dashboard.content)
    const [layout, setLayoutState] = useState(content.layout)
    const [currentBreakpoint, setCurrentBreakpoint] = useState('lg')

    // console.log('CONTENT', content, 'LAYOUT', layout);
    const onLayoutChange = async (allLayouts) => {
        console.log('ejecutandose la funcion onLayoutChange');
        setLayoutState(await saveLayouts(allLayouts, dashboard, currentBreakpoint))
    }

    useEffect(() => { console.log('LAYOUT AL CAMBIAR LAYOUT', layout) }, [layout])

    const onBreakpointChange = (newBreakpoint) => {
        // console.log('EL NUEVO BREAKPOINT ES: ', newBreakpoint);
        setCurrentBreakpoint(newBreakpoint);
    };

    const handleDeletePanel = (chartId) => {
        const deletePanel = document.getElementById(`deleteChart-${chartId}`)
        deletePanel.style.display = 'flex'
        deletePanel.style.flexDirection = 'column'
        deletePanel.style.position = 'absolute'
        deletePanel.style.width = '90%'
        deletePanel.style.height = '90%'
        deletePanel.style.zIndex = 1
        deletePanel.style.fontSize = '20px'
        deletePanel.style.tex = '20px'
    }

    const handleDelete = async (chartId) => {
        await deleteChart(dashboardToShow, chartId)
    }

    return (
        <ResponsiveGridLayout
            className="layout"
            layouts={{ lg: layout?.lg, md: layout?.md, sm: layout?.sm, xs: layout?.xs, xxs: layout?.xxs }}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={100}
            draggableHandle=".panel"
            onLayoutChange={onLayoutChange}
            onBreakpointChange={onBreakpointChange}
        >
            {content.charts && content.charts.map((chart) =>
                <div id={chart.id} key={chart.id} className="panel">
                    <div style={{ width: '95%' }}>
                        <Grafico data={chart.data} options={chart.options} type={chart.type} ></Grafico>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '5%' }}>
                        <button className='chart-btn' type='button'
                            onClick={() => handleDeletePanel(chart.id)}>
                            <img src='/cross.svg' style={{ width: '90%', height: '90%' }}></img>
                        </button>
                        <button className='chart-btn' type='button'>
                            {dashboard?.folderId
                                ? <Link href={`/dashboards/folder/${dashboard.folderId}/${dashboard.id}/${chart.id}`}>
                                    <img src='/settings.svg' style={{ width: '100%', height: '100%' }}></img>
                                </Link>
                                : <Link href={`/dashboards/${dashboard.id}/${chart.id}`}>
                                    <img src='/settings.svg' style={{ width: '100%', height: '100%' }}></img>
                                </Link>
                            }
                        </button>
                    </div>
                    <div id={`deleteChart-${chart.id}`} className='deleteChart'>
                        <div>
                            <p >Are you sure you want to delete the chart?</p>
                        </div>
                        <div>
                            <button className='button' onClick={() => handleDelete(chart.id)}>Delete</button>
                            <button className='button'
                                onClick={() => {
                                    const deletePanel = document.getElementById(`deleteChart-${chart.id}`)
                                    deletePanel.style.display = 'none'
                                }}>Cancel</button>
                        </div>
                    </div>
                </div>)
            }

        </ResponsiveGridLayout>
    );
};

export default Dashboard;

