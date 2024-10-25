import Link from "next/link";

function ClientsPage(): JSX.Element {
  const clients = [
    { id: "max", name: "Maximilian" },
    { id: "manu", name: "Manuel" },
  ];

  return (
    <div>
      <h1>The Clients Page</h1>
      <ul>
        {clients.map(
          (client: { id: string; name: string }): JSX.Element => (
            <li key={client.id}>
              <Link
                href={`/clients/${client.id}`} //* V1
                // href={{
                //   pathname: "/clients/[id]", //* V2
                //   query: { id: client.id },
                // }}
              >
                {client.name}
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default ClientsPage;
