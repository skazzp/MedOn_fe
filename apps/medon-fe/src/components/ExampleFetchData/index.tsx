import { useGetUsersDataQuery } from 'redux/features/fetchData/fetchData';
import { Container } from './styles';

const ExampleFetchQuery = () => {
  const { data, isLoading, isError } = useGetUsersDataQuery('');

  if (isError) {
    return <Container>Error</Container>;
  }

  if (isLoading) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <h1>ExampleFetchQuery</h1>
      {data?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </Container>
  );
};

export default ExampleFetchQuery;
