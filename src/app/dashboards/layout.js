// 'use client'
// import { useState, useEffect } from 'react';
// import usePoolCluster from '@/lib/usePoolCluster';

export default async function Layout({ children }) {
    // const poolCluster = await usePoolCluster();

    // useEffect(() => {
    //     console.log(poolCluster);
    //     // Usa poolCluster aquí si es necesario
    // }, [poolCluster]);

    return (
        <main>
            {children}
        </main>
    );
}