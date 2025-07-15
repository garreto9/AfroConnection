import React, { useState, useEffect, useCallback } from 'react';
import apiClient from '../services/api';
import ToastNotification from '../components/ToastNotification';

function ManageCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estados para o formulário
  const [editingCourse, setEditingCourse] = useState(null);
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [detalhes, setDetalhes] = useState('');
  const [imagem, setImagem] = useState('');
  const [imageFile, setImageFile] = useState(null);
  // Estados para feedback
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Função para buscar os cursos da API
  const fetchCourses = useCallback(async () => {
    try {
        setLoading(true);
        const data = await apiClient.get('/capacitacoes');
        setCourses(data);
    } catch (error) {
        showNotification('Erro ao carregar cursos.', 'error');
    } finally {
        setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  const validateForm = () => {
    const errors = {};
    if (!nome.trim()) errors.nome = 'O título do curso é obrigatório.';
    if (!categoria.trim()) errors.categoria = 'A categoria é obrigatória.';
    if (!descricao.trim()) errors.descricao = 'A descrição é obrigatória.';
    
    if (!editingCourse && !imageFile) {
        errors.imagem = 'A imagem do curso é obrigatória.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const resetForm = () => {
    setEditingCourse(null);
    setNome('');
    setCategoria('');
    setDescricao('');
    setDetalhes('');
    setImagem('');
    setImageFile(null);
    setFormErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    let imageUrl = imagem;

    if (imageFile) {
        try {
            const uploadResponse = await apiClient.upload('/admin/upload', imageFile);
            imageUrl = uploadResponse.url;
        } catch (error) {
            showNotification('Erro ao fazer upload da imagem.', 'error');
            setIsSubmitting(false);
            return;
        }
    }

    const courseData = { nome, categoria, descricao, detalhes, imagem: imageUrl };

    try {
        if (editingCourse) {
            // Lógica de ATUALIZAÇÃO com API
            await apiClient.put(`/admin/cursos/${editingCourse.id}`, courseData);
            showNotification('Curso atualizado com sucesso!');
        } else {
            // Lógica de ADIÇÃO com API
            await apiClient.post('/admin/cursos', courseData);
            showNotification('Novo curso adicionado com sucesso!');
        }
        resetForm();
        fetchCourses();
    } catch (error) {
        showNotification(`Erro ao salvar o curso: ${error.message}`, 'error');
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setNome(course.nome);
    setCategoria(course.categoria);
    setDescricao(course.descricao);
    setDetalhes(course.detalhes || '');
    setImagem(course.imagem || '');
    setImageFile(null);
    setFormErrors({});
  };

  const handleDelete = async (courseId) => {
    if (window.confirm('Tem certeza que deseja excluir este curso?')) {
        try {
            await apiClient.delete(`/admin/cursos/${courseId}`);
            showNotification('Curso excluído com sucesso!', 'error');
            fetchCourses();
        } catch (error) {
            showNotification('Erro ao excluir o curso.', 'error');
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

      <h4 className="mb-4">{editingCourse ? 'Editando Curso' : 'Adicionar Novo Curso'}</h4>
      <form onSubmit={handleSubmit} className="card p-3 mb-4" noValidate>
        <div className="mb-3">
            <label className="form-label">Título do Curso</label>
            <input type="text" className={`form-control ${formErrors.nome ? 'is-invalid' : ''}`} value={nome} onChange={(e) => setNome(e.target.value)} />
            {formErrors.nome && <div className="invalid-feedback">{formErrors.nome}</div>}
        </div>
        <div className="mb-3">
            <label className="form-label">Categoria</label>
            <input type="text" className={`form-control ${formErrors.categoria ? 'is-invalid' : ''}`} value={categoria} onChange={(e) => setCategoria(e.target.value)} placeholder="Ex: Tecnologia, Negócios..."/>
            {formErrors.categoria && <div className="invalid-feedback">{formErrors.categoria}</div>}
        </div>
        <div className="mb-3">
            <label className="form-label">Descrição Curta</label>
            <textarea className={`form-control ${formErrors.descricao ? 'is-invalid' : ''}`} rows="3" value={descricao} onChange={(e) => setDescricao(e.target.value)}></textarea>
            {formErrors.descricao && <div className="invalid-feedback">{formErrors.descricao}</div>}
        </div>
        
        <div className="mb-3">
            <label className="form-label">Imagem do Curso</label>
            <input 
                type="file" 
                className={`form-control ${formErrors.imagem ? 'is-invalid' : ''}`}
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
            />
            {formErrors.imagem && <div className="invalid-feedback">{formErrors.imagem}</div>}
            {editingCourse && imagem && (
                <div className="mt-2">
                    <small>Imagem atual:</small>
                    <img src={imagem} alt="Preview" style={{ width: '100px', height: 'auto', display: 'block', marginTop: '5px', borderRadius: '5px' }} />
                </div>
            )}
        </div>

        <div className="mb-3">
            <label className="form-label">Detalhes (separados por ponto e vírgula)</label>
            <input type="text" className="form-control" value={detalhes} onChange={(e) => setDetalhes(e.target.value)} placeholder="Ex: 60 horas;Certificado;Online"/>
        </div>
        
        <div className="d-flex align-items-center mt-2">
            <button type="submit" className="btn btn-primary align-self-start" disabled={isSubmitting}>
                {isSubmitting ? <span className="spinner-border spinner-border-sm"></span> : (editingCourse ? 'Salvar Alterações' : 'Salvar Novo Curso')}
            </button>
            {editingCourse && (
                <button type="button" className="btn btn-secondary ms-2" onClick={resetForm} disabled={isSubmitting}>
                    Cancelar Edição
                </button>
            )}
        </div>
      </form>

      <hr className="my-4"/>

      <h5>Cursos Existentes</h5>
      {loading ? <p>A carregar...</p> : (
        <ul className="list-group">
            {courses.map(course => (
            <li key={course.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{course.nome} - <strong>{course.categoria}</strong></span>
                <div>
                <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => handleEdit(course)}>Editar</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(course.id)}>Excluir</button>
                </div>
            </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default ManageCoursesPage;
