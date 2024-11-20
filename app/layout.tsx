import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation } from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Monitor de Conflitos Globais',
  description: 'Acompanhamento em tempo real de conflitos globais e recursos de gestão de crises',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Navigation />
        <div className="pl-16">
          {children}
          <footer className="bg-gray-900 text-gray-400 py-8 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p> {new Date().getFullYear()} Monitor de Conflitos Globais. Todos os direitos reservados.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}