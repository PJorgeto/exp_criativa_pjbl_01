import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #2c3e50;
  padding: 20px;
  color: white;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
`;

const Subtitle = styled.p`
  margin: 5px 0 0;
  font-size: 14px;
  color: #3498db;
`;

function Header() {
  return (
    <HeaderContainer>
      <Title>Sistema de Gestão Pecuária</Title>
      <Subtitle>Desenvolvido por Ângelo Piovezan Jorgeto</Subtitle>
    </HeaderContainer>
  );
}

export default Header;