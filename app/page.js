export async function getKVData() {
  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/storage/kv/namespaces/${process.env.KV_SHOES_NAMESPACE}/values/shoes`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
      'Content-Type': 'application/json',
    }
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error('Parse error:', text);
    throw e;
  }
}

export default async function Home() {
  try {
    const shoes = await getKVData();
    return (
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">Comparateur de Chaussures</h1>
        <div className="bg-gray-100 p-4 rounded">
          <pre>{JSON.stringify(shoes, null, 2)}</pre>
        </div>
      </main>
    );
  } catch (error) {
    return (
      <main className="p-4">
        <h1 className="text-xl text-red-600">Erreur</h1>
        <p>{error.message}</p>
      </main>
    );
  }
}
