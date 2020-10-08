import buildClient from '../api/build-client';

const Index = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in </h1>
  ) : (
    <h1>Please Sign in first</h1>
  );
};

Index.getInitialProps = async (context) => {
  const response = await buildClient(context).get('/api/users/currentuser');
  return response.data;
};

export default Index;
