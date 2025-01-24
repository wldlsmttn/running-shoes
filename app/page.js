export async function getShoes() {
  const KV = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/storage/kv/namespaces/${process.env.KV_SHOES_NAMESPACE}/values/shoes`, {
    headers: {
      'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
    }
  });
  return await KV.json();
}

export default async function Home() {
  const shoes = await getShoes();

  return (
    <main className="p-4">
      <h1>Comparateur de Chaussures</h1>
      <pre>{JSON.stringify(shoes, null, 2)}</pre>
    </main>
  );
}
