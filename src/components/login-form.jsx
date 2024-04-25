'use client'
import Button from '@/components/button-form';
import { useState } from 'react';
import { login } from '@/lib/actions'


function LoginForm() {
    const [resultado, setResultado] = useState("")
    const [tipo, setTipo] = useState("")

    async function wrapper(data) {
        const message = await login(data) // Server action
        if (message?.success) {
            setTipo('success')
            setResultado(message.success);
        }
        if (message?.error) {
            setTipo('error')
            setResultado(message.error);
        }
    }
    return (
        <form action={wrapper} className='credentials user-form'>
            <div>
                <label htmlFor='email' className='izq'>Email de usuario:</label>
                <input type='email' name='email' placeholder="jose@mail.com" className='drch' />
            </div>
            <div>
                <label htmlFor='password' className='izq'>Contraseña:</label>
                <input type="password" name='password' placeholder="******" className='drch' />
            </div>
            <p className={`info ${tipo}`}> {resultado} </p>
            <Button title="Iniciar sesión" />
        </form>
    );
};

export default LoginForm;