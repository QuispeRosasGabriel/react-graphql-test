import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px dashed white;
  font-size: 14px;
  padding: 20px;
  margin-bottom: 20px;
  max-width: 300px;
`;

const Title = styled.span`
  font-size: 16px;
  font-weight: 600;
  text-transform: capitalize;
  margin-bottom: 4px;
`;

const Description = styled.span`
  color: #cccac4;
`;

const Topic = ({ id, name, starGazersCount, onClick, ...restProps }) => (
  <Container onClick={() => onClick && onClick()} {...restProps}>
    <Title>{name}</Title>
    <Description>Stargazers: {starGazersCount}</Description>
  </Container>
);

export default Topic;
