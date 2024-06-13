'use client'
import Button from '@/components/button-form';
import { useState } from 'react';
import { login } from '@/lib/actions'
import Link from 'next/link';


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
            <div className='user-form-group'>
                <div className='label-div'><label htmlFor='email'>Email: </label></div>
                <div><input type='email' name='email' placeholder="jose@mail.com" maxLength='64' /></div>
            </div>
            <div className='user-form-group'>
                <div className='label-div'><label htmlFor='password'>Password: </label></div>
                <div><input type="password" name='password' placeholder="******" /></div>
            </div>
            <p className={`info ${tipo}`}> {resultado} </p>

            <Button title="Log in" />

            <div className='form-change'><p>Are you not registered yet?</p><Link href='/auth/register'>Sign up</Link></div>
        </form>
    );
};

export default LoginForm;