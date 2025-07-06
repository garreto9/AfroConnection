import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ToastNotification from '../components/ToastNotification';
import '../styles/LoginPage.css';

function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Estados para os inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Estados para feedback de UX
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [notification, setNotification] = useState({ message: '', type: '' });

  const togglePanel = () => {
    setIsSignUp(!isSignUp);
    setFormErrors({});
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  const validateSignUp = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name.trim()) errors.name = "O nome é obrigatório.";
    if (!emailRegex.test(email)) errors.email = "Formato de e-mail inválido.";
    if (password.length < 6) errors.password = "A senha deve ter no mínimo 6 caracteres.";
    if (password !== confirmPassword) errors.confirmPassword = "As senhas não coincidem.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormErrors({});
    
    if (!email || !password) {
        setFormErrors({ general: "Por favor, preencha o e-mail e a senha." });
        return;
    }

    setLoading(true);
    const result = await login(email, password); // Chama a função do AuthContext
    setLoading(false);

    if (result.success) {
      navigate('/'); // Redireciona para a home em caso de sucesso
    } else {
      // Exibe a mensagem de erro retornada pelo contexto (ex: "Email ou senha inválidos.")
      setFormErrors({ general: result.message || 'Ocorreu um erro. Tente novamente.' });
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setFormErrors({});
    if (validateSignUp()) {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome: name, email, senha: password })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Falha ao criar a conta.');
            }

            showNotification('Conta criada com sucesso! Por favor, faça o login.');
            setIsSignUp(false);
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            setFormErrors({ general: error.message });
        } finally {
            setLoading(false);
        }
    }
  }

  return (
    <div className="login-app">
      {notification.message && (
        <ToastNotification 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification({ message: '', type: '' })}
        />
      )}

      <Link to="/" className="back-home-link" aria-label="Voltar para a página inicial">
        <i className="bi bi-x-lg"></i>
      </Link>

      <div className={`login-container ${isSignUp ? 'right-panel-active' : ''}`}>
        {/* Sign Up Form */}
        <div className="form-container sign-up-container">
          <form className="form" onSubmit={handleSignUp} noValidate>
            <h1 className="form-title">Criar Conta</h1>
            {formErrors.general && <div className="invalid-feedback-form d-block mb-2">{formErrors.general}</div>}

            <input className={`form-input ${formErrors.name ? 'is-invalid' : ''}`} type="text" placeholder="Nome Completo" value={name} onChange={e => setName(e.target.value)} />
            {formErrors.name && <div className="invalid-feedback-form">{formErrors.name}</div>}
            
            <input className={`form-input ${formErrors.email ? 'is-invalid' : ''}`} type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            {formErrors.email && <div className="invalid-feedback-form">{formErrors.email}</div>}

            <input className={`form-input ${formErrors.password ? 'is-invalid' : ''}`} type="password" placeholder="Senha (mín. 6 caracteres)" value={password} onChange={e => setPassword(e.target.value)} />
            {formErrors.password && <div className="invalid-feedback-form">{formErrors.password}</div>}

            <input className={`form-input ${formErrors.confirmPassword ? 'is-invalid' : ''}`} type="password" placeholder="Confirmar Senha" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            {formErrors.confirmPassword && <div className="invalid-feedback-form">{formErrors.confirmPassword}</div>}

            <button className="form-button mt-3" type="submit" disabled={loading}>
                {loading && isSignUp ? <span className="spinner-border spinner-border-sm"></span> : 'Cadastrar'}
            </button>
            <button type="button" className="mobile-toggle-panel" onClick={togglePanel}>
              Já tem uma conta? Entre
            </button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in-container">
          <form className="form" onSubmit={handleLogin} noValidate>
            <h1 className="form-title">Entrar</h1>
            {formErrors.general && <div className="invalid-feedback-form d-block mb-2">{formErrors.general}</div>}
            <input className="form-input" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input className="form-input" type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
            <a className="form-link" href="#">Esqueceu sua senha?</a>
            <button className="form-button" type="submit" disabled={loading}>
              {loading && !isSignUp ? <span className="spinner-border spinner-border-sm"></span> : 'Entrar'}
            </button>
            <button type="button" className="mobile-toggle-panel" onClick={togglePanel}>
              Não tem uma conta? Cadastre-se
            </button>
          </form>
        </div>

        {/* Overlay Container */}
        <div className="overlay-container">
            <div className="overlay">
                <div className="overlay-panel overlay-left">
                    <h1 className="overlay-title">Bem-vindo de volta!</h1>
                    <p className="overlay-text">
                        Para manter-se conectado conosco, faça login com suas informações pessoais
                    </p>
                    <button className="overlay-button" onClick={togglePanel}>
                        Entrar
                    </button>
                </div>
                <div className="overlay-panel overlay-right">
                    <h1 className="overlay-title">Olá, Amigo!</h1>
                    <p className="overlay-text">
                        Comece sua jornada conosco criando uma conta com seus dados pessoais
                    </p>
                    <button className="overlay-button" onClick={togglePanel}>
                        Cadastrar
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;