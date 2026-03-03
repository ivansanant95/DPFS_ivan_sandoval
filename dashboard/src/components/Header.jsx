import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Header() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="top-header">
            <div>
                <h3 style={{ color: 'var(--text-main)', margin: 0 }}>Panel Administrativo</h3>
            </div>
            <div className="user-info" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span>{user ? `${user.firstName} ${user.lastName}` : 'Admin'}</span>
                    <img src={user ? `http://localhost:3000${user.image}` : "https://ui-avatars.com/api/?name=Admin&background=2563eb&color=fff"}
                        alt="Avatar" style={{ borderRadius: '50%', width: '40px', height: '40px', objectFit: 'cover', border: '2px solid var(--primary)' }} />
                </div>
                <button onClick={handleLogout} style={{ background: 'transparent', color: '#ef4444', border: '1px solid #ef4444', padding: '6px 15px', borderRadius: '5px', cursor: 'pointer', transition: 'all 0.3s' }} onMouseOver={e => { e.target.style.background = '#ef4444'; e.target.style.color = '#fff' }} onMouseOut={e => { e.target.style.background = 'transparent'; e.target.style.color = '#ef4444' }}>
                    Cerrar Sesión
                </button>
            </div>
        </header>
    );
}

export default Header;
