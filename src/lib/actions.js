'use server'
import { prisma } from './prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs'
import { signIn, signOut } from '@/auth';
import { getUserByEmail } from '@/lib/data';
import { auth } from '@/auth';

// AUTHENTICATION FUNCTIONS
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

    if (user && matchPassword) {  // TODO: && user.emailVerified
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

    } catch (error) {
        console.log(error)
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

        revalidatePath(`/dashboards/folder/${id}`)

    } catch (error) {
        console.log(error);
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

        dashboardsToDelete.forEach(dashboard => deleteDashboard(dashboard.id))

        const result = await prisma.folder.delete({
            where: { id: idFolder },
            include: { dashboards: true }
        })

        revalidatePath('/dashboards')

    } catch (e) {
        console.log(e)
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
            content: JSON.stringify({
                layout: { lg: [], md: [], sm: [], xs: [], xxs: [] }, charts: []
            })
        }
    })
    return result;
}

export async function createFolderDashboard(folderId, user) {

    const folder = Number(folderId)

    const newNum = await newNumDashboard(user, folder)

    const result = await prisma.dashboard.create({
        data: {
            name: `Nuevo dashboard (${newNum})`,
            folderId: folder,
            userId: user,
            content: JSON.stringify({
                layout: { lg: [], md: [], sm: [], xs: [], xxs: [] }, charts: []
            })
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

        result.folderId != null
            ? revalidatePath(`/dashboards/${result.folderId}`)
            : revalidatePath(`/dashboards`)

    } catch (error) {
        console.log(error);
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

        revalidatePath(`/folder/${result.folderId}/${dashboardId}`)

    } catch (error) {
        console.log(error);
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

    const content = JSON.parse(result.content)

    return content.layout;

    //TODO: RECARGA DE PAG
    // result.folderId ? revalidatePath(`/dashboards/folder/${result.folderId}/${result.id}`) : revalidatePath(`/dashboards/${result.id}`)
}


export async function saveChart(finalData, finalOptions, dashboard, query, queryDb, visualizationId) {
    const prevContent = JSON.parse(dashboard.content)
    const prevLayout = prevContent.layout
    const prevCharts = prevContent.charts

    if (visualizationId == null) {
        let chartCount = 0

        if (prevCharts.length > 0) {
            prevCharts.forEach(chart => {
                if (chart.id > chartCount) chartCount = chart.id
            })
        }

        const idChart = chartCount + 1

        prevLayout.lg.push({ i: idChart, x: 0, y: 0, w: 12, h: 3 })
        prevLayout.md.push({ i: idChart, x: 0, y: 0, w: 10, h: 3 })
        prevLayout.sm.push({ i: idChart, x: 0, y: 0, w: 6, h: 3 })
        prevLayout.xs.push({ i: idChart, x: 0, y: 0, w: 4, h: 3 })
        prevLayout.xxs.push({ i: idChart, x: 0, y: 0, w: 2, h: 3 })

        prevCharts.push({
            id: idChart,
            type: finalData.datasets[0].type,
            querys: [{ query: query, db: queryDb }],
            data: finalData,
            options: finalOptions
        })

    } else {
        if (prevCharts.length > 0) {
            const chartIndex = prevCharts.findIndex(chart =>
                Number(chart.id) == Number(visualizationId)
            )

            prevCharts[chartIndex] = {
                ...prevCharts[chartIndex],
                id: visualizationId,
                type: finalData.datasets[0].type,
                querys: [{ query: query, db: queryDb }],
                data: finalData,
                options: finalOptions
            }

        }
    }

    const newContent = { ...prevContent, layout: prevLayout, charts: prevCharts }

    try {
        const result = await prisma.dashboard.update({
            where: { id: dashboard.id },
            data: { content: JSON.stringify(newContent) }
        })

        if (result.folderId) {
            revalidatePath(`dashboards/folder/${result.folderId}/${result.id}`)
            redirect(`dashboards/folder/${result.folderId}/${result.id}`)
        } else {
            revalidatePath(`/dashboards/${result.id}`)
            redirect(`/dashboards/${result.id}`)
        }

    } catch (e) {
        console.log(e);
    }

}

export async function deleteChart(dashboard, chartId) {

    const prevContent = JSON.parse(dashboard.content)
    const updatedContent = { ...prevContent }

    // Eliminamos la configuración de layout del dashboard correspondiente al grafico
    for (const breakpoint in updatedContent.layout) {

        if (updatedContent.layout.hasOwnProperty(breakpoint)) {

            updatedContent.layout[breakpoint] = updatedContent.layout[breakpoint].filter(
                config => config.i != chartId
            );

        }
    }

    // Eliminamos el gráfico
    const updatedCharts = updatedContent.charts.filter(
        chart => chart.id != parseInt(chartId)
    )

    updatedContent.charts = updatedCharts

    const result = await prisma.dashboard.update({
        where: { id: dashboard.id },
        data: { content: JSON.stringify(updatedContent) }
    })

    // Actualizamos la página
    result.folderId
        ? revalidatePath(`dashboards/folder/${result.folderId}/${result.id}`)
        : revalidatePath(`/dashboards/${result.id}`)
}

export async function getVisualization(dashboard, visualizationId) {

    const prevContent = JSON.parse(dashboard.content)

    const visualization = prevContent.charts.find(chart => chart.id == visualizationId)

    return visualization
}