import { useState, useEffect, useCallback } from 'react';

interface Conflito {
  id: string;
  name: string;
  coordinates: [number, number];
  status: string;
  description: string;
  vítimas: number;
  vítimasTendência: 'subindo' | 'descendo' | 'estável';
  deslocados: number;
  deslocadosTendência: 'subindo' | 'descendo' | 'estável';
  lastUpdate: string;
  intensidade: 'Crítico' | 'Alto' | 'Médio' | 'Baixo';
  países: string[];
  área: number; // Área afetada em km²
  dataInício: string;
  últimosEventos: Array<{
    data: string;
    descrição: string;
    tipo: 'combate' | 'diplomático' | 'humanitário';
  }>;
}

interface ZonaDeRisco {
  id: string;
  name: string;
  coordinates: [number, number];
  status: string;
  description: string;
  nívelDeTensão: number;
  tensãoTendência: 'subindo' | 'descendo' | 'estável';
  lastUpdate: string;
  fatoresDeRisco: string[];
  probabilidadeConflito: number; // 0-100%
  países: string[];
}

interface Estatísticas {
  totalConflitos: number;
  zonasDeAltoRisco: number;
  totalVítimas: number;
  totalDeslocados: number;
  conflitosAtivos: number;
  áreaTotal: number;
  paísesMaisAfetados: Array<{ país: string; conflitos: number }>;
}

const conflitosMock: Conflito[] = [
  {
    id: 'russia-ucrania',
    name: 'Guerra Rússia-Ucrânia',
    coordinates: [49.0275, 31.4828],
    status: 'Combates Intensos',
    description: 'Invasão russa em território ucraniano com combates contínuos em múltiplas frentes.',
    vítimas: 15420,
    vítimasTendência: 'subindo',
    deslocados: 89000,
    deslocadosTendência: 'subindo',
    lastUpdate: new Date().toISOString(),
    intensidade: 'Crítico',
    países: ['Rússia', 'Ucrânia'],
    área: 603550,
    dataInício: '2022-02-24T00:00:00Z',
    últimosEventos: [
      {
        data: new Date().toISOString(),
        descrição: 'Intensificação dos bombardeios em Kiev',
        tipo: 'combate'
      },
      {
        data: new Date(Date.now() - 86400000).toISOString(),
        descrição: 'Negociações de cessar-fogo fracassaram',
        tipo: 'diplomático'
      }
    ]
  },
  {
    id: 'israel-hamas',
    name: 'Conflito Israel-Hamas',
    coordinates: [31.7683, 35.2137],
    status: 'Instabilidade Crítica',
    description: 'Confronto entre Israel e Hamas com graves consequências humanitárias na Faixa de Gaza.',
    vítimas: 3280,
    vítimasTendência: 'subindo',
    deslocados: 45000,
    deslocadosTendência: 'subindo',
    lastUpdate: new Date().toISOString(),
    intensidade: 'Crítico',
    países: ['Israel', 'Palestina'],
    área: 365,
    dataInício: '2023-10-07T00:00:00Z',
    últimosEventos: [
      {
        data: new Date().toISOString(),
        descrição: 'Crise humanitária se agrava em Gaza',
        tipo: 'humanitário'
      }
    ]
  },
  {
    id: 'sudao-civil',
    name: 'Guerra Civil no Sudão',
    coordinates: [15.5007, 32.5599],
    status: 'Conflito Interno',
    description: 'Confrontos entre facções militares causando crise humanitária generalizada.',
    vítimas: 890,
    vítimasTendência: 'estável',
    deslocados: 12000,
    deslocadosTendência: 'subindo',
    lastUpdate: new Date().toISOString(),
    intensidade: 'Alto',
    países: ['Sudão'],
    área: 1886068,
    dataInício: '2023-04-15T00:00:00Z',
    últimosEventos: [
      {
        data: new Date().toISOString(),
        descrição: 'Evacuação de civis em Cartum',
        tipo: 'humanitário'
      }
    ]
  }
];

const zonasDeRiscoMock: ZonaDeRisco[] = [
  {
    id: 'tensao-leste',
    name: 'Zona de Tensão Leste Europeu',
    coordinates: [52.5200, 13.4050],
    status: 'Alerta Máximo',
    description: 'Crescente instabilidade política e movimentações militares na fronteira.',
    nívelDeTensão: 8.5,
    tensãoTendência: 'subindo',
    lastUpdate: new Date().toISOString(),
    fatoresDeRisco: [
      'Disputas territoriais',
      'Tensões étnicas',
      'Movimentação militar'
    ],
    probabilidadeConflito: 75,
    países: ['Polônia', 'Belarus']
  },
  {
    id: 'mar-sul-china',
    name: 'Mar do Sul da China',
    coordinates: [16.0000, 114.0000],
    status: 'Monitoramento Intensivo',
    description: 'Disputas territoriais marítimas e exercícios militares frequentes.',
    nívelDeTensão: 6.8,
    tensãoTendência: 'estável',
    lastUpdate: new Date().toISOString(),
    fatoresDeRisco: [
      'Disputas territoriais marítimas',
      'Rotas comerciais estratégicas',
      'Recursos naturais'
    ],
    probabilidadeConflito: 60,
    países: ['China', 'Vietnã', 'Filipinas', 'Taiwan']
  },
  {
    id: 'sahel',
    name: 'Região do Sahel',
    coordinates: [17.6078, 8.0817],
    status: 'Observação Contínua',
    description: 'Instabilidade política e ameaças de grupos extremistas.',
    nívelDeTensão: 7.2,
    tensãoTendência: 'subindo',
    lastUpdate: new Date().toISOString(),
    fatoresDeRisco: [
      'Extremismo religioso',
      'Pobreza extrema',
      'Mudanças climáticas'
    ],
    probabilidadeConflito: 65,
    países: ['Mali', 'Burkina Faso', 'Níger']
  }
];

// Função para simular mudanças realistas nos dados
const simularMudançasConflito = (conflito: Conflito): Conflito => {
  const chance = Math.random();
  const mudançaVítimas = Math.floor(Math.random() * 50);
  const mudançaDeslocados = Math.floor(Math.random() * 200);

  return {
    ...conflito,
    vítimas: chance > 0.7 ? conflito.vítimas + mudançaVítimas : conflito.vítimas,
    deslocados: chance > 0.6 ? conflito.deslocados + mudançaDeslocados : conflito.deslocados,
    vítimasTendência: chance > 0.7 ? 'subindo' : chance > 0.4 ? 'estável' : 'descendo',
    deslocadosTendência: chance > 0.6 ? 'subindo' : chance > 0.3 ? 'estável' : 'descendo',
    lastUpdate: new Date().toISOString(),
    últimosEventos: chance > 0.8 ? [
      {
        data: new Date().toISOString(),
        descrição: gerarNovoEvento(conflito.name),
        tipo: chance > 0.6 ? 'combate' : chance > 0.3 ? 'humanitário' : 'diplomático'
      },
      ...conflito.últimosEventos.slice(0, 4)
    ] : conflito.últimosEventos
  };
};

const simularMudançasZonaDeRisco = (zona: ZonaDeRisco): ZonaDeRisco => {
  const chance = Math.random();
  const mudançaTensão = (Math.random() - 0.5) * 0.5;

  return {
    ...zona,
    nívelDeTensão: Math.max(0, Math.min(10, zona.nívelDeTensão + mudançaTensão)),
    tensãoTendência: mudançaTensão > 0.1 ? 'subindo' : mudançaTensão < -0.1 ? 'descendo' : 'estável',
    probabilidadeConflito: Math.max(0, Math.min(100, zona.probabilidadeConflito + (Math.random() - 0.5) * 5)),
    lastUpdate: new Date().toISOString()
  };
};

const gerarNovoEvento = (conflito: string): string => {
  const eventos = {
    'Guerra Rússia-Ucrânia': [
      'Novos bombardeios reportados em áreas residenciais',
      'Avanço das tropas no front leste',
      'Negociações diplomáticas em andamento',
      'Chegada de ajuda humanitária internacional'
    ],
    'Conflito Israel-Hamas': [
      'Intensificação dos confrontos em Gaza',
      'Nova tentativa de mediação internacional',
      'Distribuição de suprimentos humanitários',
      'Evacuação de civis de áreas de risco'
    ],
    'Guerra Civil no Sudão': [
      'Confrontos entre facções em Cartum',
      'Deslocamento em massa de civis',
      'Interrupção de serviços básicos',
      'Chegada de ajuda internacional'
    ]
  };

  const eventosDoConflito = eventos[conflito as keyof typeof eventos] || [];
  return eventosDoConflito[Math.floor(Math.random() * eventosDoConflito.length)];
};

const calcularEstatísticas = (conflitos: Conflito[], zonasDeRisco: ZonaDeRisco[]): Estatísticas => {
  const totalVítimas = conflitos.reduce((sum, c) => sum + c.vítimas, 0);
  const totalDeslocados = conflitos.reduce((sum, c) => sum + c.deslocados, 0);
  const áreaTotal = conflitos.reduce((sum, c) => sum + c.área, 0);

  const paísesContagem = new Map<string, number>();
  conflitos.forEach(c => {
    c.países.forEach(país => {
      paísesContagem.set(país, (paísesContagem.get(país) || 0) + 1);
    });
  });

  const paísesMaisAfetados = Array.from(paísesContagem.entries())
    .map(([país, conflitos]) => ({ país, conflitos }))
    .sort((a, b) => b.conflitos - a.conflitos)
    .slice(0, 5);

  return {
    totalConflitos: conflitos.length,
    zonasDeAltoRisco: zonasDeRisco.filter(z => z.nívelDeTensão >= 7).length,
    totalVítimas,
    totalDeslocados,
    conflitosAtivos: conflitos.filter(c => c.intensidade === 'Crítico' || c.intensidade === 'Alto').length,
    áreaTotal,
    paísesMaisAfetados
  };
};

export const useDadosDeConflito = () => {
  const [conflitos, setConflitos] = useState<Conflito[]>(conflitosMock);
  const [zonasDeRisco, setZonasDeRisco] = useState<ZonaDeRisco[]>(zonasDeRiscoMock);
  const [estatísticas, setEstatísticas] = useState<Estatísticas>(
    calcularEstatísticas(conflitosMock, zonasDeRiscoMock)
  );

  const atualizarDados = useCallback(() => {
    setConflitos(prev => prev.map(simularMudançasConflito));
    setZonasDeRisco(prev => prev.map(simularMudançasZonaDeRisco));
  }, []);

  useEffect(() => {
    const interval = setInterval(atualizarDados, 5000);
    return () => clearInterval(interval);
  }, [atualizarDados]);

  useEffect(() => {
    setEstatísticas(calcularEstatísticas(conflitos, zonasDeRisco));
  }, [conflitos, zonasDeRisco]);

  return { conflitos, zonasDeRisco, estatísticas };
};
