'use server'
import { prisma } from './prisma';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcryptjs'
import { auth, signIn, signOut } from '@/auth';
import { getUserByEmail } from '@/lib/data';
import { redirect } from 'next/navigation';
import { mysql, createPoolCluster, createPool } from 'mysql2/promise'

// CONEXIONES A LAS BBDD

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
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10,
        idleTimeout: 60000,
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0,
    };
    return config
}

async function findUserById(userId) {
    const foundUser = await prisma.user.findUnique({
        where: { id: userId }
    })
    return foundUser
}

export async function saveDbConnection(formData) {
    const userId = formData.get('userId');
    const foundUser = await findUserById(userId);
    const dbConfig = dBConnConfig(formData);

    if (!foundUser.databases) {
        foundUser.databases = {};
    }

    foundUser.databases[dbConfig.database] = dbConfig;

    const result = await updateDb(foundUser.databases, userId);
    console.log('Se ha registrado la nueva fuente de datos', result.databases);

    revalidatePath('/databases');
    redirect('/databases');
}

async function updateDb(databases, userId) {
    const result = await prisma.user.update({
        data: {
            databases: databases
        },
        where: {
            id: userId
        }
    })

    return result
}

export async function editDbConnection(formData) {
    const userId = formData.get('userId')
    const dBPrevName = formData.get('dbPrev')
    const foundUser = await findUserById(userId)
    const dbConfig = dBConnConfig(formData)

    updateDbConfig(foundUser, dBPrevName, dbConfig)
    const result = await updateDb(foundUser.databases, userId)
    console.log(`Se ha editado la fuente de datos ${dBPrevName}`, result.databases);

    revalidatePath('/databases')
    redirect('/databases')
}

function updateDbConfig(foundUser, dBPrevName, dbConfig) {

    if (!foundUser.databases) return;

    const dbToUpdate = foundUser.databases[dBPrevName]
    if (dbToUpdate) {
        dbToUpdate.host = dbConfig.host
        dbToUpdate.user = dbConfig.user
        dbToUpdate.password = dbConfig.password
        dbToUpdate.database = dbConfig.database
        dbToUpdate.port = dbConfig.port
        dbToUpdate.supportBigNumbers = dbConfig.supportBigNumbers
        dbToUpdate.decimalNumbers = dbConfig.decimalNumbers
        dbToUpdate.waitForConnections = dbConfig.waitForConnections
        dbToUpdate.waitForConnections = dbConfig.connectionLimit
        dbToUpdate.waitForConnections = dbConfig.maxIdle
        dbToUpdate.waitForConnections = dbConfig.idleTimeout
        dbToUpdate.waitForConnections = dbConfig.queueLimit
        dbToUpdate.waitForConnections = dbConfig.enableKeepAlive
        dbToUpdate.waitForConnections = dbConfig.keepAliveInitialDelay
    }
}

export async function deleteDB(formData) {
    const userId = formData.get('userId');
    const dBPrevName = formData.get('dbPrev');
    const foundUser = await findUserById(userId);

    deleteDBobject(foundUser, dBPrevName);

    const result = await updateDb(foundUser.databases, userId);
    console.log(`Se ha eliminado la fuente de datos ${dBPrevName}`, result.databases);

    revalidatePath('/databases');
    redirect('/databases');
}

function deleteDBobject(foundUser, dBPrevName) {
    if (!foundUser.databases) return;
    delete foundUser.databases[dBPrevName];
}

export async function createCluster() {
    const session = await auth()
    const user = await getUserByEmail(session.user.email)
    const databasesConfig = user.databases
    const poolCluster = createDatabasePoolCluster(databasesConfig);
    console.log(cluster);
    return poolCluster
}

function createDatabasePoolCluster(databasesConfig) {
    const cluster = createPoolCluster();

    for (const dbName in databasesConfig) {
        const dbConfig = databasesConfig[dbName];
        const pool = createPool(dbConfig);
        cluster.add(dbName, pool);
    }
    return cluster;
}

