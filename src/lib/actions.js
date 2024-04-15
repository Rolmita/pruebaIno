'use server'
import { prisma } from './prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function datosPrueba() {
    const results = await db.query('select * from pruebatiempo_voltios')
    return results;
}

export async function createFolder() {
    try {
        let name = 'Nueva carpeta';
        const result = await prisma.folder.create({
            data: {
                name: name
            }
        })
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }

}

export async function createDashboard(folder) {

}

export async function editFolder(formData) {
    try {

        const id = formData.get('id')
        console.log(id);
        const folderId = Number(id)
        const folderName = formData.get('folderName')
        console.log(folderName);
        const result = await prisma.folder.update({
            where: { id: folderId },
            data: { name: folderName }
        })
        console.log('El nombre de la carpeta se ha actualizado correctamente', result);

    } catch (error) {
        console.log(error);
        throw error
    }
}

export async function getFolders() {
    const folders = await prisma.folder.findMany(
        {
            include: { dashboards: true }
        }
    )
    return folders;
}

export async function getDashboardsWithoutFolders() {
    const dashboards = await prisma.dashboard.findMany({
        where: {
            folderId: null
        }
    })
    return dashboards;
}