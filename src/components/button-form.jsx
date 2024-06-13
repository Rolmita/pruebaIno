'use client'
import { useFormStatus } from 'react-dom'

function Button({title}) {
    const { pending } = useFormStatus()
    return (
        <button type="submit" disabled={pending}  className='btn-dropdown button'>
            {title}
        </button>
    )
}

export default Button