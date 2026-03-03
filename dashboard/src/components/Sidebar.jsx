import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
    const location = useLocation();

    return (
        <aside className="sidebar">
            <h2>ReparaTech</h2>
            <nav>
                <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                    📊 Dashboard Central
                </Link>
                <Link to="/products" className={location.pathname === '/products' ? 'active' : ''}>
                    📦 Catálogo de Productos
                </Link>
                <Link to="/users" className={location.pathname === '/users' ? 'active' : ''}>
                    👥 Base de Usuarios
                </Link>
            </nav>
        </aside>
    );
}

export default Sidebar;
