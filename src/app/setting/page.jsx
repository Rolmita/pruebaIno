'use client'
import React from 'react';
import Link from 'next/link'
import { getFolders, getDashboardsWithoutFolders, getUserBySession } from '@/lib/actions';
import Navbar from '../../components/NavBar';
import { useEffect, useState } from 'react';

export function Setting() {

    const [user, setUser] = useState(null)

    const changeDisability = (name, id) => {
        const buttons = document.getElementById(`${name}-div`)
        const editButton = document.getElementById(id)
        const form = document.getElementById(`${name}-form`)
        const inputs = form.querySelectorAll('input')

        inputs.forEach(input => {
            input.disabled == true ? input.disabled = false : input.disabled = true
            console.log(input.disabled);
        })

        if (editButton.style.display == 'none') {
            editButton.style.display = 'flex'
            buttons.style.display = 'none'
        } else {
            editButton.style.display = 'none'
            buttons.style.display = 'flex'
        }
    }

    useEffect(() => {
        getUserBySession()
            .then(user => setUser(user))
            .catch(error => console.error('Error fetching user by session:', error))
    }, [])

    return (
        <main>
            <section>
                <div className='nav-section-page' style={{ display: 'flex', flexDirection: 'row' }}>
                    <Navbar></Navbar>
                    <nav className='nav-section-page'>
                        <div>
                            <Link className='route-link' href='/'><h1>MyChartBoard</h1></Link>
                            <img src='/right.svg' width='18px'></img>
                            <Link className='route-link' href='/setting'>Setting</Link>
                        </div>
                    </nav>
                </div>
                <div className="show-setting">
                    <div className='setting-type'>
                        <div className='setting-list'>
                            <h1>Setting</h1>
                            <ul className='setting-list-grop'>
                                <li className='setting-list-element'>
                                    <button className='setting-list-element' type='button'>Account</button>
                                </li>
                            </ul>
                        </div>
                        <div className='setting'>
                            <div>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h3>Account</h3>
                                    </div>
                                    <div>
                                        <button type='button' id='edit-account' name='account' className='button btn-dropdown'
                                            style={{ display: 'flex' }}
                                            onClick={(e) => changeDisability(e.target.name, e.target.id)}>Edit</button>
                                    </div>
                                </div>
                                <form className='user-form' id='account-form'>
                                    <div className='user-form-group'>
                                        <div className='label-div' style={{ width: '100%' }}>
                                            <label htmlFor='name'>Username: </label>
                                        </div>
                                        <div style={{ width: '100%' }}>
                                            <input type='text' name='name' defaultValue={user?.name} disabled={true} />
                                        </div>
                                    </div>
                                    <div className='user-form-group'>
                                        <div className='label-div'>
                                            <label htmlFor='email'>Email: </label>
                                        </div>
                                        <div>
                                            <input type='email' name='email' defaultValue={user?.email} maxLength='64' disabled={true} />
                                        </div>
                                    </div>
                                    <div className='user-form-group'>
                                        <div className='label-div'>
                                            <label htmlFor='password'>Password: </label>
                                        </div>
                                        <div>
                                            <input type="password" name='password' placeholder='******' disabled={true} />
                                        </div>
                                    </div>
                                    <div id='account-div' style={{ display: 'none', flexDirection: 'row', justifyContent: 'right' }}>
                                        <button className='button btn-dropdown' id='cancel-edit' name='account' type='button'
                                            onClick={(e) => changeDisability(e.target.name, 'edit-account')}>Discard</button>
                                        <button className='button btn-dropdown' type='submit'>Save changes</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Setting;