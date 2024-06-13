'use server'
import { prisma } from './prisma';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcryptjs'
import { signIn, signOut } from '@/auth';
import { getUserByEmail } from '@/lib/data';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import mysql from 'mysql2/promise'

// AUTHENTICATION FUNCTIONS
// REGISTER
export async function register(formData) {
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')

    if (name == '' || email == '' || password == '') {
        return { error: 'Complete all fields to register.' }
    }

    // Comprobamos si el usuario ya está registrado
    const user = await getUserByEmail(email);

    if (user) {
        return { error: 'The email is already registered.' }
    }

    // Encriptamos password 
    const hashedPassword = await bcrypt.hash(password, 10)

    // Guardamos credenciales en base datos
    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    return { success: "Successful registration." }
}

export async function login(formData) {
    const email = formData.get('email')
    const password = formData.get('password')

    if (email == '' || password == '') {
        return { error: 'Complete all fields to log in.' }
    }

    const user = await getUserByEmail(email);

    if (!user) {
        return { error: 'This user is not registered.' }
    }

    const matchPassword = await bcrypt.compare(password, user.password)

    if (user && matchPassword) {  // && user.emailVerified
        await signIn('credentials',
            {
                email, password,
                redirectTo: globalThis.callbackUrl
            })
        return { success: "Successful login." }
    } else {
        return { error: 'Incorrect credentials.' }
    }
}

// LOGOUT
export async function logout() {
    try {
        await signOut({ redirectTo: '/' })
    } catch (error) {
        throw error
    }
}

export async function getUserBySession() {
    const session = await auth()
    const user = await getUserByEmail(session.user.email)
    return user
}
// FOLDER FUNCTIONS

export async function createFolder(user) {
    try {
        const newNum = await newNumFolder(user)

        const newFolder = await prisma.folder.create({
            data: {
                name: `Nueva carpeta (${newNum})`,
                userId: user
            }
        });

        revalidatePath('/dashboards')
        redirect(`/dashboards/folder/${newFolder.id}`)
        return newFolder

    } catch (error) {
        // console.log(error);
        throw error
    }
}

async function newNumFolder(user) {

    const maxNum = await prisma.folder.findFirst({
        where: {
            name: { startsWith: 'Nueva carpeta (' },
            userId: user
        },
        select: { name: true },
        orderBy: { name: 'desc' }
    })

    let newNum = 1;

    if (maxNum) {
        const regex = /Nueva carpeta \((\d+)\)/;
        const match = regex.exec(maxNum.name);
        if (match) newNum = parseInt(match[1]) + 1;
    }

    return newNum
}

export async function editFolder(formData) {
    try {
        const id = formData.get('id')
        const folderId = Number(id)
        const folderName = formData.get('folderName')
        const result = await prisma.folder.update({
            where: { id: folderId },
            data: { name: folderName }
        })
        console.log('El nombre de la carpeta se ha actualizado correctamente', result);
        revalidatePath(`/dashboards/folder/${id}`)

    } catch (error) {
        // console.log(error);
        throw error
    }
}

export async function getFolderById(id) {
    const folder = await prisma.folder.findUnique({
        where: { id: id }
    })
    return folder
}
export async function getFolders() {
    const folders = await prisma.folder.findMany({ include: { dashboards: true } })
    return folders;
}

export async function getFolderWithDashboards(id) {
    const idFolder = Number(id)
    const result = await prisma.folder.findUnique({
        where: { id: idFolder },
        include: { dashboards: true }
    })
    return result
}

export async function deleteFolder(id) {
    try {
        const idFolder = Number(id)
        const dashboardsToDelete = await prisma.dashboard.findMany({
            where: { folderId: id }
        })
        // console.log(dashboardsToDelete);
        dashboardsToDelete.forEach(dashboard => deleteDashboard(dashboard.id))
        // console.log('los dahsboards pertenecientes a la carpeta ', id, 'han sido eliminados');
        const result = await prisma.folder.delete({
            where: { id: idFolder },
            include: { dashboards: true }
        })
        // console.log('la carpeta con id ', id, 'ha sido eliminada');
        revalidatePath('/dashboards')
    } catch (e) {
        // console.log(e)
    }
}

//  DASHBOARD FUNCTIONS

export async function getDashboardById(id) {
    const dashboard = await prisma.dashboard.findUnique({
        where: { id: id }
    })
    return dashboard
}

export async function createDashboard(user) {

    const newNum = await newNumDashboard(user)

    const result = await prisma.dashboard.create({
        data: {
            name: `Nuevo dashboard (${newNum})`,
            userId: user,
            content: JSON.stringify({ layout: { lg: [], md: [], sm: [], xs: [], xxs: [] }, charts: [] })
        }
    })
    return result;
}

export async function createFolderDashboard(folderId, user) {

    const folder = Number(folderId)
    console.log('ESTE ES EL USUARIO DEL DASHBOARD DE CARPETA', user);
    const newNum = await newNumDashboard(user, folder)

    const result = await prisma.dashboard.create({
        data: {
            name: `Nuevo dashboard (${newNum})`,
            folderId: folder,
            userId: user,
            content: JSON.stringify({ layout: { lg: [], md: [], sm: [], xs: [], xxs: [] }, charts: [] })
        }
    })
    return result;
}

async function newNumDashboard(user, folder) {

    let newNum = 1;
    let maxNum;

    if (folder) {
        const dashboards = await prisma.dashboard.findMany({
            where: {
                name: { startsWith: 'Nuevo dashboard (' },
                folderId: folder,
                userId: user
            },
            select: { name: true }
        });

        dashboards.sort((a, b) => {
            const regex = /Nuevo dashboard \((\d+)\)/;
            const aNum = parseInt(a.name.match(regex)[1], 10);
            const bNum = parseInt(b.name.match(regex)[1], 10);
            return bNum - aNum;
        });

        maxNum = dashboards.length > 0 ? dashboards[0] : null;
    } else {
        const dashboards = await prisma.dashboard.findMany({
            where: {
                name: { startsWith: 'Nuevo dashboard (' },
                userId: user
            },
            select: { name: true }
        });

        dashboards.sort((a, b) => {
            const regex = /Nuevo dashboard \((\d+)\)/;
            const aNum = parseInt(a.name.match(regex)[1], 10);
            const bNum = parseInt(b.name.match(regex)[1], 10);
            return bNum - aNum;
        });

        maxNum = dashboards.length > 0 ? dashboards[0] : null;
    }

    if (maxNum) {
        const regex = /Nuevo dashboard \((\d+)\)/;
        const match = regex.exec(maxNum.name);
        if (match) {
            const extractedNumber = parseInt(match[1], 10);
            newNum = extractedNumber + 1;
        } else {
            newNum = 1;
        }
    } else {
        newNum = 1;
    }
    return newNum
}

export async function getDashboardsWithoutFolders() {
    const dashboards = await prisma.dashboard.findMany({
        where: {
            folderId: null
        }
    })
    return dashboards;
}

export async function deleteDashboard(id) {
    try {
        const dashboardId = Number(id)
        const result = await prisma.dashboard.delete({
            where: { id: dashboardId }
        })
            // console.log('El dashboard ', dashboardId, ' ha sido eliminado.');
            // console.log(result);
            (result.folderId != null) ? revalidatePath(`/dashboards/${result.folderId}`) : revalidatePath(`/dashboards`)
    } catch (e) {
        // console.log(e);
    }
}

export async function editDashboard(formData) {
    try {
        const id = formData.get('id')
        const dashboardId = Number(id)
        const dashboardName = formData.get('dashboardName')
        const result = await prisma.dashboard.update({
            where: { id: dashboardId },
            data: { name: dashboardName }
        })
        console.log('El nombre de la carpeta se ha actualizado correctamente', result);
        revalidatePath(`/folder/${result.folderId}/${dashboardId}`)

    } catch (error) {
        // console.log(error);
        throw error
    }
}

export async function saveLayouts(newLayout, dashboard, breakpoint) {
    const prevContent = JSON.parse(dashboard.content);
    const updatedContent = { ...prevContent };
    updatedContent.layout[breakpoint] = newLayout;
    const newContent = JSON.stringify(updatedContent);
    const result = await prisma.dashboard.update({
        where: { id: dashboard.id },
        data: { content: newContent }
    });
    // console.log('Se ha guardado el layout actualizado en el dashboard', result);
    // return result;
    //TODO: RECARGA DE PAG
    // result.folderId ? revalidatePath(`/dashboards/folder/${result.folderId}/${result.id}`) : revalidatePath(`/dashboards/${result.id}`)
}

//Para nuevo grafico
export async function saveChart(finalData, finalOptions, dashboard, query, queryDb, visualizationId) {
    // console.log('comenzando a guardar el grafico');
    const prevContent = JSON.parse(dashboard.content)
    const prevLayout = prevContent.layout
    const prevCharts = prevContent.charts
    // console.log(prevContent.charts);
    if (visualizationId == null) {
        // console.log('es un grafico no existente');
        let chartCount = 0
        // console.log('prevlayout:', prevLayout, 'prevCharts:', prevCharts);
        console.log('chartType:', chartType);
        // console.log('prevCharts.length:', prevCharts.length);
        if (prevCharts.length > 0) {
            prevCharts.forEach(chart => {
                if (chart.id > chartCount) chartCount = chart.id
                // console.log(chartCount);
            })
        }
        const idChart = chartCount + 1
        // prevLayout.push({ i: idChart, x: 0, y: 0, w: 12, h: 2 })
        prevLayout.lg.push({ i: idChart, x: 0, y: 0, w: 12, h: 3 })
        prevLayout.md.push({ i: idChart, x: 0, y: 0, w: 10, h: 3 })
        prevLayout.sm.push({ i: idChart, x: 0, y: 0, w: 6, h: 3 })
        prevLayout.xs.push({ i: idChart, x: 0, y: 0, w: 4, h: 3 })
        prevLayout.xxs.push({ i: idChart, x: 0, y: 0, w: 2, h: 3 })
        prevCharts.push({ id: idChart, type: finalData.datasets[0].type, querys: [{ query: query, db: queryDb }], data: finalData, options: finalOptions })
        // const newContent = { ...prevContent, layout: prevLayout, charts: prevCharts }
        // //INCLUIR EN BD
        // const result = await prisma.dashboard.update({
        //     where: { id: dashboard.id },
        //     data: { content: JSON.stringify(newContent) }
        // })
        // console.log('guardando nuevo grafico', prevCharts);
        //TODO: revalidate path (quizá pasando los parámetros en la página)
        //TODO: no recoge chartType
    } else {
        console.log('es un grafico existente');
        console.log(visualizationId);
        if (prevCharts.length > 0) {
            const chartIndex = prevCharts.findIndex(chart =>
                Number(chart.id) == Number(visualizationId)
            )
            console.log(chartIndex);
            console.log('actualizando grafico', prevCharts[chartIndex]);
            prevCharts[chartIndex] = {
                ...prevCharts[chartIndex],
                id: visualizationId,
                type: finalData.datasets[0].type,
                querys: [{ query: query, db: queryDb }],
                data: finalData,
                options: finalOptions
            }
            console.log('elemento actualizado', prevCharts[chartIndex]);
        }
    }
    const newContent = { ...prevContent, layout: prevLayout, charts: prevCharts }
    //INCLUIR EN BD
    try {
        const result = await prisma.dashboard.update({
            where: { id: dashboard.id },
            data: { content: JSON.stringify(newContent) }
        })
        // console.log('dashboard actualizado con el grafico', result);
    } catch (e) {
        // console.log(e);
    }

    // revalidatePath(`/folder/${result.folderId}/${result.id}`)
}

export async function deleteChart(dashboard, chartId) {
    // console.log(dashboard);
    // console.log(' ELIMINANDO CHART ', chartId, typeof chartId, ' DEL DASHBOARD ', dashboard.id);
    const prevContent = JSON.parse(dashboard.content)
    const updatedContent = { ...prevContent }
    // eliminamos la config de layout del dashboard correspondiente al grafico
    for (const breakpoint in updatedContent.layout) {
        if (updatedContent.layout.hasOwnProperty(breakpoint)) {
            updatedContent.layout[breakpoint] = updatedContent.layout[breakpoint].filter(config => config.i != chartId);
            console.log(updatedContent.layout[breakpoint]);
        }
    }
    // console.log(updatedContent.layout);
    console.log(updatedContent.charts);
    const updatedCharts = updatedContent.charts.filter(chart => chart.id != parseInt(chartId))
    updatedContent.charts = updatedCharts
    // console.log(updatedContent);
    const result = await prisma.dashboard.update({
        where: { id: dashboard.id },
        data: { content: JSON.stringify(updatedContent) }
    })
    result.folderId ? revalidatePath(`dashboards/folder/${result.folderId}/${result.id}`) : revalidatePath(`/dashboards/${result.id}`)
}

export async function getVisualization(dashboard, visualizationId) {
    const prevContent = JSON.parse(dashboard.content)
    const visualization = prevContent.charts.find(chart => chart.id == visualizationId)
    // console.log(visualization);
    return visualization
}