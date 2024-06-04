'use client'
import React, { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { saveLayouts } from '@/lib/actions'
import 'chartjs-adapter-date-fns'
import Grafico from './graphics/Grafico';

const ResponsiveGridLayout = WidthProvider(Responsive);

// COMPROBAR SI EXISTEN VISUALIZACIONES PARA MOSTRARLAS
// CADA PANEL DEBE GUARDAR LA INFOR DE SU LAYOUT Y SUS DATOS INTERNOS

const Dashboard = ({ dashboard }) => {

    // const defaultLayouts = {
    //     lg: [
    //         { i: 'a', x: 0, y: 0, w: 1, h: 2 },
    //         { i: 'b', x: 1, y: 0, w: 3, h: 2 },
    //         { i: 'c', x: 4, y: 0, w: 1, h: 2 }
    //     ],
    //     md: [
    //         { i: 'a', x: 0, y: 0, w: 3, h: 2 },
    //         { i: 'b', x: 0, y: 0, w: 3, h: 2 },
    //         { i: 'c', x: 0, y: 0, w: 3, h: 2 }
    //     ],
    //     // Add more breakpoints as needed
    // };

    // const [layout, setLayoutState] = useState(JSON.parse(dashboard.content))
    const content = JSON.parse(dashboard.content)
    const [layout, setLayoutState] = useState(content.layout)

    console.log('CONTENT', content, 'LAYOUT', layout);
    //TODO: arretglar la siguiente funcion para modificar el layout del dashboard
    const onLayoutChange = async (allLayouts) => {
        console.log('¿Es allLayouts una promesa?', typeof allLayouts);
        console.log(allLayouts);
        await saveLayouts(allLayouts, dashboard);
    }

    // useEffect(() => {
    //     const loadLayout = async () => {
    //         try {
    //             const savedLayouts = JSON.parse(dashboard.content.layout);
    //             savedLayouts !== null ? setLayoutState(savedLayouts) : setLayoutState(defaultLayouts)
    //             console.log('El layout guardado es', savedLayouts);
    //         } catch (err) {
    //             console.error("Failed to load layouts", err);
    //         }
    //     };

    //     loadLayout();
    // }, [dashboard.content]);
    content.charts.forEach(chart=>console.log(chart))

    return (
        <ResponsiveGridLayout
            className="layout"
            layouts={{ lg: layout.lg, md: layout.md }}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={100}
            draggableHandle=".panel"
            onLayoutChange={onLayoutChange}
        >
            {/* <ResponsiveGridLayout
            className="layout"
            layouts={{ lg: layout?.lg, md: layout?.md }}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={100}
            draggableHandle=".panel"
            onLayoutChange={onLayoutChange}

        > */}
            {content.charts && content.charts.map((chart) =>
                <div id={chart.id} key={chart.id} className="panel">
                    <Grafico data={chart.data} options={chart.options} type={chart.type} ></Grafico>
                </div>)
            }

        </ResponsiveGridLayout>
    );
};

export default Dashboard;

