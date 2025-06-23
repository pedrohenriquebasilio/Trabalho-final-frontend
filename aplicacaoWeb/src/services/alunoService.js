import api from './api';

// Buscar todos os alunos
export const buscarAlunos = () => api.get('/alunos');

// Cadastrar novo aluno
export const cadastrarAluno = (dados) => api.post('/alunos', dados);

// Atualizar aluno
export const atualizarAluno = (id, dados) => api.put(`/alunos/${id}`, dados);

// Excluir aluno
export const excluirAluno = (id) => api.delete(`/alunos/${id}`);
