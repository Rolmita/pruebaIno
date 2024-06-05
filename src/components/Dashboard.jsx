'use client'
import React, { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { deleteChart, saveLayouts } from '@/lib/actions'
import 'chartjs-adapter-date-fns'
import Grafico from './graphics/Grafico';

const ResponsiveGridLayout = WidthProvider(Responsive);

// COMPROBAR SI EXISTEN VISUALIZACIONES PARA MOSTRARLAS
// CADA PANEL DEBE GUARDAR LA INFOR DE SU LAYOUT Y SUS DATOS INTERNOS
//TODO: CAMBIO DE QUERYS Y DATOS DEL GRAFICO AL SELECCIONAR TIEMPO (MODIFICACION SI YA TIENE FILTRO DE TIEMPO Y/O INCLUSION DE FILTRO DE TIEMPO CON CONSIGUIENTE MODIFICACION DE LOS CHARTS Y CONTENTS DEL DASHBOARD)

const Dashboard = ({ dashboard }) => {

    const [dashboardToShow, setDashboardToShow] = useState(dashboard)
    const content = JSON.parse(dashboard.content)
    const [layout, setLayoutState] = useState(content.layout)
    const [currentBreakpoint, setCurrentBreakpoint] = useState('lg');

    console.log('CONTENT', content, 'LAYOUT', layout);
    const onLayoutChange = async (allLayouts) => {
        console.log('¿Es allLayouts una promesa?', typeof allLayouts);
        console.log(currentBreakpoint, allLayouts);
        await saveLayouts(allLayouts, dashboard, currentBreakpoint);
    }

    useEffect(() => { console.log('LAYOUT AL CAMBIAR LAYOUT', layout) }, [layout])

    const onBreakpointChange = (newBreakpoint) => {
        console.log('EL NUEVO BREAKPOINT ES: ', newBreakpoint);
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
        // deletePanel.style.top = '40%';
        // deletePanel.style.left = '40%';
        // deletePanel.style.transform = 'translate(-50 %, -50 %)';
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
                        <button style={{ marginBottom: '5px', maxWidth: '20px' }}
                            onClick={() => handleDeletePanel(chart.id)}>
                            <img src='/cross.svg' style={{ width: '90%', height: '90%' }}></img>
                        </button>
                        <button style={{ marginBottom: '5px', maxWidth: '20px' }}>
                            <img src='/settings.svg' style={{ width: '100%', height: '100%' }}></img>
                        </button>
                    </div>
                    <div style={{ display: 'none', backgroundColor: '#a3a0a0', borderRadius: '5px' }} id={`deleteChart-${chart.id}`} className='deleteChart'>
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <div style={{ padding: '10px' }}>
                                <p style={{ color: '#ffffff', textAlign: 'center' }}>Are you sure you want to delete the chart?</p>
                            </div>
                            <div>
                                <button style={{ fontSize: '16px', marginRight: '10px', padding: '5px' }} onClick={() => handleDelete(chart.id)}>Delete</button>
                                <button style={{ fontSize: '16px', padding: '5px' }}
                                    onClick={() => {
                                        const deletePanel = document.getElementById(`deleteChart-${chart.id}`)
                                        deletePanel.style.display = 'none'
                                    }}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>)
            }

        </ResponsiveGridLayout>
    );
};

export default Dashboard;

