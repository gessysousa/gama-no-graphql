import React, { useState } from 'react';
import { ClientList } from '../components/ClientList';
import { ClientEdit } from '../components/ClientEdit';

export default function Home() {
  const [clientId, setClientId] = useState(null);

  return (
    <main>
      <ClientList onSelectClient={setClientId} />
      <ClientEdit clientId={clientId} />
    </main>
  );
}

/* <!DOCTYPE html> //documento original html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home - Exemplo de Cliente/Servidor</title>
</head>
<body>
    <h1>Home</h1>
</body>
</html> */