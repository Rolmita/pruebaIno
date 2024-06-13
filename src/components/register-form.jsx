'use client'
import Button from '@/components/button-form';
import { useState } from 'react';
import { register } from '@/lib/actions'
import { signIn } from 'next-auth/react'; // signIn desde lado CLIENTE
import Link from 'next/link';

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
            <div className='user-form-group'>
                <div className='label-div' style={{ width: '100%' }}><label htmlFor='name'>Username: </label></div>
                <div style={{ width: '100%' }}><input type='text' name='name' placeholder="José García" /></div>
            </div>
            <div className='user-form-group'>
                <div className='label-div'><label htmlFor='email'>Email: </label></div>
                <div><input type='email' name='email' placeholder="jose@mail.com" maxLength='64' /></div>
            </div>
            <div className='user-form-group'>
                <div className='label-div'><label htmlFor='password'>Password: </label></div>
                <div><input type="password" name='password' placeholder="******" /></div>
            </div>
            <p className={`info ${tipo}`}> {resultado} </p>

            <Button title="Crear cuenta" />

            <div className='form-change'><p>Are you already registered?</p><Link href='/auth/login'>Log in</Link></div>
        </form>

    );
};

export default RegisterForm;