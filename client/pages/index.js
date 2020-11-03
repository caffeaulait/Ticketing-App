const { default: Link } = require('next/link');

const Index = ({ currentUser, tickets }) => {
  return (
    <div>
      <h1>Tickets</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((el) => {
            return (
              <tr key={el.id}>
                <td>{el.title}</td>
                <td>{el.price}</td>
                <td>
                  <Link href='tickets/[ticketId]' as={`/tickets/${el.id}`}>
                    <a>View</a>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

Index.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/tickets');
  return { tickets: data };
};

export default Index;
