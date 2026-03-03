import React from 'react';
import { useFetch } from '../hooks/useFetch';

function Users() {
    const { data, loading, error } = useFetch('http://localhost:3000/api/users');

    if (loading) return <div className="dashboard-container"><h2>⏳ Cargando usuarios...</h2></div>;
    if (error) return <div className="dashboard-container"><h2 style={{ color: '#ef4444' }}>❌ Error cargando usuarios</h2></div>;

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">Base de Datos: Usuarios (Clientes y Staff)</h2>
            <div className="panel">
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)' }}>
                            <th style={{ padding: '15px 10px', color: 'var(--text-muted)' }}>ID</th>
                            <th style={{ padding: '15px 10px', color: 'var(--text-muted)' }}>Nombre Completo</th>
                            <th style={{ padding: '15px 10px', color: 'var(--text-muted)' }}>Email (Contacto)</th>
                            <th style={{ padding: '15px 10px', color: 'var(--text-muted)' }}>Ficha Ténica</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.users?.map(u => (
                            <tr key={u.id} style={{ borderBottom: '1px dashed var(--border)', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                                <td style={{ padding: '15px 10px', color: 'var(--text-muted)' }}>#{u.id}</td>
                                <td style={{ padding: '15px 10px', fontWeight: 'bold' }}>{u.name}</td>
                                <td style={{ padding: '15px 10px', color: '#10b981' }}>{u.email}</td>
                                <td style={{ padding: '15px 10px' }}>
                                    <a href={`http://localhost:3000${u.detail}`} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Inspeccionar API JSON</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;
