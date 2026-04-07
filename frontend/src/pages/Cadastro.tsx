import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import api from '../services/api';

const Form = styled.form` display: flex; flex-direction: column; max-width: 400px; margin: 20px auto; gap: 15px; `;
const Input = styled.input` padding: 10px; border: 1px solid #ccc; border-radius: 5px; `;
const Botao = styled.button` padding: 10px; background: #27ae60; color: white; border: none; border-radius: 5px; cursor: pointer; `;

function Cadastro() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formulario, setFormulario] = useState({
    brinco: '', nome: '', raca: '', peso: '', data_nascimento: ''
  });
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (id) {
      api.get(`/vacas/${id}`).then(res => {
        const dataFormatada = res.data.data_nascimento.split('T')[0];
        setFormulario({ ...res.data, data_nascimento: dataFormatada });
      }).catch(() => setErro('Erro ao buscar dados para edição.'));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/vacas/${id}`, formulario);
        alert('Dados atualizados com sucesso!');
      } else {
        await api.post('/vacas', formulario);
        alert('Vaca cadastrada com sucesso!');
      }
      navigate('/');
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.erro) {
        setErro(error.response.data.erro);
      } else {
        setErro('Erro inesperado ao conectar com o servidor.');
      }
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>{id ? 'Editar Vaca' : 'Cadastrar Nova Vaca'}</h2>
      {erro && <p style={{ color: 'red', textAlign: 'center' }}>{erro}</p>}
      
      <Form onSubmit={handleSubmit}>
        <Input name="brinco" placeholder="Nº do Brinco" value={formulario.brinco} onChange={handleChange} required />
        <Input name="nome" placeholder="Nome" value={formulario.nome} onChange={handleChange} required />
        <Input name="raca" placeholder="Raça" value={formulario.raca} onChange={handleChange} required />
        <Input name="peso" type="number" step="0.01" placeholder="Peso (Kg)" value={formulario.peso} onChange={handleChange} required />
        <Input name="data_nascimento" type="date" value={formulario.data_nascimento} onChange={handleChange} required />
        <Botao type="submit">Salvar</Botao>
        <Botao type="button" onClick={() => navigate('/')} style={{ background: '#95a5a6' }}>Cancelar</Botao>
      </Form>
    </div>
  );
}

export default Cadastro;