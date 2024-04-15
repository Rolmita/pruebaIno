'use client'
import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import '../prueba.css'

const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard = ({ searchParams }) => {
    console.log('searchParams del dashboard', searchParams);
    const layout = [
        { i: 'a', x: 0, y: 0, w: 12, h: 3 },
        { i: 'b', x: 1, y: 0, w: 3, h: 2 },
        { i: 'c', x: 4, y: 0, w: 1, h: 2 }
    ];

    return (
        <ResponsiveGridLayout
            className="layout"
            layouts={{ lg: layout }}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={100}
            draggableHandle=".panel"
        >
            <div key="a" className="panel">
                <h3>Panel A</h3>
            </div>
            <div key="b" className="panel">
                <h3>Panel B</h3>
            </div>
            <div key="c" className="panel">
                <h3>Panel C</h3>
            </div>
        </ResponsiveGridLayout>
    );
};

export default Dashboard;

