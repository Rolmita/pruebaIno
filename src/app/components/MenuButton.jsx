import Link from 'next/link'
import { createFolder, editFolder } from '@/lib/actions'
import { useRouter } from 'next/navigation';

const MenuButton = ({ name, style, isFolder }) => {

    const router = useRouter();

    const handleEvent = async () => {
        if (name == 'New Folder') {
            const newFolder = await createFolder()
            router.push(`/dashboards/folder?id=${newFolder.id}`);
        } else if (name == 'Save name') {
            // TODO: ME DA ERROR EDITAR EL NOMBRE
            const editName = await editFolder(formData)
        } else if(name=='New Dashboard' && isFolder){
            router.push(`/dashboards/folder?id=${newFolder.id}/new-dashboard`);
        }
    }

    return (
        <div>
            <button type='submit' className='btn-menu button' onClick={handleEvent} style={style}>{name}</button>
        </div>
    );
}

export default MenuButton;