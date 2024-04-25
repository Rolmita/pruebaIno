'use client'
import React, { useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { useState } from 'react';
import { saveLayouts } from '@/lib/actions'

const ResponsiveGridLayout = WidthProvider(Responsive);

// COMPROBAR SI EXISTEN VISUALIZACIONES PARA MOSTRARLAS

// CADA PANEL DEBE GUARDAR LA INFOR DE SU LAYOUT Y SUS DATOS INTERNOS

const Dashboard = ({ dashboard }) => {

    const defaultLayouts = {
        lg: [
            { i: 'a', x: 0, y: 0, w: 1, h: 2 },
            { i: 'b', x: 1, y: 0, w: 3, h: 2 },
            { i: 'c', x: 4, y: 0, w: 1, h: 2 }
        ],
        md: [
            { i: 'a', x: 0, y: 0, w: 3, h: 2 },
            { i: 'b', x: 0, y: 0, w: 3, h: 2 },
            { i: 'c', x: 0, y: 0, w: 3, h: 2 }
        ],
        // Add more breakpoints as needed
    };

    // const loadLayout = async () => {
    //     try {
    //         const savedLayouts = dashboard.content;
    //         console.log('El layout guardado es', JSON.parse(savedLayouts));
    //         return savedLayouts ? JSON.parse(savedLayouts) : defaultLayouts;
    //     } catch (err) {
    //         console.error("Failed to load layouts", err);
    //         return defaultLayouts;
    //     }
    // };

    const [layout, setLayoutState] = useState(JSON.parse(dashboard.content))

    // const [layout, setLayoutState] = useState(
    //     [
    //         { i: 'a', x: 0, y: 0, w: 12, h: 3 },
    //         { i: 'b', x: 1, y: 0, w: 3, h: 2 },
    //         { i: 'c', x: 4, y: 0, w: 1, h: 2 }
    //     ])

    // const saveLayouts = async (layout) => {
    //     try {
    //         await prisma.dashboard.findUnique({

    //         })
    //         localStorage.setItem('layout', JSON.stringify(layout));
    //     } catch (err) {
    //         console.error("Failed to save layouts to localStorage", err);
    //     }
    // };

    const onLayoutChange = async (currentLayout, allLayouts) => {
        console.log('¿Es allLayouts una promesa?', typeof allLayouts);
        setLayoutState(allLayouts);
        console.log(layout);
        console.log(typeof layout);
        const resultado = await saveLayouts(allLayouts, dashboard.id);
        setLayoutState(JSON.parse(resultado.content))
    }

    useEffect(() => {
        const loadLayout = async () => {
            try {
                const savedLayouts = JSON.parse(dashboard.content);
                savedLayouts !== null ? setLayoutState(savedLayouts) : setLayoutState(defaultLayouts)
                console.log('El layout guardado es', savedLayouts);
            } catch (err) {
                console.error("Failed to load layouts", err);
            }
        };

        loadLayout();
    }, [dashboard.content]);

    return (
        <ResponsiveGridLayout
            className="layout"
            layouts={{ lg: layout?.lg, md: layout?.md }}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={100}
            draggableHandle=".panel"
            onLayoutChange={onLayoutChange}
        >
            {layout?.lg.map((element, index) =>
                <div key={`${index}`} className="panel">
                    <h3>Panel {element.i}</h3>
                </div>)
            }
            
        </ResponsiveGridLayout>
    );
};

export default Dashboard;

