import React from 'react';
import { useFetch } from '../hooks/useFetch';

function Products() {
    const { data, loading, error } = useFetch('http://localhost:3000/api/products');

    if (loading) return <div className="dashboard-container"><h2>⏳ Cargando productos...</h2></div>;
    if (error) return <div className="dashboard-container"><h2 style={{ color: '#ef4444' }}>❌ Error cargando productos</h2></div>;

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">Base de Datos: Productos</h2>
            <div className="panel">
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)' }}>
                            <th style={{ padding: '15px 10px', color: 'var(--text-muted)' }}>Imagen</th>
                            <th style={{ padding: '15px 10px', color: 'var(--text-muted)' }}>ID</th>
                            <th style={{ padding: '15px 10px', color: 'var(--text-muted)' }}>Nombre</th>
                            <th style={{ padding: '15px 10px', color: 'var(--text-muted)' }}>Categoría</th>
                            <th style={{ padding: '15px 10px', color: 'var(--text-muted)' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.products?.map(p => (
                            <tr key={p.id} style={{ borderBottom: '1px dashed var(--border)' }}>
                                <td style={{ padding: '15px 10px' }}>
                                    <div style={{ width: '40px', height: '40px', background: 'white', borderRadius: '5px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <i className="fa-solid fa-box" style={{ color: '#ccc' }}></i>
                                    </div>
                                </td>
                                <td style={{ padding: '15px 10px' }}>#{p.id}</td>
                                <td style={{ padding: '15px 10px', fontWeight: 'bold' }}>{p.name}</td>
                                <td style={{ padding: '15px 10px' }}>
                                    <span style={{ background: 'var(--primary)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>
                                        {p.categories?.join(', ')}
                                    </span>
                                </td>
                                <td style={{ padding: '15px 10px' }}>
                                    <a href={`http://localhost:3000${p.detail}`} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Ver API</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Products;
