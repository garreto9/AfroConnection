import React, { useState, useEffect, useCallback } from 'react';
import apiClient from '../services/api';
import ToastNotification from '../components/ToastNotification';

function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const fetchUsers = useCallback(async () => {
    try {
        setLoading(true);
        const data = await apiClient.get('/admin/usuarios');
        setUsers(data);
    } catch (error) {
        showNotification('Erro ao carregar utilizadores.', 'error');
    } finally {
        setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  const handleResetPassword = (userName) => {
    if (window.confirm(`Tem certeza que deseja resetar a senha para o usuário ${userName}?`)) {
      showNotification(`Senha para ${userName} resetada com sucesso! (simulação)`);
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (window.confirm(`Tem certeza que deseja EXCLUIR o usuário ${userName}?`)) {
        try {
            await apiClient.delete(`/admin/usuarios/${userId}`);
            showNotification(`Utilizador ${userName} excluído com sucesso!`, 'error');
            fetchUsers();
        } catch (error) {
            showNotification('Erro ao excluir o utilizador.', 'error');
        }
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
        await apiClient.put(`/admin/usuarios/${userId}/role`, { role: newRole });
        showNotification('Cargo do utilizador alterado com sucesso!');
        fetchUsers();
    } catch (error) {
        showNotification('Erro ao alterar o cargo.', 'error');
    }
  };

  return (
    <div>
      {notification.message && (
        <ToastNotification 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification({ message: '', type: '' })}
        />
      )}
      <h4 className="mb-4">Gerenciar Usuários</h4>
      <div className="card">
        <div className="card-body">
            <p>Lista de todos os usuários cadastrados na plataforma.</p>
            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Cargo</th>
                            <th className="text-end">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="5" className="text-center p-4">A carregar...</td></tr>
                        ) : (
                            users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <select 
                                            className={`form-select form-select-sm ${user.role === 'admin' ? 'fw-bold text-success' : ''}`} 
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                            style={{ width: '120px' }}
                                        >
                                            <option value="user">Usuário</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>
                                    <td className="text-end">
                                        <button 
                                            className="btn btn-sm btn-outline-secondary me-2"
                                            onClick={() => handleResetPassword(user.name)}
                                        >
                                            Resetar Senha
                                        </button>
                                        <button 
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => handleDeleteUser(user.id, user.name)}
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ManageUsersPage;
