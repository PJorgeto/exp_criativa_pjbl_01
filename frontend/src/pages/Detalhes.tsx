import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import api from '../services/api';
import type { Vaca } from './Listagem';

const Card = styled.div` background: #f9f9f9; padding: 20px; border-radius: 8px; max-width: 400px; margin: 20px auto; box-shadow: 0 2px 4px rgba(0,0,0,0.1); `;

function Detalhes() {
  const { id } = useParams();
  const [vaca, setVaca] = useState<Vaca | null>(null);

  useEffect(() => {
    api.get(`/vacas/${id}`).then(res => setVaca(res.data));
  }, [id]);

  if (!vaca) return <p style={{ textAlign: 'center' }}>Carregando detalhes...</p>;

  const dataFormatada = new Date(vaca.data_nascimento).toLocaleDateString('pt-BR');

  return (
    <Card>
      <h2>Detalhes da Vaca</h2>
      <p><strong>Brinco:</strong> {vaca.brinco}</p>
      <p><strong>Nome:</strong> {vaca.nome}</p>
      <p><strong>Raça:</strong> {vaca.raca}</p>
      <p><strong>Peso:</strong> {vaca.peso} kg</p>
      <p><strong>Data de Nascimento:</strong> {dataFormatada}</p>
      
      <Link to="/" style={{ display: 'block', marginTop: '20px', color: '#3498db' }}> Voltar para a lista</Link>
    </Card>
  );
}

export default Detalhes;