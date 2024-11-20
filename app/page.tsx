"use client";

import { AlertTriangle, Shield, Siren, Users, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import dynamic from 'next/dynamic';
import { useDadosDeConflito } from '@/hooks/useConflictData';
import { useState, useEffect } from 'react';
import { CountryFlag } from '@/components/CountryFlag';
import Link from 'next/link';

// Import map component dynamically to avoid SSR issues
const ConflictMap = dynamic(() => import('@/components/ConflictMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-gray-800/50 rounded-lg flex items-center justify-center">
      <p className="text-white">Carregando mapa...</p>
    </div>
  ),
});

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('pt-BR').format(num);
};

const countryCodeMap: { [key: string]: string } = {
  'Rússia': 'ru',
  'Ucrânia': 'ua',
  'Israel': 'il',
  'Palestina': 'ps',
  'Sudão': 'sd',
  'Etiópia': 'et',
  'Myanmar': 'mm',
  'Iêmen': 'ye',
};

const TrendIcon = ({ trend }: { trend: 'subindo' | 'descendo' | 'estável' }) => {
  if (trend === 'subindo') return <TrendingUp className="w-4 h-4 text-red-500" />;
  if (trend === 'descendo') return <TrendingDown className="w-4 h-4 text-green-500" />;
  return <Minus className="w-4 h-4 text-gray-500" />;
};

export default function PaginaInicial() {
  const { conflitos, zonasDeRisco, estatísticas } = useDadosDeConflito();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-xl">Carregando...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Seção Principal */}
      <div className="relative h-[50vh] flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1550353185-761a5da3ee96?q=80&w=2000')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold mb-4">Monitor de Conflitos Globais</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Acompanhamento em tempo real de conflitos globais e tensões geopolíticas
          </p>
        </div>
      </div>

      {/* Estatísticas Rápidas */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 bg-red-900/20 border-red-800">
            <Siren className="w-8 h-8 mb-2 text-red-500" />
            <h3 className="text-2xl font-bold">{estatísticas.totalConflitos}</h3>
            <p>Conflitos Ativos</p>
            <div className="flex items-center justify-between mt-4">
              <TrendIcon trend={
                estatísticas.totalConflitos > (conflitos.length / 2) ? 'subindo' :
                estatísticas.totalConflitos < (conflitos.length / 3) ? 'descendo' : 'estável'
              } />
              <span className="text-xs text-gray-500">
                {((estatísticas.totalConflitos / conflitos.length) * 100).toFixed(0)}% do total
              </span>
            </div>
          </Card>
          <Card className="p-6 bg-yellow-900/20 border-yellow-800">
            <AlertTriangle className="w-8 h-8 mb-2 text-yellow-500" />
            <h3 className="text-2xl font-bold">{estatísticas.zonasDeAltoRisco}</h3>
            <p>Áreas de Alto Risco</p>
            <div className="flex items-center justify-between mt-4">
              <TrendIcon trend={
                estatísticas.zonasDeAltoRisco > (zonasDeRisco.length / 2) ? 'subindo' :
                estatísticas.zonasDeAltoRisco < (zonasDeRisco.length / 3) ? 'descendo' : 'estável'
              } />
              <span className="text-xs text-gray-500">
                {((estatísticas.zonasDeAltoRisco / zonasDeRisco.length) * 100).toFixed(0)}% do total
              </span>
            </div>
          </Card>
          <Card className="p-6 bg-blue-900/20 border-blue-800">
            <Users className="w-8 h-8 mb-2 text-blue-500" />
            <h3 className="text-2xl font-bold">{formatNumber(estatísticas.totalDeslocados)}</h3>
            <p>Refugiados e Deslocados</p>
            <div className="flex items-center justify-between mt-4">
              <TrendIcon trend={
                conflitos.filter(c => c.deslocadosTendência === 'subindo').length > 
                conflitos.filter(c => c.deslocadosTendência === 'descendo').length ? 'subindo' : 
                conflitos.filter(c => c.deslocadosTendência === 'descendo').length >
                conflitos.filter(c => c.deslocadosTendência === 'subindo').length ? 'descendo' : 'estável'
              } />
              <span className="text-xs text-gray-500">
                {formatNumber(Math.round(estatísticas.totalDeslocados / conflitos.length))} por conflito
              </span>
            </div>
          </Card>
          <Card className="p-6 bg-red-900/20 border-red-800">
            <Shield className="w-8 h-8 mb-2 text-red-500" />
            <h3 className="text-2xl font-bold">{formatNumber(estatísticas.totalVítimas)}</h3>
            <p>Vítimas Fatais</p>
            <div className="flex items-center justify-between mt-4">
              <TrendIcon trend={
                conflitos.filter(c => c.vítimasTendência === 'subindo').length > 
                conflitos.filter(c => c.vítimasTendência === 'descendo').length ? 'subindo' : 
                conflitos.filter(c => c.vítimasTendência === 'descendo').length >
                conflitos.filter(c => c.vítimasTendência === 'subindo').length ? 'descendo' : 'estável'
              } />
              <span className="text-xs text-gray-500">
                {formatNumber(Math.round(estatísticas.totalVítimas / conflitos.length))} por conflito
              </span>
            </div>
          </Card>
        </div>
      </div>

      {/* Seção do Mapa */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Mapa de Conflitos</h2>
        <ConflictMap />
      </section>

      {/* Seção de Conflitos Ativos */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Conflitos em Andamento</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {conflitos.map((conflito) => (
            <Link href="/conflicts" key={conflito.name}>
              <Card className="p-6 bg-gray-800/50 hover:bg-gray-700/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-2 mb-4">
                  {conflito.países.map((país) => (
                    <CountryFlag key={país} countryCode={countryCodeMap[país] || 'un'} className="w-8 h-6" />
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-2">{conflito.name}</h3>
                <div className="space-y-2">
                  <p className="text-sm"><span className="font-semibold">Situação:</span> {conflito.status}</p>
                  <p className="text-sm"><span className="font-semibold">Intensidade:</span> {conflito.intensidade}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm"><span className="font-semibold">Vítimas Fatais:</span> {formatNumber(conflito.vítimas)}</p>
                    <TrendIcon trend={conflito.vítimasTendência} />
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm"><span className="font-semibold">Deslocados:</span> {formatNumber(conflito.deslocados)}</p>
                    <TrendIcon trend={conflito.deslocadosTendência} />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {conflito.países.map((país) => (
                      <span key={país} className="text-sm bg-gray-700/50 px-2 py-1 rounded">
                        {país}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Atualizado: {new Date(conflito.lastUpdate).toLocaleString('pt-BR')}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Seção de Zonas de Risco */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Áreas de Risco</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {zonasDeRisco.map((zona) => (
            <Card key={zona.name} className="p-6 bg-gray-800/50">
              <h3 className="text-xl font-bold mb-2">{zona.name}</h3>
              <div className="space-y-2">
                <p className="text-sm"><span className="font-semibold">Situação:</span> {zona.status}</p>
                <p className="text-sm"><span className="font-semibold">Descrição:</span> {zona.description}</p>
                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1">
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div 
                          className="h-2.5 rounded-full transition-all duration-500"
                          style={{
                            width: `${zona.nívelDeTensão * 10}%`,
                            backgroundColor: zona.nívelDeTensão >= 8 ? '#ef4444' : 
                                          zona.nívelDeTensão >= 6 ? '#f97316' : 
                                          zona.nívelDeTensão >= 4 ? '#eab308' : '#22c55e'
                          }}
                        />
                      </div>
                    </div>
                    <TrendIcon trend={zona.tensãoTendência} />
                  </div>
                  <p className="text-sm">Nível de Tensão: {zona.nívelDeTensão.toFixed(1)}/10</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Atualizado: {new Date(zona.lastUpdate).toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}