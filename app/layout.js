import './globals.css';

export const metadata = {
  title: 'Comparateur de Chaussures de Running',
  description: 'Comparez les chaussures de running',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-white">
        {children}
      </body>
    </html>
  );
}
