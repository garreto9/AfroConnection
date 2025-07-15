import React, { useState, useEffect, useCallback } from 'react';
import apiClient from '../services/api';
import ToastNotification from '../components/ToastNotification';

function ManageJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estados para os campos do formulário
  const [editingJob, setEditingJob] = useState(null);
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [tags, setTags] = useState('');
  const [link, setLink] = useState('');

  // Estados para feedback
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [formErrors, setFormErrors] = useState({});

  // Função para buscar as vagas da API
  const fetchJobs = useCallback(async () => {
    try {
        setLoading(true);
        const data = await apiClient.get('/oportunidades');
        setJobs(data);
    } catch (error) {
        showNotification('Erro ao carregar vagas.', 'error');
    } finally {
        setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  const validateForm = () => {
    const errors = {};
    if (!title.trim()) errors.title = 'O título é obrigatório.';
    if (!company.trim()) errors.company = 'A empresa é obrigatória.';
    if (!location.trim()) errors.location = 'A localização é obrigatória.';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const resetForm = () => {
    setEditingJob(null);
    setTitle('');
    setCompany('');
    setLocation('');
    setTags('');
    setLink('');
    setFormErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const jobData = { title, company, location, tags, link };

    try {
        if (editingJob) {
            // Lógica de ATUALIZAÇÃO com API
            await apiClient.put(`/admin/vagas/${editingJob.id}`, jobData);
            showNotification('Vaga atualizada com sucesso!');
        } else {
            // Lógica de ADIÇÃO com API
            await apiClient.post('/admin/vagas', jobData);
            showNotification('Nova vaga adicionada com sucesso!');
        }
        resetForm();
        fetchJobs(); // Atualiza a lista de vagas
    } catch (error) {
        showNotification(`Erro ao salvar a vaga: ${error.message}`, 'error');
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setTitle(job.title);
    setCompany(job.company);
    setLocation(job.location);
    setTags(job.tags || ''); // Usa as tags existentes ou uma string vazia
    setLink(job.link || '');
  };

  const handleDelete = async (jobId) => {
    if (window.confirm('Tem certeza que deseja excluir esta vaga?')) {
        try {
            await apiClient.delete(`/admin/vagas/${jobId}`);
            showNotification('Vaga excluída com sucesso!', 'error');
            fetchJobs(); // Atualiza a lista
        } catch (error) {
            showNotification('Erro ao excluir a vaga.', 'error');
        }
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

      <h4 className="mb-4">{editingJob ? 'Editando Vaga' : 'Adicionar Nova Vaga'}</h4>
      <form onSubmit={handleSubmit} className="card p-3 mb-4" noValidate>
        <div className="mb-3">
            <label className="form-label">Título da Vaga</label>
            <input type="text" className={`form-control ${formErrors.title ? 'is-invalid' : ''}`} value={title} onChange={(e) => setTitle(e.target.value)} />
            {formErrors.title && <div className="invalid-feedback">{formErrors.title}</div>}
        </div>
        <div className="mb-3">
            <label className="form-label">Empresa</label>
            <input type="text" className={`form-control ${formErrors.company ? 'is-invalid' : ''}`} value={company} onChange={(e) => setCompany(e.target.value)} />
            {formErrors.company && <div className="invalid-feedback">{formErrors.company}</div>}
        </div>
        <div className="mb-3">
            <label className="form-label">Localização</label>
            <input type="text" className={`form-control ${formErrors.location ? 'is-invalid' : ''}`} value={location} onChange={(e) => setLocation(e.target.value)} />
            {formErrors.location && <div className="invalid-feedback">{formErrors.location}</div>}
        </div>
        <div className="mb-3">
            <label className="form-label">Tags (separadas por vírgula)</label>
            <input type="text" className="form-control" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Ex: SQL, Tecnologia, Liderança"/>
        </div>
        <div className="mb-3">
            <label className="form-label">Link da Vaga</label>
            <input type="url" className="form-control" value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://..."/>
        </div>
        <div className="d-flex align-items-center mt-2">
            <button type="submit" className="btn btn-primary align-self-start">
                {editingJob ? 'Salvar Alterações' : 'Salvar Nova Vaga'}
            </button>
            {editingJob && (
                <button type="button" className="btn btn-secondary ms-2" onClick={resetForm}>
                    Cancelar Edição
                </button>
            )}
        </div>
      </form>

      <hr className="my-4"/>

      <h5>Vagas Existentes</h5>
      {loading ? <p>A carregar...</p> : (
        <ul className="list-group">
            {jobs.map(job => (
            <li key={job.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{job.title} - <strong>{job.company}</strong></span>
                <div>
                <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => handleEdit(job)}>Editar</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(job.id)}>Excluir</button>
                </div>
            </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default ManageJobsPage;
