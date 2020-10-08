import buildClient from '../api/build-client';

const Index = ({ currentUser }) => {
  console.log(currentUser);
  return <div>Landing Page </div>;
};

Index.getInitialProps = async (context) => {
  const response = await buildClient(context).get('/api/users/currentuser');
  return response.data;
};

export default Index;
