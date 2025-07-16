import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ToastNotification from '../components/ToastNotification';
import apiClient from '../services/api';
import '../styles/AccountSettingsPage.css';

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, isClosing }) {
    if (!isOpen) return null;

    return (
        <div className={`delete-modal-backdrop ${isClosing ? 'exiting' : ''}`}>
            <div className={`delete-modal-dialog ${isClosing ? 'exiting' : ''}`}>
                <h5>Excluir Conta</h5>
                <p>Esta ação é permanente e não pode ser desfeita. Todos os seus dados serão perdidos. Tem certeza?</p>
                <div className="delete-modal-actions">
                    <button onClick={onClose} className="btn btn-secondary">Cancelar</button>
                    <button onClick={onConfirm} className="btn btn-danger">Sim, Excluir</button>
                </div>
            </div>
        </div>
    );
}

function AccountSettingsPage() {
    // Pega a nova função 'updateUserProfile' do contexto
    const { user, logout, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    
    // Estados para os formulários e feedback
    const [nickname, setNickname] = useState(user?.nickname || '');
    const [imageFile, setImageFile] = useState(null);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [notification, setNotification] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Estados para o modal de exclusão
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isModalClosing, setIsModalClosing] = useState(false);

    if (!user) {
        return <p className="text-center p-5">Você precisa estar logado para ver esta página.</p>;
    }
    
    const showNotification = (message) => {
        setNotification(message);
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        let newImageUrl = user.profilePicture;

        // Se um novo ficheiro de imagem foi selecionado, faz o upload
        if (imageFile) {
            try {
                const uploadResponse = await apiClient.upload('/admin/upload', imageFile);
                newImageUrl = uploadResponse.url;
            } catch (error) {
                showNotification('Erro ao fazer upload da imagem.', 'error');
                setIsSubmitting(false);
                return;
            }
        }

        console.log("Atualizando perfil com:", { nickname, profilePicture: newImageUrl });
        
        updateUserProfile({
            nickname: nickname,
            profilePicture: newImageUrl
        });

        showNotification('Perfil atualizado com sucesso!');
        setImageFile(null);
        setIsSubmitting(false);
    };

    const handleChangePassword = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (newPassword.length < 6) {
            newErrors.password = "A nova senha deve ter no mínimo 6 caracteres.";
        }
        if (newPassword !== confirmPassword) {
            newErrors.passwordConfirm = "As senhas não coincidem.";
        }
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        showNotification('Senha alterada com sucesso!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };
    
    const handleDeleteAccount = () => {
        setIsModalClosing(true);
        setTimeout(() => {
            logout();
            navigate('/');
            alert('Conta excluída com sucesso. (simulação)'); 
        }, 300);
    };

    const openDeleteModal = () => setIsDeleteModalOpen(true);
    const closeDeleteModal = () => {
        setIsModalClosing(true);
        setTimeout(() => {
            setIsDeleteModalOpen(false);
            setIsModalClosing(false);
        }, 300);
    };

    return (
        <div className="account-settings-container container py-5">
            {notification && (
                <ToastNotification 
                    message={notification} 
                    onClose={() => setNotification('')}
                />
            )}

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onConfirm={handleDeleteAccount}
                isClosing={isModalClosing}
            />

            <h2 className="mb-5 text-center">Gerenciar Conta</h2>
            
            <div className="row">
                <div className="col-lg-8 mx-auto">
                    {/* Card de Informações do Perfil */}
                    <div className="card settings-card mb-4">
                        <div className="card-header">
                            <h5>Informações do Perfil</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleProfileUpdate}>
                                <div className="d-flex align-items-center mb-4">
                                    <img src={user.profilePicture} alt="Perfil" className="settings-profile-pic" />
                                    <div className="ms-3">
                                        <h5 className="card-title mb-1">{user.name}</h5>
                                        {/* Input de ficheiro para alterar a foto */}
                                        <label htmlFor="profile-pic-upload" className="btn btn-sm btn-outline-secondary">Alterar foto</label>
                                        <input 
                                            id="profile-pic-upload"
                                            type="file" 
                                            accept="image/*"
                                            onChange={(e) => setImageFile(e.target.files[0])}
                                            style={{ display: 'none' }}
                                        />
                                        {imageFile && <span className="ms-2 text-muted small">{imageFile.name}</span>}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="nickname" className="form-label">Apelido (Nickname)</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="nickname" 
                                        value={nickname}
                                        onChange={(e) => setNickname(e.target.value)}
                                        placeholder="Como você quer ser chamado?"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                    {isSubmitting ? <span className="spinner-border spinner-border-sm"></span> : 'Salvar Alterações'}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Card para Mudar a Senha */}
                    <div className="card settings-card mb-4">
                        <div className="card-header">
                            <h5>Alterar Senha</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleChangePassword}>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="currentPassword">Senha Atual</label>
                                    <input type="password" id="currentPassword" className="form-control" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="newPassword">Nova Senha</label>
                                    <input type="password" id="newPassword" className={`form-control ${errors.password ? 'is-invalid' : ''}`} value={newPassword} onChange={e => setNewPassword(e.target.value)} required/>
                                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="confirmPassword">Confirmar Nova Senha</label>
                                    <input type="password" id="confirmPassword" className={`form-control ${errors.passwordConfirm ? 'is-invalid' : ''}`} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required/>
                                    {errors.passwordConfirm && <div className="invalid-feedback">{errors.passwordConfirm}</div>}
                                </div>
                                <button type="submit" className="btn btn-primary">Alterar Senha</button>
                            </form>
                        </div>
                    </div>

                    {/* Card de Zona de Perigo */}
                    <div className="card settings-card border-danger">
                        <div className="card-header bg-danger text-white">
                            <h5>Zona de Perigo</h5>
                        </div>
                        <div className="card-body">
                            <p>A exclusão da sua conta é uma ação permanente e não pode ser desfeita. Todos os seus dados serão removidos.</p>
                            <button className="btn btn-danger" onClick={openDeleteModal}>Excluir Minha Conta</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountSettingsPage;
