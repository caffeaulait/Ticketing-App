

const Index = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in </h1>
  ) : (
    <h1>Please Sign in first</h1>
  );
};

Index.getInitialProps = async (context) => {
  return {};
};

export default Index;
