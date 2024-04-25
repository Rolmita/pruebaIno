'use client'
import Button from '@/components/button-form';
import { useState } from 'react';
import { register } from '@/lib/actions'
import { signIn } from 'next-auth/react'; // signIn desde lado CLIENTE


function RegisterForm() {
    const [resultado, setResultado] = useState("")
    const [tipo, setTipo] = useState("")

    async function wrapper(data) {
        const message = await register(data) // Server action
        if (message.success) {
            setTipo('success')
            setResultado(message.success);
            await signIn('credentials',
                {
                    email: data.get('email'),
                    password: data.get('password'),
                    callbackUrl: '/'
                })
        } else {
            setTipo('error')
            setResultado(message.error);
        }

    }
    return (
        <form action={wrapper} className='credentials user-form'>
            <div>
                <label htmlFor='name' className='izq'>Nombre de usuario: </label>
                <input type='text' name='name' placeholder="José García" className='drch' />
            </div>
            <div>
                <label htmlFor='email' className='izq'>Correo electrónico: </label>
                <input type='email' name='email' placeholder="jose@mail.com" className='drch' />
            </div>
            <div>
                <label htmlFor='email' className='izq'>Contraseña: </label>
                <input type="password" name='password' placeholder="******" className='drch' />
            </div>
            <p className={`info ${tipo}`}> {resultado} </p>

            <Button title="Crear cuenta" />
        </form>

    );
};

export default RegisterForm;