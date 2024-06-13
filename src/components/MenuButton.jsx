import Link from 'next/link'
import { createFolder, createFolderDashboard, createDashboard } from '@/lib/actions'
import { useRouter } from 'next/navigation';

const MenuButton = ({ name, style, isFolder, folderId, dashboardId, user }) => {

    const router = useRouter();

    const handleEvent = async () => {
        switch (name) {
            case 'New Folder':
                const newFolder = await createFolder(user)
                router.push(`/dashboards/folder/${newFolder.id}`);
                break
            case 'New Dashboard':
                let newDashboard
                if (isFolder) {
                    newDashboard = await createFolderDashboard(folderId, user)
                    router.push(`/dashboards/folder/${newDashboard.folderId}/${newDashboard.id}`)
                } else {
                    newDashboard = await createDashboard(user)
                    router.push(`/dashboards/${newDashboard.id}`)
                }
                break
            case 'New Visualization':
                folderId
                    ? router.push(`/dashboards/folder/${folderId}/${dashboardId}/new-visualization`)
                    : router.push(`/dashboards/${dashboardId}/new-visualization`)
            default: break
        }
    }

    return (
        <div>
            <button type='submit' className='btn-menu button' onClick={handleEvent} style={style}>{name}</button>
        </div>
    );
}

export default MenuButton;