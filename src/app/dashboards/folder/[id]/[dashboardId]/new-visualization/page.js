import Navbar from "@/components/NavBar"
import Link from "next/link"
import SelectDatabase from "@/components/SelectDatabase";
import { auth } from "@/auth";
import usePoolCluster from "@/lib/usePoolCluster";

export default async function NewVisualization({ params }) {
    console.log(params);

    const session = await auth()
    const user = await prisma.user.findUnique({
        where: { email: session.user.email }
    })
    const databases = user.databases

    const folderId = Number(params.id);
    const folder = await prisma.folder.findUnique({
        where: { id: folderId }
    })
    const dashboardId = Number(params.dashboardId)
    const dashboard = await prisma.dashboard.findUnique({
        where: { id: dashboardId }
    })

    const query = 'query sql'
    const build = 'data build'

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
                        <Link className='route-link' href={`/dashboards/folder/${folder.id}`}>{folder.name}</Link>
                        <img src='/right.svg' width='18px'></img>
                        <Link className='route-link' href={`/dashboards/folder/${folder.id}/${dashboard.id}`}>{dashboard.name}</Link>
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
                <section className="visualization" style={{ minWidth: '100%' }}>
                    <div className="preview" style={{ minHeight: '100%', backgroundColor: 'lightgrey' }}>
                        <div>
                            <button>Show Table</button>
                            <button>Show Graphic</button>
                            <label>Select time</label>
                            <select>
                                <option>Tiempo1</option>
                                <option>Tiempo2</option>
                                <option>Tiempo3</option>
                            </select>
                        </div>
                        <div className="preview-content" style={{ minHeight: '100%', backgroundColor: 'white' }}>
                            <div className="preview-table" style={{ border: '1px solid black', height: '100%' }}>
                                <table style={{ border: '1px solid black', margin: '10px auto' }}>
                                    <thead>
                                        <tr>
                                            <th>Tiempo</th>
                                            <th>Datos</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>01:00</td>
                                            <td>123</td>
                                        </tr>
                                        <tr>
                                            <td>01:00</td>
                                            <td>123</td>
                                        </tr>
                                        <tr>
                                            <td>01:00</td>
                                            <td>123</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="preview-graph">
                                <canvas></canvas>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="visualization-settings tabs" style={{ display: 'flex', flexDirection: 'column', minWidth: '20%', padding: '5px' }}>

                    <div className="tab-container">

                        <div id="tab4" className="tab">
                            <a href="#tab4"><h4>Build</h4></a>
                            <div className="tab-content">
                                <h4>Panel Querys</h4>
                                <textarea name='query' disabled defaultValue={query} style={{ minWidth: '90%', maxWidth: '95%', minHeight: '30px' }}></textarea>
                                <h4>Panel Info</h4>
                                <textarea name='build' disabled defaultValue={build} style={{ minWidth: '90%', maxWidth: '95%', minHeight: '100px' }}></textarea>
                            </div>
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
                            <div className="tab-content">
                                <h4>Titulo 2</h4>
                                <p>Lorem ipsum ...</p>
                            </div>
                        </div>

                        <div id='tab1' className="tab">
                            <a href='#tab1'><h4>Data</h4></a>
                            <div className="tab-content">
                                <form style={{ display: 'flex', flexDirection: 'column' }}>

                                    <SelectDatabase databases={databases}></SelectDatabase>

                                    <div className="form-row" style={{ display: 'flex', flexDirection: 'row', width: '100%' }}><label>Table name: </label>
                                        {/* la tabla que se selecciona con los datos 'from [nombre tabla]'*/}
                                        <select>
                                            <option name='first-table' value='null'>-- Choose a table --</option>
                                            <option name='first-table' value='table1'>Table1</option>
                                            <option name='first-table' value='table2'>Table2</option>
                                            <option name='first-table' value='table3'>Table3</option>
                                        </select>
                                    </div>
                                    <div className="form-row" style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                        <label>Columns: </label>
                                        <select>
                                            <option name='first-column' value='null'>-- Choose a column --</option>
                                            <option name='first-column' value='column1'>Column1</option>
                                            <option name='first-column' value='column2'>Column2</option>
                                            <option name='first-column' value='column3'>Column3</option>
                                        </select>
                                        <select>
                                            <option name='second-column' value='null'>-- Choose a column --</option>
                                            <option name='second-column' value='column1'>Column1</option>
                                            <option name='second-column' value='column2'>Column2</option>
                                            <option name='second-column' value='column3'>Column3</option>
                                        </select>
                                        <input type='checkbox'></input>
                                        <label>All columns</label>
                                    </div>

                                    {/* TODO: si se selecciona este checkbox la consulta se modifica y en lugar de el nombre de las columnas se pone '*' */}
                                    <div className="form-row" style={{ display: 'flex', flexDirection: 'row', width: '100%' }} >

                                    </div>
                                    {/* TODO: si se selecciona el siguiente botton salen mas, a la consulta hay que añadirle un ',' por cada columna seleccionada */}
                                    <div>
                                        <button>Add column</button>
                                    </div>
                                </form>
                                <button>Run query</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    )
}