import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import api from '../services/api';

export interface Vaca {
  id: number;
  brinco: string;
  nome: string;
  raca: string;
  peso: number;
  data_nascimento: string;
}

const Container = styled.div` padding: 20px; `;
const Tabela = styled.table` width: 100%; border-collapse: collapse; margin-top: 20px; `;
const Th = styled.th` background: #ecf0f1; padding: 10px; border: 1px solid #ddd; `;
const Td = styled.td` padding: 10px; border: 1px solid #ddd; text-align: center; `;
const Botao = styled.button` padding: 5px 10px; margin: 0 5px; cursor: pointer; `;
const BotaoNovo = styled(Link)` display: inline-block; padding: 10px 15px; background: #27ae60; color: white; text-decoration: none; border-radius: 5px; `;

function Listagem() {
  const [vacas, setVacas] = useState<Vaca[]>([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    carregarVacas();
  }, []);

  async function carregarVacas() {
    try {
      const response = await api.get('/vacas');
      setVacas(response.data);
    } catch (error) {
      setErro('Erro ao carregar a lista de vacas. Verifique se o backend está rodando.');
    }
  }

  async function deletarVaca(id: number) {
    if (window.confirm('Tem certeza que deseja excluir esta vaca?')) {
      try {
        await api.delete(`/vacas/${id}`);
        carregarVacas();
      } catch (error) {
        alert('Erro ao excluir vaca.');
      }
    }
  }

  return (
    <Container>
      <h2>Rebanho Cadastrado</h2>
      <BotaoNovo to="/cadastro">Adicionar Nova Vaca</BotaoNovo>
      
      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      <Tabela>
        <thead>
          <tr>
            <Th>Brinco</Th>
            <Th>Nome</Th>
            <Th>Raça</Th>
            <Th>Ações</Th>
          </tr>
        </thead>
        <tbody>
          {vacas.map((vaca) => (
            <tr key={vaca.id}>
              <Td>{vaca.brinco}</Td>
              <Td>{vaca.nome}</Td>
              <Td>{vaca.raca}</Td>
              <Td>
                <Link to={`/detalhes/${vaca.id}`}><Botao>Detalhes</Botao></Link>
                <Link to={`/editar/${vaca.id}`}><Botao>Editar</Botao></Link>
                <Botao onClick={() => deletarVaca(vaca.id)} style={{ background: '#e74c3c', color: 'white' }}>Excluir</Botao>
              </Td>
            </tr>
          ))}
        </tbody>
      </Tabela>
    </Container>
  );
}

export default Listagem;