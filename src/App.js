import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';

import { GET_TOPICS } from './services/gql/queries';
import Topic from './components/Topic';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  margin: 0;
  margin-bottom: 32px;

  span {
    text-transform: capitalize;
  }
`;

const App = () => {
  const [searchTerm, setSearchTerm] = useState(() => 'react');
  const [topics, setTopics] = useState(() => []);

  const { loading, error, data, refetch } = useQuery(GET_TOPICS, {
    variables: {
      name: searchTerm || 'react'
    }
  });

  useEffect(() => {
    if (data && data.topic && data.topic.relatedTopics) {
      console.log(data);
      setTopics(data.topic.relatedTopics);
    }
  }, [data]);

  const handleTopicClick = (name) => {
    setSearchTerm(name);
    refetch({
      name
    });
  };

  if (loading) return <p>Loading topics...</p>;

  if (error) return <p>Error! {error.message}</p>;

  return (
    <Container style={{ cursor: 'pointer' }}>
      <Title>
        Topics related to <span>{searchTerm}</span>
      </Title>
      {topics.map((topic) => (
        <Topic
          key={topic.id}
          name={topic.name}
          starGazersCount={topic.stargazerCount}
          onClick={() => handleTopicClick(topic.name)}
        />
      ))}
    </Container>
  );
};

export default App;
