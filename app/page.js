import RunningShoeComparator from '../components/RunningShoeComparator';

export async function getKVData() {
  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/storage/kv/namespaces/${process.env.KV_SHOES_NAMESPACE}/values/shoes`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 } // Revalidate every hour
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export default async function Home() {
  const shoes = await getKVData();
  
  return (
    <main className="container mx-auto px-4 py-8">
      <RunningShoeComparator initialData={shoes} />
    </main>
  );
}
