'use client'

export const dynamic = 'force-dynamic'

export default function Information({ build }) {
    let query = 'soy la query'
    let datos = { build }
    //TODO: ARMAR LA BUILD CON TODOS LOS DATOS NECESARIOS PARA ESTA VISUALIZACION Y GUARDARLO EN EL DASHBOARD
    return (
        <div className="tab-content">
            <h4>Panel Querys</h4>
            <textarea name='query' disabled value={query} style={{ minWidth: '90%', maxWidth: '95%', minHeight: '30px' }}></textarea>
            <h4>Panel Info</h4>
            {build
                ? <textarea name='build' disabled value={datos} style={{ minWidth: '90%', maxWidth: '95%', minHeight: '100px' }}></textarea>
                : <textarea name='build' disabled value='' style={{ minWidth: '90%', maxWidth: '95%', minHeight: '100px' }}></textarea>
            }

        </div>
    )
}
