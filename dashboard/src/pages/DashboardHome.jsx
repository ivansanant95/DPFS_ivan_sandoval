import React from 'react';
import { useFetch } from '../hooks/useFetch';
import MetricCard from '../components/MetricCard';

function DashboardHome() {
    // 1. Efectos Secundarios: Consumir API Local de Node (Puerto 3000)
    const { data: usersData, loading: usersLoading, error: usersError } = useFetch('http://localhost:3000/api/users');
    const { data: productsData, loading: productsLoading, error: productsError } = useFetch('http://localhost:3000/api/products');

    // 2. Procesamiento de Metricas y Paneles
    const totalUsers = usersData?.count || 0;
    const totalProducts = productsData?.count || 0;
    const catKeys = productsData?.countByCategory ? Object.keys(productsData.countByCategory) : [];
    const totalCategories = catKeys.length;

    // Panel 2: Detalles del último producto creado
    const lastProduct = productsData?.products?.length > 0 ? productsData.products[productsData.products.length - 1] : null;

    // 3. Renderizado Condicional de Estados
    if (usersLoading || productsLoading) return <div className="dashboard-container"><h2>⏳ Cargando métricas en tiempo real...</h2></div>;
    if (usersError || productsError) return <div className="dashboard-container"><h2 style={{ color: '#ef4444' }}>❌ Falló la conexión con la API Base (Node.js)</h2><p>Asegúrate de tener el servidor Express corriendo en el puerto 3000.</p></div>;

    // 4. Renderizado Final Completo (SPA)
    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Resumen del Negocio</h1>

            {/* PANEL SIMPLE: TOTALES (Módulo de Paneles Simples) */}
            <div className="metrics-grid">
                <MetricCard title="Total Usuarios" value={totalUsers} />
                <MetricCard title="Total Productos" value={totalProducts} />
                <MetricCard title="Total Categorías Vivas" value={totalCategories} />
            </div>

            <div className="panels-grid">
                {/* PANEL DETALLE: Último Elemento Creado */}
                <div className="panel">
                    <h3>Último Producto Incorporado</h3>
                    {lastProduct ? (
                        <div>
                            <h4>{lastProduct.name}</h4>
                            <p style={{ color: "var(--text-muted)", marginTop: "10px", fontSize: '0.9rem' }}>{lastProduct.description}</p>
                            <a href={`http://localhost:3000${lastProduct.detail}`} target="_blank" rel="noreferrer"
                                style={{ display: 'inline-block', marginTop: '15px', color: 'var(--primary)', textDecoration: 'none', fontWeight: 'bold' }}>
                                Ver JSON Nativo →
                            </a>
                        </div>
                    ) : (
                        <p>No hay productos registrados.</p>
                    )}
                </div>

                {/* PANEL AGRUPADO: Total de productos por categoría */}
                <div className="panel">
                    <h3>Distribución por Categorías</h3>
                    <div>
                        {catKeys.map(cat => (
                            <div key={cat} className="category-item">
                                <span>{cat}</span>
                                <span className="count">{productsData.countByCategory[cat]}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* PANEL LISTADO: Catálogo Interactivo */}
            <div className="panel" style={{ marginTop: '30px' }}>
                <h3>Catálogo General de Productos</h3>
                <div style={{ overflowX: 'auto', marginTop: '20px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                <th style={{ padding: '10px 0', color: 'var(--text-muted)' }}>ID</th>
                                <th style={{ padding: '10px 0', color: 'var(--text-muted)' }}>Nombre del Producto</th>
                                <th style={{ padding: '10px 0', color: 'var(--text-muted)' }}>Categoría Nativa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productsData?.products?.map(p => (
                                <tr key={p.id} style={{ borderBottom: '1px dashed var(--border)' }}>
                                    <td style={{ padding: '12px 0' }}>#{p.id}</td>
                                    <td style={{ padding: '12px 0', fontWeight: '500' }}>{p.name}</td>
                                    <td style={{ padding: '12px 0', color: 'var(--text-muted)' }}>
                                        <span style={{ background: 'var(--border)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>
                                            {p.categories?.join(', ')}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default DashboardHome;
