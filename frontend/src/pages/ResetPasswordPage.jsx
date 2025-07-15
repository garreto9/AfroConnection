import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import apiClient from '../services/api';
import ToastNotification from '../components/ToastNotification';
import '../styles/ForgotPasswordPage.css'; 

function ResetPasswordPage() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [notification, setNotification] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (newPassword.length < 6) {
            setError("A nova senha deve ter no mínimo 6 caracteres.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("As senhas não coincidem.");
            return;
        }

        setLoading(true);
        try {
            await apiClient.post('/auth/reset-password', { token, newPassword });
            
            setNotification('Senha redefinida com sucesso! Você já pode fazer o login.');
            setTimeout(() => {
                navigate('/login');
            }, 3000);

        } catch (err) {
            setError(err.message || 'Ocorreu um erro. O link pode ser inválido ou ter expirado.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-password-container">
            {notification && (
                <ToastNotification 
                    message={notification} 
                    onClose={() => setNotification('')}
                />
            )}
            <div className="forgot-password-box">
                <h3 className="mb-3">Redefinir Senha</h3>
                <p className="text-muted mb-4">
                    Crie uma nova senha para a sua conta.
                </p>
                
                <form onSubmit={handleSubmit}>
                    {error && <div className="alert alert-danger p-2 small">{error}</div>}
                    <div className="mb-3">
                        <label htmlFor="newPassword">Nova Senha</label>
                        <input
                            type="password"
                            id="newPassword"
                            className="form-control"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword">Confirmar Nova Senha</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? <span className="spinner-border spinner-border-sm"></span> : 'Salvar Nova Senha'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPasswordPage;
