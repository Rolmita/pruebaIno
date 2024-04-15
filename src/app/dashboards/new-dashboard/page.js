'use client'
import React from 'react';
import Link from 'next/link'
import '@/app/prueba.css'

const NewDashboard = () => {

    return (
        <form className='new-dashboard'>
            <h1 className='page-title'>CREATE A NEW FOLDER</h1>
            <h2>Step 1. Name your folder</h2>
            <div className='form-component'>
                <label>Folder name:</label>
                <input type='text' placeholder='Ej: inoelec1'></input>
            </div>
            <h2>Step 2. Select a database</h2>
            <div className='form-component'>
                <label>Your database:</label>
                {
                    //TODO: ESTE SELECT SE CONSTRUYE EN BASE A LAS DATABASES YA EXISTENTES EN EL SISTEMA (/databases)
                }
                <select>
                    <option>Database1</option>
                    <option>Database2</option>
                    <option>Database3</option>
                    <option>Database4</option>
                </select>
            </div>
            <Link className="button" href="/dashboard">Guardar Dashboard</Link>
        </form>
    );
};

export default NewDashboard;