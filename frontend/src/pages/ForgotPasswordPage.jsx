import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/api';
import '../styles/ForgotPasswordPage.css';

function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        try {
            await apiClient.post('/auth/forgot-password', { email });
            setMessage('Se existir uma conta com este e-mail, um link de recuperação foi enviado.');
        } catch (err) {
            setMessage('Se existir uma conta com este e-mail, um link de recuperação foi enviado.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-box">
                <h3 className="mb-3">Recuperar Senha</h3>
                <p className="text-muted mb-4">
                    Insira o seu e-mail e enviaremos um link para redefinir a sua senha.
                </p>
                
                {message ? (
                    <div className="alert alert-success">{message}</div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                            {loading ? <span className="spinner-border spinner-border-sm"></span> : 'Enviar Link de Recuperação'}
                        </button>
                    </form>
                )}

                <div className="mt-4 text-center">
                    <Link to="/login">Voltar para o Login</Link>
                </div>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;
