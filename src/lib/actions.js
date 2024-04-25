'use server'
import { prisma } from './prisma';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcryptjs'
import { signIn, signOut } from '@/auth';
import { getUserByEmail } from '@/lib/data';
import { redirect } from 'next/navigation';
import mysql from 'mysql2/promise'

// AUTHENTICATION FUNCTIONS
// REGISTER
export async function register(formData) {
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')

    // Comprobamos si el usuario ya está registrado
    const user = await getUserByEmail(email);

    if (user) {
        return { error: 'El email ya está registrado' }
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

    return { success: "Registro correcto" }
}

// LOGIN credentials
export async function login(formData) {
    const email = formData.get('email')
    const password = formData.get('password')

    // Comprobamos si el usuario está registrado
    const user = await getUserByEmail(email);

    if (!user) {
        return { error: 'Usuario no registrado.' }
    }

    // Comparamos password 
    const matchPassword = await bcrypt.compare(password, user.password)

    if (user && matchPassword) {  // && user.emailVerified
        await signIn('credentials',
            {
                email, password,
                redirectTo: globalThis.callbackUrl
                // redirectTo: user.role == 'ADMIN' ? '/admin' : '/dashboard'
            })
        return { success: "Inicio de sesión correcto" }
    } else {
        return { error: 'Credenciales incorrectas.' }
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
        return newFolder

    } catch (error) {
        console.log(error);
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
        // console.log('El nombre de la carpeta se ha actualizado correctamente', result);
        revalidatePath(`/folder/${id}`)

    } catch (error) {
        console.log(error);
        throw error
    }
}

export async function getFolders() {
    const folders = await prisma.folder.findMany({ include: { dashboards: true } })
    return folders;
}

export async function getFolderById(id) {
    const idFolder = Number(id)
    const result = await prisma.folder.findUnique({
        where: { id: idFolder },
        include: {
            dashboards: true
        }
    })
    return result
}

//  DASHBOARD FUNCTIONS

export async function createDashboard(user) {

    const newNum = await newNumDashboard(user)

    const result = await prisma.dashboard.create({
        data: {
            name: `Nuevo dashboard (${newNum})`,
            userId: user
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
            userId: user
        }
    })
    return result;
}

async function newNumDashboard(user, folder) {
    let maxNum;

    if (folder) {
        maxNum = await prisma.dashboard.findFirst({
            where: {
                name: { startsWith: 'Nuevo dashboard (' },
                folderId: folder,
                userId: user
            },
            select: { name: true },
            orderBy: { name: 'desc' }
        })
    } else {
        maxNum = await prisma.dashboard.findFirst({
            where: {
                name: { startsWith: 'Nuevo dashboard (' },
                userId: user
            },
            select: { name: true },
            orderBy: { name: 'desc' }
        })
    }

    let newNum = 1;

    if (maxNum) {
        const regex = /Nuevo dashboard \((\d+)\)/;
        const match = regex.exec(maxNum.name);
        match ? newNum = parseInt(match[1]) + 1 : newNum = 1
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

export async function saveLayouts(layout, id) {
    const content = JSON.stringify(layout)
    const result = await prisma.dashboard.update({
        where: { id: id },
        data: { content: content }
    })
    console.log('Se ha guardado el layout para el siguiente dashboard', result);
    return result
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
        // console.log('El nombre de la carpeta se ha actualizado correctamente', result);
        revalidatePath(`/folder/${result.folderId}/${dashboardId}`)

    } catch (error) {
        console.log(error);
        throw error
    }
}

// TODO
export async function openDBConnection(dbConfig) {
    console.log(dbConfig);
    const connection = await mysql.createConnection(dbConfig);
    console.log(connection);
    return connection
}

function dBConnConfig(formData) {
    const dbName = formData.get('name');
    const hostName = formData.get('host');
    const connPort = formData.get('port')
    const connUser = formData.get('user')
    const userPass = formData.get('password')

    const config = {
        host: hostName,
        user: connUser,
        password: userPass,
        database: dbName,
        port: connPort,
        supportBigNumbers: true,
        decimalNumbers: true,
    };
    return config
}

function editDBobject(foundUser, dBPrevName, dbConfig) {
    const allDB = foundUser.databases
    let index
    for (let i = 0; i < allDB.length; i++) {
        if (allDB[i].database == dBPrevName) index = i
    }
    allDB[index].host = dbConfig.host
    allDB[index].user = dbConfig.user
    allDB[index].password = dbConfig.password
    allDB[index].database = dbConfig.database
    allDB[index].port = dbConfig.port
    allDB[index].supportBigNumbers = dbConfig.supportBigNumbers
    allDB[index].decimalNumbers = dbConfig.decimalNumbers
    return allDB
}

async function findUserById(userId) {
    const foundUser = await prisma.user.findUnique({
        where: { id: userId }
    })
    return foundUser
}

async function updateDb(all, userId) {
    const result = await prisma.user.update({
        data: {
            databases: all
        },
        where: {
            id: userId
        }
    })

    return result
}

export async function createDbConnection(formData) {
    let all;
    const userId = formData.get('userId')

    const foundUser = await findUserById(userId)
    const dbConfig = dBConnConfig(formData)

    if (foundUser.databases == null) {
        all = [dbConfig]
        JSON.stringify(all)
    } else {
        all = foundUser.databases
        all.push(dbConfig)
    }

    const result = await updateDb(all, userId)

    console.log('Se ha registrado la nueva fuente de datos', result.databases);
    revalidatePath('/databases')
    redirect('/databases')
}

export async function editDbConnection(formData) {
    let all;
    const userId = formData.get('userId')
    const dBPrevName = formData.get('dbPrev')

    const foundUser = await findUserById(userId)
    const dbConfig = dBConnConfig(formData)

    all = editDBobject(foundUser, dBPrevName, dbConfig)

    const result = await updateDb(all, userId)
    console.log(`Se ha editado la fuente de datos ${dBPrevName}`, result.databases);

    revalidatePath('/databases')
    redirect('/databases')
}

export async function deleteDB(formData) {
    let all;
    const userId = formData.get('userId')
    const dBPrevName = formData.get('dbPrev')

    const foundUser = await findUserById(userId)

    all = deleteDBobject(foundUser, dBPrevName)

    const result = await updateDb(all, userId)
    console.log(`Se ha eliminado la fuente de datos ${dBPrevName}`, result.databases);

    revalidatePath('/databases')
    redirect('/databases')

}

function deleteDBobject(foundUser, dBPrevName) {
    const allDB = foundUser.databases
    let index
    for (let i = 0; i < allDB.length; i++) {
        if (allDB[i].database == dBPrevName) index = i
    }
    allDB.splice(index, 1)
    return allDB
}