import Link from "next/link";
import Menu from '@/components/Menu'

export default function NavSection({ children }) {
    // console.log(params);
    // let arrayParams = []
    // for (const claves in params.params) arrayParams.push(claves);
    // console.log(arrayParams);
    return (
        <div className='nav-section-page' style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <Menu></Menu>
            <nav className='nav-section-page'
                style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'left' }}>
                <div className='nav-section-div'>
                    {children}
                </div>
            </nav>
        </div>
    )
}

// import React from 'react';
// import Link from 'next/link';
// import Menu from '@/components/Menu';

// export default function NavSection({ params, dashboard }) {
//     const renderLink = (href, name) => (
//         <>
//             <img src='/right.svg' width='18px' alt="Right Arrow" />
//             <Link href={href} className='route-link'>
//                 {name}
//             </Link>
//         </>
//     );

//     return (
//         <div className='nav-section-page' style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
//             <Menu />
//             <nav className='nav-section-page' style={{ display: 'flex', flexDirection: 'row', width: '90%', alignItems: 'center', justifyContent: 'left' }}>
//                 <div className='nav-section-div'>
//                     <Link href='/' className='route-link'>
//                         <img src='/logo.png' width='200px' height='30px' alt="Logo" />
//                     </Link>
//                     {renderLink('/dashboards', 'Dashboards')}

//                     {params.folderId && renderLink(`/dashboards/folder/${params.folderId}`, `Folder ${params.folderId}`)}

//                     {dashboard && renderLink(`/dashboards/${dashboard.id}`, dashboard.name)}

//                     {dashboard && params.visualizationId && renderLink(`/dashboards/${dashboard.id}/visualizations/${params.visualizationId}`, `Visualization ${params.visualizationId}`)}

//                     {params.folderId && dashboard && renderLink(`/dashboards/folder/${params.folderId}/${dashboard.id}`, `${dashboard.name}`)}

//                     {params.folderId && dashboard && params.visualizationId && renderLink(`/dashboards/folder/${params.folderId}/${dashboard.id}/visualizations/${params.visualizationId}`, `Visualization ${params.visualizationId}`)}

//                     {renderLink('/settings', 'Settings')}
//                     {renderLink('/databases', 'Databases')}
//                 </div>
//             </nav>
//         </div>
//     );
// }