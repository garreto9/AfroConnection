import React, { useState } from 'react';
import ToastNotification from '../components/ToastNotification'; 

// Simulação dos dados iniciais de cursos
const initialCourses = [
    { id: 1, title: 'Desenvolvimento Web', category: 'Tecnologia', description: 'Aprenda HTML, CSS e JavaScript do zero ao avançado.' },
    { id: 2, title: 'Gestão de Negócios', category: 'Negócios', description: 'Fundamentos de administração e empreendedorismo.' },
    { id: 3, title: 'Marketing Digital', category: 'Marketing', description: 'Estratégias para divulgar seus produtos ou serviços na internet.' }
];

function ManageCoursesPage() {
  const [courses, setCourses] = useState(initialCourses);
  
  // Estados para os campos do formulário
  const [editingCourse, setEditingCourse] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  // 2. Novos estados para as notificações e erros de formulário
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [formErrors, setFormErrors] = useState({});

  // Função para mostrar a notificação
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  // Função para validar o formulário
  const validateForm = () => {
    const errors = {};
    if (!title.trim()) errors.title = 'O título do curso é obrigatório.';
    if (!category.trim()) errors.category = 'A categoria é obrigatória.';
    if (!description.trim()) errors.description = 'A descrição é obrigatória.';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const resetForm = () => {
    setEditingCourse(null);
    setTitle('');
    setCategory('');
    setDescription('');
    setFormErrors({});
  };

  // Lida com o envio do formulário (Adicionar ou Editar)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingCourse) {
      const updatedCourses = courses.map(course => 
        course.id === editingCourse.id ? { ...course, title, category, description } : course
      );
      setCourses(updatedCourses);
      showNotification('Curso atualizado com sucesso!');
    } else {
      const newCourse = {
        id: Date.now(),
        title,
        category,
        description
      };
      setCourses([...courses, newCourse]);
      showNotification('Novo curso adicionado com sucesso!');
    }
    
    resetForm();
  };

  // Prepara o formulário para edição
  const handleEdit = (course) => {
    setEditingCourse(course);
    setTitle(course.title);
    setCategory(course.category);
    setDescription(course.description);
    setFormErrors({});
  };

  // Exclui um curso
  const handleDelete = (courseId) => {
    if (window.confirm('Tem certeza que deseja excluir este curso?')) {
        const updatedCourses = courses.filter(course => course.id !== courseId);
        setCourses(updatedCourses);
        showNotification('Curso excluído com sucesso!', 'error');
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
            <input 
                type="text" 
                className={`form-control ${formErrors.title ? 'is-invalid' : ''}`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            {formErrors.title && <div className="invalid-feedback">{formErrors.title}</div>}
        </div>
        <div className="mb-3">
            <label className="form-label">Categoria</label>
            <input 
                type="text" 
                className={`form-control ${formErrors.category ? 'is-invalid' : ''}`}
                placeholder="Ex: Tecnologia, Negócios..." 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            {formErrors.category && <div className="invalid-feedback">{formErrors.category}</div>}
        </div>
        <div className="mb-3">
            <label className="form-label">Descrição Curta</label>
            <textarea 
                className={`form-control ${formErrors.description ? 'is-invalid' : ''}`}
                rows="3" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {formErrors.description && <div className="invalid-feedback">{formErrors.description}</div>}
        </div>
        <div className="d-flex align-items-center mt-2">
            <button type="submit" className="btn btn-primary align-self-start">
                {editingCourse ? 'Salvar Alterações' : 'Salvar Novo Curso'}
            </button>
            {editingCourse && (
                <button type="button" className="btn btn-secondary ms-2" onClick={resetForm}>
                    Cancelar Edição
                </button>
            )}
        </div>
      </form>

      <hr className="my-4"/>

      <h5>Cursos Existentes</h5>
      <ul className="list-group">
        {courses.map(course => (
          <li key={course.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{course.title} - <strong>{course.category}</strong></span>
            <div>
              <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => handleEdit(course)}>Editar</button>
              <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(course.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageCoursesPage;
