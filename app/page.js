export async function getShoes() {
  const KV = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/storage/kv/namespaces/${process.env.KV_SHOES_NAMESPACE}/values/shoes`, {
    headers: {
      'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
    }
  });
  
  const data = await KV.text();
  return JSON.parse(data);
}

export default async function Home() {
  try {
    const shoes = await getShoes();
    return (
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">Comparateur de Chaussures</h1>
        <div className="bg-gray-100 p-4 rounded">
          <pre>{JSON.stringify(shoes, null, 2)}</pre>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error:', error);
    return (
      <main className="p-4">
        <h1>Erreur de chargement</h1>
        <p>{error.message}</p>
      </main>
    );
  }
}
