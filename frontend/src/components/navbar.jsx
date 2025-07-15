import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/navbar.css';
import logo from '../assets/images/logo.png';


function useOutsideAlerter(ref, onOutsideClick, isCollapsed) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (!isCollapsed && ref.current && !ref.current.contains(event.target)) {
                onOutsideClick();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, onOutsideClick, isCollapsed]);
}

function UserMenu({ user, onLogoutClick, isAdmin }) { 
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuRef]);

    return (
        <div className="user-menu-container" ref={menuRef}>
            <img 
                src={user.profilePicture} 
                alt="Foto de perfil" 
                className="profile-picture" 
                onClick={() => setIsOpen(!isOpen)} 
            />
            
            {isOpen && (
                <div className="dropdown-menu show">
                    <span className="dropdown-item-text">Olá, {user.name}</span>
                    <div className="dropdown-divider"></div>
                    
                    {isAdmin && (
                        <NavLink className="dropdown-item" to="/admin" onClick={() => setIsOpen(false)}>
                            <i className="bi bi-shield-lock me-2"></i>Painel Admin
                        </NavLink>
                    )}

                    <NavLink className="dropdown-item" to="/settings" onClick={() => setIsOpen(false)}>Gerenciar Conta</NavLink>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item" onClick={onLogoutClick}>Sair</button>
                </div>
            )}
        </div>
    );
}

function LogoutConfirmationModal({ isOpen, onClose, onConfirm, isClosing }) {
    if (!isOpen) return null;

    return (
        <div className={`logout-modal-backdrop ${isClosing ? 'exiting' : ''}`}>
            <div className={`logout-modal-dialog ${isClosing ? 'exiting' : ''}`}>
                <h5>Confirmar Saída</h5>
                <p>Você tem certeza que deseja sair da sua conta?</p>
                <div className="logout-modal-actions">
                    <button onClick={onClose} className="btn btn-secondary">Cancelar</button>
                    <button onClick={onConfirm} className="btn btn-danger">Sim, Sair</button>
                </div>
            </div>
        </div>
    );
}


function Navbar() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const collapseRef = useRef(null);
  
  const handleToggle = () => {
    isNavCollapsed ? setIsNavCollapsed(false) : closeMenu();
  };

  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsNavCollapsed(true);
      setIsClosing(false);
    }, 400);
  };

  const handleCloseModal = () => {
    setIsModalClosing(true);
    setTimeout(() => {
        setIsLogoutConfirmOpen(false);
        setIsModalClosing(false);
    }, 300);
  };

  const handleLogout = () => {
      logout();
      navigate('/login');
      setIsLogoutConfirmOpen(false);
  };

  useOutsideAlerter(collapseRef, closeMenu, isNavCollapsed);
  
  return (
    <>
      <LogoutConfirmationModal
        isOpen={isLogoutConfirmOpen}
        onClose={handleCloseModal}
        onConfirm={handleLogout}
        isClosing={isModalClosing}
      />

      {!isNavCollapsed && <div className={`mobile-menu-backdrop ${isClosing ? 'exiting' : ''}`} onClick={closeMenu}></div>}

      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/" onClick={closeMenu}>
            <img src={logo} alt="Logo AfroConnection" className="logo" /> AfroConnection
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            onClick={handleToggle}
            aria-expanded={!isNavCollapsed}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${!isNavCollapsed ? 'show' : ''} ${isClosing ? 'exiting' : ''}`} id="navbarNav" ref={collapseRef}>
            <div className="mobile-menu-header">
                <span>Navegação</span>
                <button className="btn-close btn-close-white" onClick={closeMenu}></button>
            </div>
            <ul className="navbar-nav ms-auto align-items-center">
              
              <li className="nav-item">
                <NavLink className="nav-link" to="/cultura" onClick={closeMenu}><i className="bi bi-book me-1"></i>Cultura</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/bem-estar" onClick={closeMenu}><i className="bi bi-heart me-1"></i>Bem-estar Mental</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/capacitacoes" onClick={closeMenu}><i className="bi bi-mortarboard me-1"></i>Capacitações</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/oportunidades" onClick={closeMenu}><i className="bi bi-briefcase me-1"></i>Oportunidades</NavLink>
              </li>
              
              {isAuthenticated ? (
                  <li className="nav-item ms-lg-2 mt-3 mt-lg-0">
                      <UserMenu user={user} onLogoutClick={() => setIsLogoutConfirmOpen(true)} isAdmin={isAdmin} />
                  </li>
              ) : (
                  <li className="nav-item ms-lg-2 mt-3 mt-lg-0">
                      <NavLink to="/login" className="btn btn-outline-light login-btn" onClick={closeMenu}><i className="bi bi-person me-1"></i>Login | Cadastro</NavLink>
                  </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
